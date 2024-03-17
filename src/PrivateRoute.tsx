import React, { FC, useEffect, useState } from "react";
import { IPrivateRouteComponent } from "./Utils/customInterfaces";
import { useNavigate } from "react-router-dom";
import { getValueFromCookies } from "./Network/auth";
import { useDispatch } from "react-redux";
import { addAndUpdateUser } from "./ReduxStore/Slices/loginSlice";

const PrivateRoute: FC<IPrivateRouteComponent> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const userData = getValueFromCookies("userData");

        console.log(userData);
        

        if (userData) {
            dispatch(addAndUpdateUser(userData));
            setIsLoggedIn(true);
            return;
        }

        setIsLoggedIn(false);
        navigate("/auth", {replace: true})

    }, [])

    return (
        <div className="pvt-route">
            {
                isLoggedIn ? 
                children :
                <div className="pvt-route-loader">
                    Loader...
                </div>
            }
        </div>
    )
}

export default PrivateRoute;