import React from "react";
import "./PageLoader.scss";

const PageLoader = () => {
  const bgColors = ["#7700ff", "#00f2ff", "#59ff00", "#ffa200", "#ff006a"];
  return (
    <section className="page-loader">
      {bgColors.map((ele, idx) => {
        return (
          <span
            key={idx}
            style={{ backgroundColor: ele, animationDelay: `${idx * 0.1}s` }}
          ></span>
        );
      })}
    </section>
  );
};

export default PageLoader;
