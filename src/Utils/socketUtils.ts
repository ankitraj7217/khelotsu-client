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

export const socketGenericCheck = (receivedMsg: string) => {
    const parsedMsg = JSON.parse(receivedMsg);
    const { status, error, data } = parsedMsg;
    if (status !== 200) {
        throw new Error(error);
    }

    return data;
}

// message contains userName, type, pos No. -> 0 to 8
export const sendTTTPos = (socket: Socket, message: string) => {
    try {
        socket.emit("send_ttt_pos", message);
    } catch (err: any) {
        throw new Error("Error while sending Tic Tac Toe position.");
    }
}

// message contains pos No.
export const receiveTTTPos = (socket: Socket, callback: (message: string) => void) => {
    try {
        socket.on("receive_ttt_pos", callback);
    } catch (err: any) {
        throw new Error("Error while receiving Tic Tac Toe position.");
    }
}

// start of game -> send list of 2 players
export const requestInitialTTTSymbol = (socket: Socket, message: string) => {
    try {
        socket.emit("request_ttt_symbol", message);
    } catch (err: any) {
        throw new Error("Error while requesting Tic Tac Toe symbol.");
    }
}

export const getInitialTTTSymbol = (socket: Socket, callback: (message: string) => void) => {
    try {
        socket.on("receive_ttt_symbol", callback);
    } catch (err: any) {
        throw new Error("Error while receiving Tic Tac Toe symbol.");
    }
}

// start of game -> send list of 2 players
export const requestInitialChessSymbol = (socket: Socket, message: string) => {
    try {
        socket.emit("request_chess_symbol", message);
    } catch (err: any) {
        throw new Error("Error while requesting Tic Tac Toe symbol.");
    }
}

export const getInitialChessSymbol = (socket: Socket, callback: (message: string) => void) => {
    try {
        socket.on("receive_chess_symbol", callback);
    } catch (err: any) {
        throw new Error("Error while receiving Tic Tac Toe symbol.");
    }
}

export const sendChessPos = (socket: Socket, message: string) => {
    try {
        socket.emit("send_chess_pos", message);
    } catch (err: any) {
        throw new Error("Error while sending Tic Tac Toe position.");
    }
}

// message contains pos No.
export const receiveChessPos = (socket: Socket, callback: (message: string) => void) => {
    try {
        socket.on("receive_chess_pos", callback);
    } catch (err: any) {
        throw new Error("Error while receiving Tic Tac Toe position.");
    }
}