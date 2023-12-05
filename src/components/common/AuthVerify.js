import React from "react";
import { withRouter } from "react-router-dom";
import { getCookie } from "../../lib/helpers";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = ({ history, logOut }) => {
  const user = getCookie("user_id");

  if (user) {
    const decodedJwt = parseJwt(getCookie("token"));

    if (decodedJwt && decodedJwt.exp * 1000 < Date.now()) {
      logOut();
    }
  }

  return <div></div>;
};

export default withRouter(AuthVerify);
