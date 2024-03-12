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
  