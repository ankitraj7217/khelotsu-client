import React, { useState } from "react";
import Login from "../../Components/Login";

import "./Authentication.scss";
import SignUp from "../../Components/SignUp";

const Authentication = () => {
	const [isLogin, setIsLogin] = useState<boolean>(false);

	return (
		<section className="khelotsu-authentication">
			{isLogin ? (
				<Login setValue={setIsLogin} />
			) : (
				<SignUp setValue={setIsLogin} />
			)}
		</section>
	);
};

export default Authentication;
