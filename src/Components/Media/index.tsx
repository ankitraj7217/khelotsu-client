import React, { FC, useEffect, useState } from "react";
import { IMedia } from "../../Utils/customInterfaces";
import { WebRTCConnection } from "./Media.webrtc";
import { useSelector } from "react-redux";
import { RootState } from "../../ReduxStore/appStore";
import { receiveAnswer, receiveAnswerIceCandidates, receiveDisconnect, receiveIceCandidates, receiveNewOffer } from "./Mediasocketutils";
import { socketGenericCheck } from "../../Utils/socketUtils";

import VideoOnState from "../../Assets/Icons/video-on-state.png";
import VideoOffState from "../../Assets/Icons/video-off-state.png";
import AudioOnState from "../../Assets/Icons/audio-on-state.png";
import AudioOffState from "../../Assets/Icons/audio-off-state.png";
import CallEndIcon from "../../Assets/Icons/end-call-state.png";

import "./Media.scss";
import { useNavigate } from "react-router-dom";

const Media: FC<IMedia> = ({ socket, currPersonsInRoom, setErrorMsg }) => {
    const [isVideoOn, setIsVideoOn] = useState<boolean>(true);
    const [isAudioOn, setIsAudioOn] = useState<boolean>(true);

    const currUserName = useSelector((store: RootState) => store.login.userName);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("16 current persons in room: ", socket, currPersonsInRoom);

        if (!socket) return;

        console.log("current persons in room: ", currPersonsInRoom);


        const checkWebRTCConnection = WebRTCConnection.getInstance();
        const webRTCConnection = new WebRTCConnection(socket);


        if (!checkWebRTCConnection && currPersonsInRoom && currPersonsInRoom.length) {
            WebRTCConnection.setInstance(webRTCConnection);

            currPersonsInRoom.map(async (personUserName: string) => {
                console.log("sending offer: ")
                await webRTCConnection.openVideoAudio(currUserName);
                if (personUserName === currUserName) return;

                await webRTCConnection.createNewOffer(currUserName, personUserName);

            });


            receiveNewOffer(socket, async (msg: string) => {
                try {
                    if (!msg.length) return;

                    const data = socketGenericCheck(msg);

                    if (data?.answererUserName !== currUserName) return; // if not correct person
                    console.log("received offer: ", data)
                    await webRTCConnection.createAnswer(data?.offererUserName, data?.answererUserName, data?.offerDetails);

                } catch (err: any) {
                    setErrorMsg(err?.message);
                }
            })

            receiveIceCandidates(socket, async (msg: string) => {
                try {
                    if (!msg.length) return;

                    const data = socketGenericCheck(msg);

                    if (data?.answererUserName !== currUserName) return; // if not correct person
                    console.log("received ice candidate: ", data)
                    await webRTCConnection.receiveIceCandidate(data?.offererUserName, data?.answererUserName, data?.iceCandidate);

                } catch (err: any) {
                    setErrorMsg(err?.message);
                }
            })

            receiveAnswer(socket, async (msg: string) => {
                try {
                    if (!msg.length) return;

                    const data = socketGenericCheck(msg);
                    if (data?.offererUserName !== currUserName) return; // if not correct user name
                    console.log("received answer offer: ", data)
                    await webRTCConnection.receiveAnswer(data?.offererUserName, data?.answererUserName, data?.answerDetails);
                } catch (err: any) {
                    setErrorMsg(err?.message);
                }
            })

            receiveAnswerIceCandidates(socket, (msg: string) => {
                try {
                    if (!msg.length) return;

                    const data = socketGenericCheck(msg);

                    if (data?.offererUserName !== currUserName) return; // if not correct user name
                    console.log("received ice answer candidate: ", data)
                    webRTCConnection.receiveIceCandidate(data?.offererUserName, data?.answererUserName, data?.answerIceCandidates);
                } catch (err: any) {
                    setErrorMsg(err?.message);
                }
            })

            receiveDisconnect(socket, (msg: string) => {
                try {
                    if (!msg.length) return;

                    const data = socketGenericCheck(msg);
                    console.log(`${data} left the room.`);

                    webRTCConnection.removeUserConnection(data);
                } catch (err: any) {
                    setErrorMsg(err?.message);
                }
            })
        }


    }, [socket, currPersonsInRoom])

    useEffect(() => {
        const webRTCConnection = WebRTCConnection.getInstance();
        if (!webRTCConnection) return;

        webRTCConnection.toggleVideoConnection(isVideoOn, currUserName);
    }, [isVideoOn])

    useEffect(() => {
        const webRTCConnection = WebRTCConnection.getInstance();
        if (!webRTCConnection) return;

        webRTCConnection.toggleAudioConnection(isAudioOn);
    }, [isAudioOn])

    const _disconnectUser = () => {
        navigate(-1);
    }

    return (
        <section className="media">
            <div className="media-video-call">
                {
                    currPersonsInRoom && currPersonsInRoom.length && currPersonsInRoom?.map((ele) => {
                        return (
                            <div className="media-video-call-box" id={`${ele}-video-box`} key={ele}>
                                <div className="media-video-call-box-username">
                                    {ele}
                                </div>
                                <div className="media-video-call-box-details">
                                    <video id={`${ele}-video-ele`} autoPlay playsInline muted />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="media-settings">
                <div className="media-settings-div media-settings-video">
                    {
                        isVideoOn ? <img src={VideoOnState} alt="video-on" className="on-img"
                            onClick={_ => setIsVideoOn(false)} /> :
                            <img src={VideoOffState} alt="video-off" className="off-img"
                                onClick={_ => setIsVideoOn(true)} />
                    }
                </div>
                <div className="media-settings-div media-settings-audio off on">
                    {
                        isAudioOn ? <img src={AudioOnState} alt="audio-on" className="on-img"
                            onClick={_ => setIsAudioOn(false)} /> :
                            <img src={AudioOffState} alt="audio-off" className="off-img"
                                onClick={_ => setIsAudioOn(true)} />
                    }
                </div>
                <div className="media-settings-div media-settings-exit">
                    <img src={CallEndIcon} alt="audio-off" className="media-settings-exit-img"
                        onClick={_disconnectUser} />
                </div>
            </div>
        </section>
    )
}

export default Media;