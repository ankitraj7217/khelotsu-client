import React, { useEffect, useState } from "react";
import Login from "../../Components/Login";

import "./Authentication.scss";
import SignUp from "../../Components/SignUp";
import { getValueFromCookies } from "../../Network/auth";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState<boolean | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = getValueFromCookies("userData");

    if (userData) {
      navigate("/games");
    }
  }, []);

  return (
    <section
      className={`khelotsu-authentication ${
        isLogin === true
          ? "animate-signUp"
          : isLogin === false
          ? "animate-signIn"
          : ""
      }`}
    >
      <div className="khelotsu-authentication-wrapper sign-up">
        <SignUp setValue={setIsLogin} />
      </div>
      <div className="khelotsu-authentication-wrapper sign-in">
        <Login setValue={setIsLogin} />
      </div>
    </section>
  );
};

export default Authentication;
