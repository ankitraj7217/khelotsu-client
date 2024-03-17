import Cookies from 'js-cookie';

export const setValueInCookies = (key: string, value: any) => {
    const existingValue = getValueFromCookies(key);
    if (existingValue) {
        // If the key exists, remove the existing value
        deleteAValueFromCookies(key);
    }

    if (key === "accessToken" || key === "refreshToken") Cookies.set(key, value);
    Cookies.set(key, JSON.stringify(value));
}

export const getValueFromCookies = (key: string) => {
    const val = Cookies.get(key);
    if (val) {
        if (key !== "accessToken" && key !== "refreshToken") return JSON.parse(val);

        return val;
    }
    return null;
}


export const deleteAValueFromCookies = (key: string) => {
    Cookies.remove(key);
}


export const deleteAllValuesFromCookies = () => {
    // Retrieve all cookies and remove them one by one
    const cookies = Cookies.get();
    Object.keys(cookies).forEach(key => {
        Cookies.remove(key);
    });
}
