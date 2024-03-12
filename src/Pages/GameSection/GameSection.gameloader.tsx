import { lazy } from "react"
import { IGameSectionComponent } from "../../Utils/customInterfaces";

const ChessComponent = lazy(() => import("../../Components/Games/Chess"));
const TicTacToeComponent = lazy(() => import("../../Components/Games/TicTacToe"));
const SnakeFeedComponent = lazy(() => import("../../Components/Games/SnakeFeed"));

export const GAME_COMPONENTS: IGameSectionComponent = {
    "chess": <ChessComponent />,
    "tic_tac_toe": <TicTacToeComponent />,
    "snake_feed": <SnakeFeedComponent />
}