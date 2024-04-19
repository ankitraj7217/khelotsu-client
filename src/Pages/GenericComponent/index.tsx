import React, { useState } from "react";
import Header from "../../Components/Header";
import { Outlet } from "react-router-dom";
import PageLoader from "../../Components/CustomLoader/PageLoader";

const GenericComponent = () => {
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  return (
    <>
      <Header setIsLoading={setIsPageLoading} />
      {isPageLoading ? <PageLoader /> : <Outlet />}
    </>
  );
};

export default GenericComponent;
