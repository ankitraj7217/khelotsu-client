import React, { FC, FormEvent, useRef, useState } from "react";
import useTranslation from "../../Utils/useTranslation";
import * as yup from "yup";

import { IParentSetProps } from "../../Utils/customInterfaces";
import "./SignUp.scss";
import { userSignUpSchema } from "../../Validations/user.validation";
import CustomToast from "../CustomToast";
import { useDispatch } from "react-redux";
import { registerUser } from "../../Network/userApiCalls";
import { addAndUpdateUser } from "../../ReduxStore/Slices/loginSlice";
import { setUserDatainCookies } from "../../Utils/genericUtils";
import { useNavigate } from "react-router-dom";


const SignUp: FC<IParentSetProps> = ({setValue}) => {

    const [errorMsg, setErrorMsg] = useState<string>("");
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const t = useTranslation();

    const _setLogin = () => {
        setValue(true);
    }

    const _signUpFormSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const userName = usernameRef.current?.value || "";
        const email = emailRef.current?.value || "";
        const password = passwordRef.current?.value || "";
        const confirmPassword = confirmPasswordRef.current?.value || "";

        try {
            await userSignUpSchema.validate({
                userName,
                email,
                password,
                confirmPassword
            }, {abortEarly: false});

            const user = await registerUser({
                username: userName,
                email,
                password
            });

            setUserDatainCookies(user?.data);
            dispatch(addAndUpdateUser({
                userName: user?.data?.username,
                userId: user?.data.userid,
                email: user?.data?.email
            }));
            navigate("/games");
            setErrorMsg("");
        } catch (error: any) {
            if (error instanceof yup.ValidationError) {
                for (const err of error.inner) {
                    if (err.message) {
                        // to ensure re-render happens even if message is same
                        setErrorMsg(prevMessage => prevMessage === err.message ? err.message + " " : err.message);
                        break;
                    }
                };
            } else {
                setErrorMsg(error?.message)
            }
        }

    }

    return (
        <section className="khelotsu-signup">
            {
                errorMsg && <CustomToast color="red" msg={errorMsg} setErrorMsg={setErrorMsg} />
            }
            <form className="khelotsu-signup-form" onSubmit={_signUpFormSubmit}>
                <div className="khelotsu-login-form-heading" aria-label="Sign In Header">
                    {t("SIGN_UP")}
                </div>
                <div id="khelotsu-signup-form-username" className="khelotsu-signup-form-component">
                    <label htmlFor="khelotsu-signup-form-username-input" id="khelotsu-signup-form-username-label"
                        className="khelotsu-signup-form-component-label">
                        {t("USERNAME")}
                    </label>
                    <input type="text" id="khelotsu-signup-form-username-input" name="khelotsu-signup-form-username-input"
                        className="khelotsu-signup-form-component-input" ref={usernameRef} />
                </div>
                <div id="khelotsu-signup-form-email" className="khelotsu-signup-form-component">
                    <label htmlFor="khelotsu-signup-form-email-input" id="khelotsu-signup-form-email-label"
                        className="khelotsu-signup-form-component-label">
                        {t("EMAIL")}
                    </label>
                    <input type="text" id="khelotsu-signup-form-email-input" name="khelotsu-signup-form-email-input"
                        className="khelotsu-signup-form-component-input" ref={emailRef} />
                </div>
                <div id="khelotsu-signup-form-password" className="khelotsu-signup-form-component">
                    <label htmlFor="khelotsu-signup-form-password-input" id="khelotsu-signup-form-password-label"
                        className="khelotsu-signup-form-component-label">
                        {t("PASSWORD")}
                    </label>
                    <input type="password" id="khelotsu-signup-form-password-input" name="khelotsu-signup-form-password-input"
                        className="khelotsu-signup-form-component-input" ref={passwordRef} />
                </div>
                <div id="khelotsu-signup-form-password-confirm" className="khelotsu-signup-form-component">
                    <label htmlFor="khelotsu-signup-form-password-confirm-input" id="khelotsu-signup-form-password-confirm-label"
                        className="khelotsu-signup-form-component-label">
                        {t("CONFIRM_PASSWORD")}
                    </label>
                    <input type="password" id="khelotsu-signup-form-password-confirm-input" name="khelotsu-signup-form-password-confirm-input"
                        className="khelotsu-signup-form-component-input" ref={confirmPasswordRef} />
                </div>
                <input type="submit" value="Submit" className="khelotsu-signup-form-submit"></input>
            </form>

            <div className="khelotsu-signup-login">
                <div className="khelotsu-signup-login-not">
                    {t("ALREADY_A_USER")}
                </div>
                &nbsp;
                <div className="khelotsu-signup-login-msg" onClick={_setLogin}>
                    {t("SIGN_IN")}
                </div>
            </div>
        </section>
    )
}

export default SignUp;