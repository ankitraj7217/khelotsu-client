import React, { FC, useState } from "react";
import useTranslation from "../../Utils/useTranslation";
import CustomChat from "./CustomChat";
import { createFuncWithNoParams } from "../../Utils/genericUtils";

import "./ChatDetails.scss";
import UsersDetails from "./UsersDetails";
import { IRoomUsers } from "../../Utils/customInterfaces";

const ChatDetails: FC<IRoomUsers> = ({names, setErrorMsg, socket}) => {
    // can use via enums (good practice), but using it instead.
    // 0 -> Chat  1 -> People Details
    const [sectionEnabled, setSectionEnabled] = useState<number>(0);
    const t = useTranslation();

    const _onSectionClicked = (sectionId: number) => {
        setSectionEnabled(sectionId);
    }


    return (
        <section className="chat-details">
            <header className="chat-details-header">
                <div className={`chat-details-header__chat ${sectionEnabled === 0 && "underline"}`}
                onClick={createFuncWithNoParams(_onSectionClicked, 0)}>
                    {t("MESSAGES")}
                </div>
                <div className={`chat-details-header__people ${sectionEnabled === 1 && "underline"}`}
                    onClick={createFuncWithNoParams(_onSectionClicked, 1)}>
                    {t("USER_DETAILS")}
                </div>
            </header>
            <div className="chat-details-info">
                {
                    sectionEnabled === 0 ? 
                        <CustomChat socket={socket} setErrorMsg={setErrorMsg} /> :
                        <UsersDetails names={names} setErrorMsg={setErrorMsg} />
                }
            </div>
        </section>
    )
}

export default ChatDetails;