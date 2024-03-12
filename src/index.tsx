import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import appRouter from "./Routes";
import { Provider as ReduxProvider } from "react-redux";
import appStore from "./ReduxStore/appStore";

function App() {
  return (
    <div className="App">
      <ReduxProvider store={appStore}>
        <RouterProvider router={appRouter} />
      </ReduxProvider>
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
