// This file will be deleted after backend is done

import { ISupportedGamesListProps } from "../Utils/customInterfaces";
import TicTacToeBGImage from "../Assets/Images/tic-tac-toe-bg.png";
import SnakeFeedBGImage from "../Assets/Images/snake-feed-bg.png";
import SnakeAndLadderBGImage from "../Assets/Images/snake-and-ladder-bg.png";
import LudoBGImage from "../Assets/Images/ludo-bg.png";
import ChessBGImage from "../Assets/Images/chess-bg.png";

export const currentlySupportedGames: ISupportedGamesListProps[] = [
    // has kept id like name instead of gibbrish alphanumeric as will use this for redirection query params.
    {
        id: "chess",
        name: "Chess",
        backgroundImgURL: ChessBGImage
    },
    {
        id: "tic_tac_toe",
        name: "Tic Tac Toe",
        backgroundImgURL: TicTacToeBGImage
    },
    {
        id: "snake_feed",
        name: "Snake Feed",
        backgroundImgURL: SnakeFeedBGImage
    },
    {
        id: "snake_and_ladder",
        name: "Snake and Ladder",
        backgroundImgURL: SnakeAndLadderBGImage
    },
    {
        id: "ludo",
        name: "Ludo",
        backgroundImgURL: LudoBGImage
    }
]