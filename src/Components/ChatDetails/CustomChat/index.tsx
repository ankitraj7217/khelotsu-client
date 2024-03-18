import React, { useState, useEffect, ChangeEvent } from "react";
import { ICustomChat } from "../../../Utils/customInterfaces";
import { createFuncWithNoParams } from "../../../Utils/genericUtils";

import "./CustomChat.scss";

const CustomChat = () => {

    const [messageThread, setMessageThread] = useState<ICustomChat[]>([]);
    const [currentMsg, setCurrentMsg] = useState<string>("");

    useEffect(() => {
        // can call api here
        // Sample Message Thread: Remove it later on:

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

        if (!msg.length) return;

        const newMessage: ICustomChat = {
            userName: "User A",
            messageTime: "4th March, 2.30 PM",
            messageTxt: msg
        }

        setMessageThread((prevMsg) => [...prevMsg, newMessage]);
        setCurrentMsg("");
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