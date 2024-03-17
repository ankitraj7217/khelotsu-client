import { deleteAllValuesFromCookies, getValueFromCookies, setValueInCookies } from "../Network/auth";

// pass function and params one by one
export const createFuncWithNoParams = <T extends any[]>(func: (...params: T) => void, ...params: T) => {
    return () => func(...params);
}

export const getURLParams = (): Record<string, string> => {
    return Object.fromEntries(new URLSearchParams(window.location.search));
}

export const updateUrlParamsWithoutReload = (paramName: string, paramValue: string): void => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(paramName, paramValue);
    window.history.replaceState({}, "", `${window.location.pathname}?${urlParams.toString()}`);
};

export const setUserDatainCookies = (data: any) => {
    const { username, email, userid, accessToken, refreshToken } = data;
    setValueInCookies("accessToken", accessToken);
    setValueInCookies("refreshToken", refreshToken);
    setValueInCookies("userData", { userName: username, userId: userid, email })
}

export const createAccessToken = () => {
    const accessToken = getValueFromCookies("accessToken");
    return `Bearer ${accessToken}`;
}

export const deleteAllDataAndReloead = () => {
    deleteAllValuesFromCookies();
    if (!["/auth", "/", ""].includes(window.location.pathname)) {
        setTimeout(() => {
            window.location.href = "/auth";
            window.location.reload();
        }, 4000)
    }
}