import { createAccessToken, deleteAllDataAndReloead } from "../Utils/genericUtils";
import { deleteAllValuesFromCookies } from "./auth";

export class CustomError extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        // Ensure the prototype is correctly set
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export const getCustomHeaders = (isAuthReq: boolean) => {

    const headers: any = {
        "Content-Type": "application/json"
    }
    if (isAuthReq) {
        headers["Authorization"] = createAccessToken()
    }
    return headers;
}

export const handleAPICall = async (isAuthReq: boolean, url: string, method: string, dataObj: any) => {
    try {
        const headers = getCustomHeaders(isAuthReq);
        const response = await fetch(url, {
            method,
            headers,
            body: JSON.stringify(dataObj),
            credentials: isAuthReq ? "include" : "omit"
        })

        const responseDetails =  await response.json()
        
        if (response?.status >= 400 && response?.status < 600) {
            throw new CustomError(response?.status, responseDetails?.message);
        }
        
        return responseDetails;

    } catch (err: any) {
        if (err instanceof CustomError) {
            if (err.statusCode === 401) {
                deleteAllDataAndReloead();
            }
        }
        console.log(err?.message);
        
        throw new Error(err?.message)
    }
}