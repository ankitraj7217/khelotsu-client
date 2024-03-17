import React from "react";
import { createBrowserRouter } from "react-router-dom";
import GenericComponent from "./Pages/GenericComponent";
import Authentication from "./Pages/Authentication";
import GamesList from "./Components/GamesList";
import GameSection from "./Pages/GameSection";
import PrivateRoute from "./PrivateRoute";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <GenericComponent />,
        children: [
            {
                path: "",
                element: <Authentication />
            },
            {
                path: "auth",
                element: <Authentication />
            },
            {
                path: "games",
                element: <PrivateRoute> <GamesList /> </PrivateRoute>
            },
            {
                path: "games/:name",
                element: <PrivateRoute> <GameSection /> </PrivateRoute>
            }
        ]
    }
]);

export default appRouter;