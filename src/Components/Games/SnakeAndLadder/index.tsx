import React from "react";
import useTranslation from "../../../Utils/useTranslation";

const SnakeAndLadder = () => {
  const t = useTranslation();
  return <div className="snake-and-ladder">{t("UNAVAILABLE_GAME_MSG")}</div>;
};

export default SnakeAndLadder;
