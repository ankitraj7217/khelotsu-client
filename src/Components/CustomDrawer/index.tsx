import React, { FC } from "react";
import { ICustomDrawerProps } from "../../Utils/customInterfaces";

import "./CustomDrawer.scss";

// Can make HOC -> withCustomDrawer, but it's useless and complex. Simplicity is the best complexity.
// Not convinced, read this: https://legacy.reactjs.org/docs/higher-order-components.html
const CustomDrawer: FC<ICustomDrawerProps> = ({
  headerName,
  isOpen,
  position,
  onCloseCallback = () => {},
  children,
}) => {
  return (
    <section
      className={`khelotsu-custom-drawer khelotsu-custom-drawer${
        isOpen ? "-open" : "-close"
      } khelotsu-custom-drawer-${position}`}
    >
      <div className="khelotsu-custom-drawer-content">
        <div className="khelotsu-custom-drawer-content-heading">
          <div
            className="khelotsu-custom-drawer-content-heading-header"
            aria-label={`${headerName}`}
          >
            {headerName}
          </div>
          <div
            className="khelotsu-custom-drawer-content-heading-close-button"
            onClick={onCloseCallback}
            aria-label="Close drawer"
          >
            &times;
          </div>
        </div>
        <div className="khelotsu-custom-drawer-content-children">
          {children}
        </div>
      </div>
    </section>
  );
};

export default CustomDrawer;
