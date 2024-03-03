import React, { useState, useEffect } from "react";
import { englishTranslatedValues } from "../Constants/translationValues";
import { ITranslationData } from "./customInterfaces.ts";

const useTranslation = () => {
	const [translatedDict, setTranslatedDict] = useState<ITranslationData>({});

	const fetchTranslationValue = async () => {
		try {
			const API_URL = "";
			const response = await fetch(API_URL);
			const data: ITranslationData = await response.json();

			// Update the translations state
			setTranslatedDict(data);
		} catch (e) {
			setTranslatedDict(englishTranslatedValues);
		}
	};

	useEffect(() => {
		fetchTranslationValue();
	});

	return (str: string) => (str in translatedDict ? translatedDict[str] : str);
};

export default useTranslation;
