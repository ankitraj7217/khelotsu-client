import React, { useState, useEffect, ChangeEvent, FC } from "react";
import { IChat, ICustomChat } from "../../../Utils/customInterfaces";
import {
  createFuncWithNoParams,
  getCurrentDateTime,
} from "../../../Utils/genericUtils";

import "./CustomChat.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../ReduxStore/appStore";
import { sendChatMessage } from "../../../Utils/socketUtils";
import { addChatToThread } from "../../../ReduxStore/Slices/chatSlice";

const CustomChat: FC<IChat> = ({ socket, setErrorMsg }) => {
  const [currentMsg, setCurrentMsg] = useState<string>("");

  const messageThread = useSelector((store: RootState) => store.chat.chatData);
  const userName = useSelector((store: RootState) => store.login.userName);

  const dispatch = useDispatch();

  const _setCurrentMessageValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentMsg(e?.target?.value);
  };

  const _sendMessage = (msg: string) => {
    // add message and use api to send or use webrtc
    // get username from global state
    try {
      if (!socket)
        throw new Error("Socket not connected! Please refresh page.");

      if (!msg.length) return;

      const newMessage: ICustomChat = {
        userName,
        messageTime: getCurrentDateTime(),
        messageTxt: msg,
      };

      sendChatMessage(socket, JSON.stringify({ userName, msg }));
      dispatch(addChatToThread(newMessage));
      setCurrentMsg("");
    } catch (err: any) {
      setErrorMsg(err?.message);
    }
  };

  return (
    <section className="khelotsu-custom-chat">
      <section className="khelotsu-custom-chat-thread">
        {messageThread.map((ele, idx) => (
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
        ))}
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
  );
};

export default CustomChat;
