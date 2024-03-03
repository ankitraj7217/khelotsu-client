// This file will be deleted after backend is done

import { ISupportedGamesListProps } from "../Utils/customInterfaces";
import TicTacToeBGImage from "../Assets/Images/tic-tac-toe-bg.png";
import SnakeFeedBGImage from "../Assets/Images/snake-feed-bg.png";
import SnakeAndLadderBGImage from "../Assets/Images/snake-and-ladder-bg.png";
import LudoBGImage from "../Assets/Images/ludo-bg.png";

export const currentlySupportedGames: ISupportedGamesListProps[] = [
	{
		id: "123",
		name: "Tic Tac Toe",
		backgroundImgURL: TicTacToeBGImage
	},
	{
		id: "456",
		name: "Snake Feed",
		backgroundImgURL: SnakeFeedBGImage
	},
	{
		id: "789",
		name: "Snake and Ladder",
		backgroundImgURL: SnakeAndLadderBGImage
	},
	{
		id: "012",
		name: "Ludo",
		backgroundImgURL: LudoBGImage
	}
];
