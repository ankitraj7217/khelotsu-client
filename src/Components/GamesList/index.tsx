import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ISupportedGamesListProps } from "../../Utils/customInterfaces";
import "./GamesList.scss";
import CustomModal from "../CustomModal";
import useTranslation from "../../Utils/useTranslation";
import GamesBoxDisplay from "../GamesBoxDisplay";
import { currentlySupportedGames } from "../../Constants/temporaryValues";
import CustomToast from "../CustomToast";
import { createRoom } from "../../Network/roomApiCalls";

const GamesList = () => {
    const [supportedGames, setSupportedGames] = useState<ISupportedGamesListProps[]>([]);
    const [gameSelected, setGameSelected] = useState<ISupportedGamesListProps>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const t = useTranslation();
    const navigate = useNavigate();

    const _openModal = (game: ISupportedGamesListProps) => {
        setGameSelected(game);
        setIsModalOpen(true);
    }

    const _closeModal = () => {
        setIsModalOpen(false);
    }

    const _onCustomModalClose = async(roomName: string) => {
        try {
            if (roomName) {
                _closeModal();

                const roomCreated = await createRoom({
                    roomName
                })

                console.log(roomCreated);
                

                if (roomCreated?.data !== roomName) {
                    throw new Error("Room creation failed");
                }

                if (gameSelected && "id" in gameSelected) {
                    const queryParams = {
                        game: gameSelected.id
                    }
                    const queryString = new URLSearchParams(queryParams).toString();
                    navigate(`${roomName}?${queryString}`);

                } else {
                    navigate(`${roomName}`);
                }
            }
        } catch (err: any) {
            setErrorMsg(err?.message)
        }
    }


    useEffect(() => {
        // api call to get the list
        setSupportedGames(currentlySupportedGames);
    }, [])

    return (
        <>
            <section className="khelotsu-frontend-games-list">
                {
                    errorMsg && errorMsg.length && <CustomToast color="red" msg={errorMsg} setErrorMsg={setErrorMsg} />
                }
                {
                    supportedGames.map((ele) => {
                        return (
                            <div className="khelotsu-frontend-games-list-game" key={ele.id} aria-label={`select-game-${ele.name}`}
                                onClick={() => _openModal(ele)}>
                                <GamesBoxDisplay {...ele} />
                            </div>
                        )
                    })
                }
            </section>
            <CustomModal headerName={t("CREATE_ROOM")}
                isOpen={isModalOpen}
                closeModal={_closeModal}
                onClose={_onCustomModalClose} />
        </>
    )
}

export default GamesList;