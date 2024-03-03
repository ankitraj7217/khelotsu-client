import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import appRouter from "./Routes";

function App() {
	return (
		<div className="App">
			<RouterProvider router={appRouter} />
		</div>
	);
}

export default App;

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
