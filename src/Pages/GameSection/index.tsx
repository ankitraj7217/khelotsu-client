import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import GameIcon from "../../Assets/Icons/game-icon.png";
import ChatIcon from "../../Assets/Icons/chat-icon.png";
import GameConformIcon from "../../Assets/Icons/game-confirm.png";

import CustomDrawer from "../../Components/CustomDrawer";
import CustomChat from "../../Components/ChatDetails/CustomChat";
import { currentlySupportedGames } from "../../Constants/temporaryValues";
import GamesBoxDisplay from "../../Components/GamesBoxDisplay";
import { createFuncWithNoParams, getURLParams, updateUrlParamsWithoutReload } from "../../Utils/genericUtils";
import { IRoomUsers, ISupportedGamesListProps } from "../../Utils/customInterfaces";
import { GAME_COMPONENTS } from "./GameSection.gameloader";
import "./GameSection.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { isPersonAllowedInRoom, personsAllowedInRoomDetails } from "../../Network/roomApiCalls";
import CustomToast from "../../Components/CustomToast";
import ChatDetails from "../../Components/ChatDetails";
import { connectToSocket, createSocket } from "../../Utils/socketUtils";

const GameSection = () => {
    const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState<boolean>(false);
    const [isRightDrawerOpen, setIsRightDrawerOpen] = useState<boolean>(false);
    const [supportedGames, setSupportedGames] = useState<ISupportedGamesListProps[]>(currentlySupportedGames);
    const [currentGame, setCurrentGame] = useState<ISupportedGamesListProps>();
    const [personsAllowedInRoom, setPersonsAllowedInRoom] = useState<string[]>([]);
    const [socket, setSocket] = useState<Socket>();
    const [errorMsg, setErrorMsg] = useState<string>("");

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {

        const initializeGameRoom = async() => {
            try {
                const urlParams = getURLParams();
                const path = location.pathname.split('/');
                const roomName = path[path.length - 1];

                const personsAllowed = await personsAllowedInRoomDetails({
                    roomName
                })
                
                const allowedUserNames = personsAllowed?.data?.map((user: any) => user?.username)
                
                setPersonsAllowedInRoom(allowedUserNames);

                if ("game" in urlParams) switchGame(urlParams["game"]);

            } catch (err: any) {
                setErrorMsg(err?.message);
                setTimeout(() => {
                    navigate("/games", {replace: true});
                }, 4000);
            }
        }

        initializeGameRoom();
    }, [])

    useEffect(() => {
        try {
            const path = location.pathname.split('/');
            const roomName = path[path.length - 1];

            const socket = createSocket(roomName);
            setSocket(socket);
        } catch (err: any) {
            console.log(err?.message)
            setErrorMsg(err?.message);
        }
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
            {
                errorMsg && <CustomToast color="red" msg={errorMsg} setErrorMsg={setErrorMsg} />
            }
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
                        <ChatDetails names={personsAllowedInRoom} setErrorMsg={setErrorMsg}
                            socket={socket} /> {/** Get names from api */}
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