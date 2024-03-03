export const createFuncWithNoParams = <T extends any[]>(
	func: (...params: T) => void,
	...params: T
) => {
	return () => func(...params);
};
