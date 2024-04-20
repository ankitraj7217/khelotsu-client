import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HeaderIcon from "../../Assets/Images/header-icon.jpg";
import useTranslation from "../../Utils/useTranslation";
import { RootState } from "../../ReduxStore/appStore";
import BackIcon from "../../Assets/Icons/back-icon.png";

import "./Header.scss";
import { logoutUser } from "../../Network/userApiCalls";
import { deleteAllDataAndReloead } from "../../Utils/genericUtils";
import { useLocation, useNavigate } from "react-router-dom";
import { IHeader } from "../../Utils/customInterfaces";

const Header: FC<IHeader> = ({ setIsLoading }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLogoutDropdownOpen, setIsLogoutDropdownOpen] =
    useState<boolean>(false);
  const userName = useSelector((store: RootState) => store.login.userName);
  const t = useTranslation();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isRPAuth = pathname === "" || pathname === "/" || pathname === "/auth"; // RP -> Relative Path

  const _openLogoutDropdown = () => {
    setIsLogoutDropdownOpen(!isLogoutDropdownOpen);
  };

  const _logoutUser = async () => {
    setIsLoading(true);
    try {
      deleteAllDataAndReloead();
      setIsLogoutDropdownOpen(!isLogoutDropdownOpen);
      await logoutUser();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const _onBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (userName) {
      setIsLoggedIn(true);
    }
  }, [userName]);

  return (
    <header
      className="khelotsu-header"
      style={{ justifyContent: isRPAuth ? "center" : "space-between" }}
    >
      {isLoggedIn && (
        <section className="khelotsu-header-left">
          <img
            src={BackIcon}
            alt=""
            className="khelotsu-header-left-icon"
            onClick={_onBackClick}
          />
        </section>
      )}
      <section className="khelotsu-header-name">
        <h3>{t("KHELOTSU")}</h3>
      </section>
      {!isRPAuth && (
        <section className="khelotsu-header-right">
          {/* either login icon or profile icon clicking on which will show logout icon */}
          {!isLoggedIn ? (
            <div
              className="khelotsu-header-right-login"
              aria-label="Click to Login"
            >
              {t("LOGIN")}
            </div>
          ) : (
            <div
              className="khelotsu-header-right-logout"
              aria-label="Click to see option to logout"
            >
              <img
                src={HeaderIcon}
                alt="Profile Icon"
                className="khelotsu-header-right-logout-icon"
                onClick={_openLogoutDropdown}
              />
              {isLogoutDropdownOpen && (
                <section className="khelotsu-header-right-logout-dropdown">
                  <div
                    className="khelotsu-header-right-logout-dropdown__logout"
                    aria-label="Click to logout"
                    onClick={_logoutUser}
                  >
                    {t("LOGOUT")}
                  </div>
                </section>
              )}
            </div>
          )}
        </section>
      )}
    </header>
  );
};

export default Header;
