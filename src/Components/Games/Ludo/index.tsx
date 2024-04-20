import React from "react";
import useTranslation from "../../../Utils/useTranslation";

const Ludo = () => {
  const t = useTranslation();
  return <div className="ludo">{t("UNAVAILABLE_GAME_MSG")}</div>;
};

export default Ludo;
