import { Socket } from "socket.io-client";

export const sendNewOffer = (socket: Socket, offerDetails: any, offererUserName: string, answererUserName: string) => {
    try {
        const data = {
            offererUserName,
            answererUserName,
            offerDetails
        }

        socket.emit("send_rtc_new_offer", JSON.stringify(data));
    } catch (err: any) {
        throw new Error(err?.message);
    }
}

export const receiveNewOffer = (socket: Socket, callback: (message: string) => void) => {
    try {
        socket.on("receive_rtc_new_offer", callback);
    } catch (err: any) {
        throw new Error(`Error while receiving offer: ${err?.message}`);
    }
}

export const sendIceCandidates = (socket: Socket, iceCandidate: any, offererUserName: string, answererUserName: string) => {
    try {
        const data = {
            offererUserName,
            answererUserName,
            iceCandidate
        }

        socket.emit("send_rtc_new_ice", JSON.stringify(data));
    } catch (err: any) {
        throw new Error(err?.message);
    }
}

export const receiveIceCandidates = (socket: Socket, callback: (message: string) => void) => {
    try {
        socket.on("receive_rtc_new_ice", callback);
    } catch (err: any) {
        throw new Error(`Error while receiving offer: ${err?.message}`);
    }
}

export const sendAnswer = (socket: Socket, answerDetails: any, offererUserName: string, answererUserName: string) => {
    try {
        const data = {
            offererUserName,
            answererUserName,
            answerDetails
        }

        socket.emit("send_rtc_answer", JSON.stringify(data));
    } catch (err: any) {
        throw new Error(err?.message);
    }
}

export const receiveAnswer = (socket: Socket, callback: (message: string) => void) => {
    try {
        socket.on("receive_rtc_answer", callback);
    } catch (err: any) {
        throw new Error(`Error while receiving offer: ${err?.message}`);
    }
}

export const sendAnswerIceCandidates = (socket: Socket, answerIceCandidates: any, offererUserName: string, answererUserName: string) => {
    try {
        const data = {
            offererUserName,
            answererUserName,
            answerIceCandidates
        }

        socket.emit("send_rtc_answer_ice", JSON.stringify(data));
    } catch (err: any) {
        throw new Error(err?.message);
    }
}

export const receiveAnswerIceCandidates = (socket: Socket, callback: (message: string) => void) => {
    try {
        socket.on("receive_rtc_answer_ice", callback);
    } catch (err: any) {
        throw new Error(`Error while receiving offer: ${err?.message}`);
    }
}

export const receiveDisconnect = (socket: Socket, callback: (message: string) => void) => {
    try {
        socket.on("receive_disconnect_username", callback);
    } catch (err: any) {
        throw new Error(`Error while receiving offer: ${err?.message}`);
    }
}