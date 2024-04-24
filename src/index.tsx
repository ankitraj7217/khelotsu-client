import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import appRouter from "./Routes";
import { Provider as ReduxProvider } from "react-redux";
import appStore from "./ReduxStore/appStore";
import { serverStartAPICall } from "./Network/genericApiCalls";


function App() {
  
  useEffect(() => {
    serverStartAPICall()
      .then((res) => console.log("Server Started"))
      .catch((err) => console.error(err));
  }, []);

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
	// <React.StrictMode>
		<App />
	// </React.StrictMode>
);
