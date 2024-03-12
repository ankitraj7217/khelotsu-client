// part of redux, not react-redux..need react-redux to provide these functionalities to our app.
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Slices/loginSlice";

// Add slices here
const appStore = configureStore({
    reducer: {
        login: loginReducer
    }
});

export default appStore;




// How to read Data:
// 1. Read -> const loginDetails = useSelector((store) => store.login.userName) -> Check if other gets dispatched, does it re-renders too?
// 2. Dispatch -> dispatch(addAndUpdateUser("something")) -> payload = "something" -> can be an object too