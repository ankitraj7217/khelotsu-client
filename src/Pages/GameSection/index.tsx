import React, { useCallback, useState } from "react";
import TicTacToe from "../../Components/Games/TicTacToe";
import TicTacToeImg from "../../Assets/Images/tic-tac-toe-bg.png";
import GameIcon from "../../Assets/Icons/game-icon.png";
import ChatIcon from "../../Assets/Icons/chat-icon.png";
import GameConformIcon from "../../Assets/Icons/game-confirm.png";

import "./GameSection.scss";
import CustomDrawer from "../../Components/CustomDrawer";
import CustomChat from "../../Components/CustomChat";
import { currentlySupportedGames } from "../../Constants/temporaryValues";
import GamesBoxDisplay from "../../Components/GamesBoxDisplay";

const GameSection = () => {
	const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState<boolean>(false);
	const [isRightDrawerOpen, setIsRightDrawerOpen] = useState<boolean>(false);

	const _switchLeftGamesListDrawer = useCallback(() => {
		setIsLeftDrawerOpen((prevVal) => !prevVal);
	}, []);

	const _switchRightChatDrawer = useCallback(() => {
		setIsRightDrawerOpen((prevVal) => !prevVal);
	}, []);

	return (
		<section
			className="khelotsu-game"
			style={{ backgroundImage: `url(${TicTacToeImg})` }}>
			<section className="khelotsu-game-drawer khelotsu-game-list">
				{" "}
				{/** Drawer for the games on the leftmost side */}
				<div className="khelotsu-game-drawer-details khelotsu-game-list-details">
					<CustomDrawer
						headerName="Other Games List"
						isOpen={isLeftDrawerOpen}
						position="left"
						onCloseCallback={_switchLeftGamesListDrawer}>
						{currentlySupportedGames.map((ele) => (
							<div className="khelotsu-game-list-details-game" key={ele.id}>
								<GamesBoxDisplay {...ele} />
							</div>
						))}
					</CustomDrawer>
				</div>
				<div className="khelotsu-game-drawer-icon khelotsu-game-list-icon">
					<img
						src={GameIcon}
						alt="icon"
						className="khelotsu-game-list-icon-img"
						onClick={_switchLeftGamesListDrawer}
					/>
				</div>
			</section>

			<section className="khelotsu-game-section">
				{" "}
				{/** game-section like tic tac toe */}
				<div
					className="khelotsu-game-section-left-player-confirmation"
					aria-label="Press to confirm your move">
					<div className="khelotsu-game-section-left-player-confirmation-icon">
						<img
							src={GameConformIcon}
							alt="icon"
							className="khelotsu-game-section-left-player-confirmation-icon-img"
						/>
					</div>
					<div className="khelotsu-game-section-left-player-confirmation-username">
						{/** Username of a player */} User A
					</div>
				</div>
				<div className="khelotsu-game-section-game">
					<TicTacToe />
				</div>
				<div
					className="khelotsu-game-section-right-player-confirmation"
					aria-label="Press to confirm your move">
					<div className="khelotsu-game-section-right-player-confirmation-icon">
						<img
							src={GameConformIcon}
							alt="icon"
							className="khelotsu-game-section-right-player-confirmation-icon-img"
						/>
					</div>
					<div className="khelotsu-game-section-right-player-confirmation-username">
						{/** Username of a player */} User B
					</div>
				</div>
			</section>

			<section className="khelotsu-game-drawer khelotsu-game-chat">
				{" "}
				{/** Drawer for the games on the rightmost side */}
				<div className="khelotsu-game-drawer-details khelotsu-game-chat-details">
					<CustomDrawer
						headerName="Chat"
						isOpen={isRightDrawerOpen}
						position="right"
						onCloseCallback={_switchRightChatDrawer}>
						<CustomChat />
					</CustomDrawer>
				</div>
				<div className="khelotsu-game-drawer-icon khelotsu-game-chat-icon">
					<img
						src={ChatIcon}
						alt="icon"
						className="khelotsu-game-chat-icon-img"
						onClick={_switchRightChatDrawer}
					/>
				</div>
			</section>

			<section className="khelotsu-game-video-call"></section>
		</section>
	);
};

export default GameSection;
