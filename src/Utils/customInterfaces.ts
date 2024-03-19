import { CSSProperties, ElementType, ReactNode } from "react";
import { Socket } from "socket.io-client";

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
    isActive?: boolean;
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
    position: 'left' | 'right';
    onCloseCallback?: () => void;
    children: ReactNode;
}

export interface ICustomChat {
    userName: string;
    messageTime: string;
    messageTxt: string;
}

export interface ICustomToastProps {
    color: string;
    msg: string;
    setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
}

export interface IGameSectionComponent {
    [key: string]: any;
}

export interface IPrivateRouteComponent {
    children: ReactNode;
}

export interface IRoomUsers {
    names: string[];
    setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
    socket?: Socket;
}

export interface IChat {
    setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
    socket: Socket | undefined;
}
