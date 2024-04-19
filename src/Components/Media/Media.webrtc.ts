import { Socket } from "socket.io-client";
import { sendAnswer, sendAnswerIceCandidates, sendIceCandidates, sendNewOffer } from "./Mediasocketutils";

export class WebRTCConnection {
    localStream: any;
    remoteStream: any[];
    peerConnection: any[];
    socket: Socket;
    public static singletonInstance: any = null;

    constructor(socket: Socket) {
        this.localStream = null;
        this.remoteStream = [];
        this.peerConnection = [];
        this.socket = socket;
    }

    public static getInstance(): WebRTCConnection | null {
        return WebRTCConnection.singletonInstance;
    }

    public static setInstance(webRTCConnection: WebRTCConnection) {
        if (!WebRTCConnection.singletonInstance) {
            WebRTCConnection.singletonInstance = webRTCConnection;
        }
    }


    async openVideoAudio(offererUserName: string) {
        try {
            if (!this.localStream) {
                this.localStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                });
                const localVideoEl = document.getElementById(`${offererUserName}-video-ele`) as HTMLVideoElement;
                localVideoEl.srcObject = this.localStream;
            }
        } catch (err: any) {
            console.log("Error while opening video and audio: ", err?.message);
        }
    }

    async createPeerConnection(offererUserName: string, answererUserName: string, isOffer: boolean) {
        try {
            const peerConfig = {
                iceServers: [
                    {
                        urls: [
                            "stun:stun.l.google.com:19302",
                            "stun:stun1.l.google.com:19302"
                        ]
                    }
                ]
            }

            const connectionID = `${offererUserName}-${answererUserName}`;
            const remoteUserName = isOffer ? answererUserName : offererUserName;

            const peerConnection = await new RTCPeerConnection(peerConfig);
            this.localStream.getTracks().forEach((track: any) => {
                peerConnection.addTrack(track, this.localStream);
            })

            peerConnection.addEventListener("icecandidate", (e) => {
                if (e.candidate) {
                    if (isOffer)
                        sendIceCandidates(this.socket, e.candidate, offererUserName, answererUserName);
                    else
                        sendAnswerIceCandidates(this.socket, e.candidate, offererUserName, answererUserName);
                }
            })

            // automatically gets remote tracks
            peerConnection.addEventListener("track", (e) => {
                const remoteStream = new MediaStream();
                const remoteVideoEl = document.getElementById(`${remoteUserName}-video-ele`) as HTMLVideoElement;
                remoteVideoEl.srcObject = remoteStream;
                if (e.streams && e.streams.length) {
                    e.streams[0].getTracks().forEach(track => remoteStream.addTrack(track));
                }
                this.remoteStream.push({ connectionID, remoteStream });
            })

            return peerConnection;

        } catch (error: any) {
            console.log("Peer connect establishment failed: ", error);
            throw new Error(error?.message);
        }
    }

    // call this multiple times for number of persons in the room (excluding himself)
    async createNewOffer(offererUserName: string, answererUserName: string) {
        try {
            const connectionID = `${offererUserName}-${answererUserName}`;
            const peerConnection = await this.createPeerConnection(offererUserName, answererUserName, true);

            // create offer
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);

            sendNewOffer(this.socket, offer, offererUserName, answererUserName);

            this.peerConnection.push({ connectionID, peerConnection });

        } catch (error: any) {
            console.log("Error while creating new offer: ", error);
            throw new Error(error?.message);
        }
    }

    async createAnswer(offererUserName: string, answererUserName: string, offer: any) {
        try {
            // this will run when user will already be there. while entering, it calls createNewoffer.
            // thus, localStream will always be there.

            const connectionID = `${offererUserName}-${answererUserName}`;
            const peerConnection = await this.createPeerConnection(offererUserName, answererUserName, false);
            this.peerConnection.push({ connectionID, peerConnection });

            await peerConnection.setRemoteDescription(offer);  // need to set this (have remote offer set) before creating answer
            const answer = await peerConnection.createAnswer({});
            await peerConnection.setLocalDescription(answer);

            sendAnswer(this.socket, answer, offererUserName, answererUserName);

        } catch (error: any) {
            console.log("Peer creating answer failed: ", error);
            throw new Error(error?.message);
        }
    }

    async receiveIceCandidate(offererUserName: string, answererUserName: string, iceCandidate: any) {
        try {
            const connectionID = `${offererUserName}-${answererUserName}`;
            console.log("this.peerConnection in receiveIce Candidate: ", connectionID, this.peerConnection);
            const peerConnectionObj = this.peerConnection.find(ele => ele.connectionID === connectionID);
            const peerConnection = peerConnectionObj?.peerConnection;

            // add ice candidate is used for remote peer connection.
            peerConnection.addIceCandidate(iceCandidate);
        } catch (error: any) {
            console.log("Peer creating answer failed: ", error);
            throw new Error(error?.message);
        }
    }

    async receiveAnswer(offererUserName: string, answererUserName: string, answer: any) {
        try {
            const connectionID = `${offererUserName}-${answererUserName}`;
            const peerConnectionObj = this.peerConnection.find(ele => ele.connectionID === connectionID);
            const peerConnection = peerConnectionObj?.peerConnection;

            await peerConnection.setRemoteDescription(answer)
        } catch (error: any) {
            console.log("Peer receiving answer failed: ", error);
            throw new Error(error?.message);
        }
    }

    removeUserConnection(userName: string) {
        try {
            this.peerConnection = this.peerConnection.filter(({ connectionID }) => !connectionID.includes(userName))
            this.remoteStream = this.remoteStream.filter(({ connectionID }) => !connectionID.includes(userName));
        } catch (err: any) {
            console.log("Error while removing user: ", err);
            throw new Error(err?.message);
        }
    }

    async toggleVideoConnection(enableVideo: boolean, currUserName: string) {
        try {
            const vidTrack = this.localStream ? this.localStream.getVideoTracks()[0] : null;
            const toggle = enableVideo;
    
            if (vidTrack && toggle && vidTrack.readyState && vidTrack.readyState === "ended") {
                // If video track exists, is toggled on, and its readyState is "ended"
                const newVideoStreamGrab = await navigator.mediaDevices.getUserMedia({
                    video: true
                });
                if (this.localStream && this.localStream.getVideoTracks().length > 0) {
                    // Remove the old video track
                    this.localStream.removeTrack(this.localStream.getVideoTracks()[0]);
                }
                // Add the new video track
                this.localStream.addTrack(newVideoStreamGrab.getVideoTracks()[0]);
            } else if (vidTrack) {
                // If video track exists and is toggled off or not in "ended" state, stop it
                vidTrack.stop();
            }
    
            this.peerConnection.forEach(({ _, peerConnection }) => {
                const senders = peerConnection.getSenders().filter((sender: any) => sender?.track?.kind === 'video');
    
                for (const sender of senders) {
                    if (sender.track) {
                        sender.track.enabled = enableVideo;
                    }
                }
            });
        } catch (error: any) {
            console.log("Error toggling video transmission: ", error);
            throw new Error(error?.message);
        }
    }
    

    async toggleAudioConnection(enableAudio: boolean) {
        try {
            const audioTrack = this.localStream ? this.localStream.getAudioTracks()[0] : null;
            const toggle = enableAudio;
    
            if (audioTrack && toggle && audioTrack.readyState && audioTrack.readyState === "ended") {
                // If audio track exists, is toggled on, and its readyState is "ended"
                const newAudioStreamGrab = await navigator.mediaDevices.getUserMedia({
                    audio: true
                });
                if (this.localStream && this.localStream.getAudioTracks().length > 0) {
                    // Remove the old audio track
                    this.localStream.removeTrack(this.localStream.getAudioTracks()[0]);
                }
                // Add the new audio track
                this.localStream.addTrack(newAudioStreamGrab.getAudioTracks()[0]);
            } else if (audioTrack) {
                // If audio track exists and is toggled off or not in "ended" state, stop it
                audioTrack.stop();
            }
    
            // Toggle audio tracks for each peer connection
            this.peerConnection.forEach(({ peerConnection }) => {
                const senders = peerConnection.getSenders().filter((sender: RTCRtpSender) => sender.track?.kind === 'audio');
                for (const sender of senders) {
                    if (sender.track) {
                        sender.track.enabled = enableAudio;
                    }
                }
            });
        } catch (error: any) {
            console.log("Error toggling audio transmission: ", error);
            throw new Error(error?.message);
        }
    }
    
    
}