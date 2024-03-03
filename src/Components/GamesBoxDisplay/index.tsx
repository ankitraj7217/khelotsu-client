import React, { FC } from "react";
import { ISupportedGamesListProps } from "../../Utils/customInterfaces";

import "./GamesBoxDisplay.scss";

const GamesBoxDisplay: FC<ISupportedGamesListProps> = ({
	id,
	name,
	backgroundImgURL
}) => {
	return (
		<div
			className="games-box-display"
			style={{ backgroundImage: `url(${backgroundImgURL})` }}
			key={id}>
			<span>{name}</span>
		</div>
	);
};

export default GamesBoxDisplay;
