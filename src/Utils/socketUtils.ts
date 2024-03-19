import io, { Socket } from "socket.io-client";
import { createAccessToken } from "./genericUtils";
import { env } from "../config";

export const createSocket = (roomName: string) => {
    try {
        const accessToken = createAccessToken();
        const socket = io(`${env}`, {
            auth: {
                token: accessToken
            },
            query: {
                roomName: `${roomName}`
            }
        })

        socket.on("connect", () => {
            console.log("Socket connected");
            socket.emit("join_room", roomName);
        })

        return socket;
    }
    catch (err: any) {
        console.log("Error creating socket");
        throw new Error("Error creating socket")
    }
}

export const disconnectFromSocket = (socket: Socket) => {
    try {
        socket.on("disconnect", () => console.log("Socket disconnected"));
    } catch (err: any) {
        console.log("Error disconnecting from socket");
        throw new Error("Error disconnecting from socket");
    }
}

export const sendChatMessage = (socket: Socket, message: string) => {
    try {
        socket.emit("send_chat_message", message);
    } catch (err: any) {
        console.log("Error while sending chat message");
        throw new Error("Error while sending chat message")
        
    }
}

export const receiveChatMessage = (socket: Socket, callback: (message: string) => void) => {
    try {
        // Listen for the 'chat_message' event and invoke the callback with the message payload
        socket.on("receive_chat_message", callback);
    } catch (err: any) {
        console.log("Error while receiving chat message:", err.message);
        throw new Error("Error while receiving chat message");
    }
}
