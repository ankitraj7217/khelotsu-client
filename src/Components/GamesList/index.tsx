import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ISupportedGamesListProps } from "../../Utils/customInterfaces";
import "./GamesList.scss";
import CustomModal from "../CustomModal";
import useTranslation from "../../Utils/useTranslation";
import GamesBoxDisplay from "../GamesBoxDisplay";
import { currentlySupportedGames } from "../../Constants/temporaryValues";

const GamesList = () => {
	const [supportedGames, setSupportedGames] = useState<
		ISupportedGamesListProps[]
	>([]);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const t = useTranslation();
	const navigate = useNavigate();

	const _openModal = () => {
		setIsModalOpen(true);
	};

	const _closeModal = () => {
		setIsModalOpen(false);
	};

	const _onCustomModalClose = (roomName: string) => {
		if (roomName) {
			_closeModal();
			navigate(`${roomName}`);
		}
	};

	useEffect(() => {
		// api call to get the list

		setSupportedGames(currentlySupportedGames);
	}, []);

	return (
		<>
			<section className="khelotsu-frontend-games-list">
				{supportedGames.map((ele) => {
					return (
						<div
							className="khelotsu-frontend-games-list-game"
							key={ele.id}
							aria-label={`select-game-${ele.name}`}
							onClick={_openModal}>
							<GamesBoxDisplay
								id={ele.id}
								name={ele.name}
								backgroundImgURL={ele.backgroundImgURL}
							/>
						</div>
					);
				})}
			</section>
			<CustomModal
				headerName={t("CREATE_ROOM")}
				isOpen={isModalOpen}
				closeModal={_closeModal}
				onClose={_onCustomModalClose}
			/>
		</>
	);
};

export default GamesList;
