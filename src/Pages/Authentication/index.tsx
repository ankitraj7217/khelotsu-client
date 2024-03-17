import React, { useEffect, useState } from "react";
import Login from "../../Components/Login";

import "./Authentication.scss";
import SignUp from "../../Components/SignUp";
import { getValueFromCookies } from "../../Network/auth";
import { useNavigate } from "react-router-dom";

const Authentication = () => {

    const [isLogin, setIsLogin] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = getValueFromCookies("userData");

        if (userData) {
            navigate("/games");
        }
    }, [])

    return (
        <section className="khelotsu-authentication">
            {
                isLogin ? (
                    <Login setValue={setIsLogin} />
                ) : (
                    <SignUp setValue={setIsLogin} />
                )
            }
        </section>
    )
}

export default Authentication;