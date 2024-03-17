import { createAccessToken } from "../Utils/genericUtils";
import { LoginUserAPI, LogoutUserAPI, RefreshTokenAPI, RegisterUserAPI } from "../config";
import { handleAPICall } from "./genericApiCalls";

// Handle errors in components by showing error message

export const registerUser = async (dataObj: any) => {
    return handleAPICall(false, RegisterUserAPI, "POST", dataObj);
}

export const loginUser = async (dataObj: any) => {
    return handleAPICall(false, LoginUserAPI, "POST", dataObj);
}

export const logoutUser = async (dataObj: any = {}) => {
    return handleAPICall(true, LogoutUserAPI, "POST", dataObj);
}

export const refreshUserToken = async (dataObj: any) => {
    return handleAPICall(true, RefreshTokenAPI, "POST", dataObj);
}