import React, { Suspense, useCallback, useEffect, useState } from "react";
import GameIcon from "../../Assets/Icons/game-icon.png";
import ChatIcon from "../../Assets/Icons/chat-icon.png";
import GameConformIcon from "../../Assets/Icons/game-confirm.png";

import CustomDrawer from "../../Components/CustomDrawer";
import CustomChat from "../../Components/CustomChat";
import { currentlySupportedGames } from "../../Constants/temporaryValues";
import GamesBoxDisplay from "../../Components/GamesBoxDisplay";
import { createFuncWithNoParams, getURLParams, updateUrlParamsWithoutReload } from "../../Utils/genericUtils";
import { ISupportedGamesListProps } from "../../Utils/customInterfaces";
import { GAME_COMPONENTS } from "./GameSection.gameloader";
import "./GameSection.scss";

const GameSection = () => {
    const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState<boolean>(false);
    const [isRightDrawerOpen, setIsRightDrawerOpen] = useState<boolean>(false);
    const [supportedGames, setSupportedGames] = useState<ISupportedGamesListProps[]>(currentlySupportedGames);
    const [currentGame, setCurrentGame] = useState<ISupportedGamesListProps>();

    useEffect(() => {
        const urlParams = getURLParams();
        if ("game" in urlParams) switchGame(urlParams["game"])
    }, [])

    const _switchLeftGamesListDrawer = useCallback(() => {
        setIsLeftDrawerOpen((prevVal) => !prevVal);
    }, [])

    const _switchRightChatDrawer = useCallback(() => {
        setIsRightDrawerOpen((prevVal) => !prevVal);
    }, [])

    const switchGame = (id: string) => {
        supportedGames.forEach(ele => ele.id === id ? ele.isActive = true : ele.isActive = false);
        const matchedCurrentGame = supportedGames.find(ele => ele.id === id);
        setSupportedGames([...supportedGames]);  // do this [...], otherwise it has same memory location, won't update..#basics
        updateUrlParamsWithoutReload("game", id);
        setCurrentGame(matchedCurrentGame);
    }

    return (
        <section className="khelotsu-game" style={{ backgroundImage: `url(${currentGame?.backgroundImgURL})` }}>
            <section className="khelotsu-game-drawer khelotsu-game-list"> {/** Drawer for the games on the leftmost side */}
                <div className="khelotsu-game-drawer-details khelotsu-game-list-details">
                    <CustomDrawer headerName="Other Games List" isOpen={isLeftDrawerOpen} position="left"
                        onCloseCallback={_switchLeftGamesListDrawer}>
                        {
                            supportedGames.map((ele) =>
                                <div className={`khelotsu-game-list-details-game 
                                        ${ele.isActive && "khelotsu-game-list-details-game-active"}`}
                                    key={ele.id}
                                    onClick={createFuncWithNoParams(switchGame, ele.id)}>
                                    <GamesBoxDisplay {...ele} />
                                </div>
                            )
                        }
                    </CustomDrawer>
                </div>
                <div className="khelotsu-game-drawer-icon khelotsu-game-list-icon">
                    <img src={GameIcon} alt="icon" className="khelotsu-game-list-icon-img" onClick={_switchLeftGamesListDrawer} />
                </div>
            </section>

            <section className="khelotsu-game-section"> {/** game-section like tic tac toe */}
                <div className="khelotsu-game-section-left-player-confirmation" aria-label="Press to confirm your move">
                    <div className="khelotsu-game-section-left-player-confirmation-icon">
                        <img src={GameConformIcon} alt="icon" className="khelotsu-game-section-left-player-confirmation-icon-img" />
                    </div>
                    <div className="khelotsu-game-section-left-player-confirmation-username">
                        {/** Username of a player */} User A
                    </div>
                </div>

                <div className="khelotsu-game-section-game">
                    <Suspense fallback={<div>Loading...</div>}>
                        {currentGame && GAME_COMPONENTS[currentGame?.id]}
                    </Suspense>
                </div>

                <div className="khelotsu-game-section-right-player-confirmation" aria-label="Press to confirm your move">
                    <div className="khelotsu-game-section-right-player-confirmation-icon">
                        <img src={GameConformIcon} alt="icon" className="khelotsu-game-section-right-player-confirmation-icon-img" />
                    </div>
                    <div className="khelotsu-game-section-right-player-confirmation-username">
                        {/** Username of a player */} User B
                    </div>
                </div>
            </section>

            <section className="khelotsu-game-drawer khelotsu-game-chat"> {/** Drawer for the games on the rightmost side */}
                <div className="khelotsu-game-drawer-details khelotsu-game-chat-details">
                    <CustomDrawer headerName="Chat" isOpen={isRightDrawerOpen} position="right"
                        onCloseCallback={_switchRightChatDrawer}>
                        <CustomChat />
                    </CustomDrawer>
                </div>
                <div className="khelotsu-game-drawer-icon khelotsu-game-chat-icon">
                    <img src={ChatIcon} alt="icon" className="khelotsu-game-chat-icon-img" onClick={_switchRightChatDrawer} />
                </div>
            </section>

            <section className="khelotsu-game-video-call">

            </section>
        </section>
    )
}

export default GameSection;