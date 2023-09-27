/**
 * @author Sonali Raut
 */
// Importing React's component
import React from "react";
import { Link } from "react-router-dom";
import * as routes from "../../constant/Routes";

/**
 * @description This UI Component for NoPageFound.
 */

export const NoPageFound = ({ isFor }) => (
  <div className="no-page-found" id="mainContainer" data-testid="no-page-found">
    <div className="messg-info">
      {<h3>404</h3>}
      <h4>Ooops!</h4>
      <h5>
        We can't find the page
        <span>you are looking for</span>
      </h5>
      <Link to={routes.ROOT_ROUTE}>
        <button>Back to Homepage</button>{" "}
      </Link>
    </div>
  </div>
);

export default NoPageFound;
