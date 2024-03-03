import React from "react";
import { createBrowserRouter } from "react-router-dom";
import GenericComponent from "./Pages/GenericComponent";
import Authentication from "./Pages/Authentication";
import GamesList from "./Components/GamesList";
import GameSection from "./Pages/GameSection";

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
				element: <GamesList />
			},
			{
				path: "games/:name",
				element: <GameSection />
			}
		]
	}
]);

export default appRouter;
