import { lazy } from "react"
import { IGameSectionComponent } from "../../Utils/customInterfaces";

const ChessComponent = lazy(() => import("../../Components/Games/Chess"));
const TicTacToeComponent = lazy(() => import("../../Components/Games/TicTacToe"));
const SnakeFeedComponent = lazy(() => import("../../Components/Games/SnakeFeed"));

export const getGameComponents = (props: any): IGameSectionComponent => {
    return {
        "chess": <ChessComponent {...props} />,
        "tic_tac_toe": <TicTacToeComponent {...props} />,
        "snake_feed": <SnakeFeedComponent {...props} />
    }
}