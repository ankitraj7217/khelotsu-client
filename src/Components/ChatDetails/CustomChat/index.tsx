import React, { useState, useEffect, ChangeEvent, FC } from "react";
import { IChat, ICustomChat } from "../../../Utils/customInterfaces";
import { createFuncWithNoParams, getCurrentDateTime } from "../../../Utils/genericUtils";

import "./CustomChat.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../ReduxStore/appStore";
import { receiveChatMessage, sendChatMessage } from "../../../Utils/socketUtils";

const CustomChat: FC<IChat> = ({ socket, setErrorMsg }) => {

    const [messageThread, setMessageThread] = useState<ICustomChat[]>([]);
    const [currentMsg, setCurrentMsg] = useState<string>("");
    const userName = useSelector((store: RootState) => store.login.userName);

    useEffect(() => {
        // can call api here
        // Sample Message Thread: Remove it later on:
        try {
            if (!socket) return;

            receiveChatMessage(socket, (message: string) => {
                console.log("message incoming: ", message)
                if (!message.length) return;

                console.log("message: ", message)

                const msgParsed = JSON.parse(message);

                const newMessage: ICustomChat = {
                    userName: msgParsed?.userName,
                    messageTime: getCurrentDateTime(),
                    messageTxt: msgParsed?.msg
                }
                setMessageThread((prevMsg) => [...prevMsg, newMessage]);

            })
        } catch (err: any) {
            setErrorMsg(err?.message);
        }

        const sampleMessage: ICustomChat[] = [
            {
                userName: "User A",
                messageTime: "4th March, 2:30 PM",
                messageTxt: "Hi, How are you"
            },
            {
                userName: "User B",
                messageTime: "4th March, 3:30 PM",
                messageTxt: "Hi, How are you"
            },
            {
                userName: "User A",
                messageTime: "4th March, 4:30 PM",
                messageTxt: "Hi, How are you buddy?"
            },
            {
                userName: "User A",
                messageTime: "4th March, 4:30 PM",
                messageTxt: "Hi, How are you"
            }
        ]
        setMessageThread(sampleMessage);

    }, [])

    const _setCurrentMessageValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentMsg(e?.target?.value);
    }


    const _sendMessage = (msg: string) => {
        // add message and use api to send or use webrtc
        // get username from global state
        try {
            if (!socket) throw new Error("Socket not connected! Please refresh page.");

            if (!msg.length) return;

            const newMessage: ICustomChat = {
                userName,
                messageTime: getCurrentDateTime(),
                messageTxt: msg
            }

            sendChatMessage(socket, JSON.stringify({userName, msg}));
            setMessageThread((prevMsg) => [...prevMsg, newMessage]);
            setCurrentMsg("");

        } catch (err: any) {
            setErrorMsg(err?.message);
        }
    }

    return (
        <section className="khelotsu-custom-chat">
            <section className="khelotsu-custom-chat-thread">
                {
                    messageThread.map((ele, idx) =>
                        <div className="khelotsu-custom-chat-thread-message" key={idx}>
                            <div className="khelotsu-custom-chat-thread-message-metadata">
                                <div className="khelotsu-custom-chat-thread-message-metadata__username">
                                    {ele.userName}
                                </div>
                                <div className="khelotsu-custom-chat-thread-message-metadata__time">
                                    {ele.messageTime}
                                </div>
                            </div>
                            <div className="khelotsu-custom-chat-thread-message-txt">
                                {ele.messageTxt}
                            </div>
                        </div>
                    )
                }
            </section>

            <section className="khelotsu-custom-chat-editor">
                <textarea
                    className="khelotsu-custom-chat-editor-input"
                    placeholder="Type your chat here"
                    aria-label="Type your chat here"
                    rows={3} // Adjust the number of rows as needed
                    value={currentMsg}
                    onChange={_setCurrentMessageValue}
                />
                <button
                    className="khelotsu-custom-chat-editor-send"
                    onClick={createFuncWithNoParams(_sendMessage, currentMsg)}
                    aria-label="Send message"
                >
                    {">"}
                </button>
            </section>
        </section>
    )
}

export default CustomChat;