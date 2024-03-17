import { AddUsersInRoomAPI, CreateRoomAPI, PersonAllowedInRoomDetailsAPI, RemoveUserInRoomAPI, isPersonAllowedInRoomAPI } from "../config";
import { handleAPICall } from "./genericApiCalls";

export const createRoom = async(dataObj: any) => {
    return handleAPICall(true, CreateRoomAPI, "POST", dataObj);
}

export const addUsersInRoom = async(dataObj: any) => {
    return handleAPICall(true, AddUsersInRoomAPI, "POST", dataObj);
}

export const removeUserInRoom = async(dataObj: any) => {
    return handleAPICall(true, RemoveUserInRoomAPI, "POST", dataObj);
}

export const personsAllowedInRoomDetails = async(dataObj: any) => {
    return handleAPICall(true, PersonAllowedInRoomDetailsAPI, "POST", dataObj);
}

// means currently loggedIn User is allowed or not
export const isPersonAllowedInRoom = async(dataObj: any) => {
    return handleAPICall(true, isPersonAllowedInRoomAPI, "POST", dataObj);
}