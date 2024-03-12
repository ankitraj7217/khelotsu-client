import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ISupportedGamesListProps } from "../../Utils/customInterfaces";
import "./GamesList.scss";
import CustomModal from "../CustomModal";
import useTranslation from "../../Utils/useTranslation";
import GamesBoxDisplay from "../GamesBoxDisplay";
import { currentlySupportedGames } from "../../Constants/temporaryValues";

const GamesList = () => {
    const [supportedGames, setSupportedGames] = useState<ISupportedGamesListProps[]>([]);
    const [gameSelected, setGameSelected] = useState<ISupportedGamesListProps>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const t = useTranslation();
    const navigate = useNavigate();

    const _openModal = (game: ISupportedGamesListProps) => {
        setGameSelected(game);
        setIsModalOpen(true);
    }

    const _closeModal = () => {
        setIsModalOpen(false);
    }

    const _onCustomModalClose = (roomName: string) => {
        if (roomName) {
            _closeModal();

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
    }


    useEffect(() => {
        // api call to get the list
        setSupportedGames(currentlySupportedGames);
    }, [])

    return (
        <>
            <section className="khelotsu-frontend-games-list">
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
            <CustomModal headerName={t("CREATE_ROOM")} isOpen={isModalOpen}
                closeModal={_closeModal}
                onClose={_onCustomModalClose} />
        </>
    )
}

export default GamesList;