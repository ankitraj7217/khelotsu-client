import React from "react";
import useTranslation from "../../../Utils/useTranslation";

const SnakeFeed = () => {
  const t = useTranslation();
  return <div className="snake-feed">{t("UNAVAILABLE_GAME_MSG")}</div>;
};

export default SnakeFeed;
