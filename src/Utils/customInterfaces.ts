import { CSSProperties, ReactNode } from "react";

export interface ITranslationData {
	[key: string]: string;
}

export interface IParentSetProps {
	setValue: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ISupportedGamesListProps {
	id: string;
	name: string;
	backgroundImgURL: string;
}

export interface ICustomModalProps {
	headerName: string;
	isOpen: boolean;
	isInputNeeded?: boolean;
	closeModal: () => void;
	onClose?: (roomName: string) => void;
	customStyle?: CSSProperties;
}

export interface ICustomDrawerProps {
	headerName: string;
	isOpen: boolean;
	position: "left" | "right";
	onCloseCallback?: () => void;
	children: ReactNode;
}

export interface ICustomChat {
	userName: string;
	messageTime: string;
	messageTxt: string;
}
