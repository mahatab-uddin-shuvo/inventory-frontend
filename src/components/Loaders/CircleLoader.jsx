import React from "react";

const CircleLoader = () => {
  return (
    <>
      <div className="preloader">
        <div className="overlay__inner">
          <div className="overlay__content">
            <span className="spin"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CircleLoader;
