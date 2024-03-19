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

export const getCurrentDateTime = (): string => {
    const now = new Date();

    // Format date
    const dateFormatter = new Intl.DateTimeFormat('en', {
        day: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    const formattedDate = dateFormatter.format(now);

    // Add ordinal suffix to day
    const day = now.getDate();
    const ordinalSuffix = (day % 10 === 1 && day !== 11) ? 'st' : (day % 10 === 2 && day !== 12) ? 'nd' : (day % 10 === 3 && day !== 13) ? 'rd' : 'th';
    const formattedDay = `${day}${ordinalSuffix}`;

    // Combine formatted date and time
    const currentTime = `${formattedDay} ${formattedDate}`;

    return currentTime;
};