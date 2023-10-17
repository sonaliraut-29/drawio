import React from "react";
const CommunityLoaderCircularDash = ({ isbackground }) => {
  return (
    <React.Fragment>
      <div
        className={
          "community-circular-dash-loader" +
          " " +
          (isbackground ? "community-loader-bg" : "")
        }
      >
        <div id="floatingBarsG">
          <div className="blockG" id="rotateG_01"></div>
          <div className="blockG" id="rotateG_02"></div>
          <div className="blockG" id="rotateG_03"></div>
          <div className="blockG" id="rotateG_04"></div>
          <div className="blockG" id="rotateG_05"></div>
          <div className="blockG" id="rotateG_06"></div>
          <div className="blockG" id="rotateG_07"></div>
          <div className="blockG" id="rotateG_08"></div>
          <div className="blockG" id="rotateG_09"></div>
          <div className="blockG" id="rotateG_10"></div>
          <div className="blockG" id="rotateG_11"></div>
          <div className="blockG" id="rotateG_12"></div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default CommunityLoaderCircularDash;
