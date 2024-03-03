import React, { useState } from "react";
import HeaderIcon from "../../Assets/Images/header-icon.jpg";
import useTranslation from "../../Utils/useTranslation";

import "./Header.scss";

const Header = () => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [isLogoutDropdownOpen, setIsLogoutDropdownOpen] =
		useState<boolean>(false);
	const t = useTranslation();

	const _openLogoutDropdown = () => {
		setIsLogoutDropdownOpen(!isLogoutDropdownOpen);
	};

	return (
		<header className="khelotsu-header">
			<section className="khelotsu-header-left">
				<img src={HeaderIcon} alt="" className="khelotsu-header-left-icon" />
			</section>
			<section className="khelotsu-header-name">{t("KHELOTSU")}</section>
			<section className="khelotsu-header-right">
				{/* either login icon or profile icon clicking on which will show logout icon */}
				{!isLoggedIn ? (
					<div
						className="khelotsu-header-right-login"
						aria-label="Click to Login">
						{t("LOGIN")}
					</div>
				) : (
					<div
						className="khelotsu-header-right-logout"
						aria-label="Click to see option to logout">
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
									aria-label="Click to logout">
									{t("LOGOUT")}
								</div>
							</section>
						)}
					</div>
				)}
			</section>
		</header>
	);
};

export default Header;
