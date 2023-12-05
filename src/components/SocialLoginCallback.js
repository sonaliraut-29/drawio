import React, { useEffect } from "react";
import axios from "axios";
import { getCookie, setCookie } from "../lib/helpers";

const SocialLoginCallback = ({ history }) => {
  const baseUrl = process.env.REACT_APP_API_BASEURL;
  const token = getCookie("token");
  useEffect(() => {
    const code = new URLSearchParams(
      history && history.location && history.location.search
    ).get("code");

    // Make a POST request to your backend using Axios
    axios
      .post(baseUrl + `/google/callback`, { code })
      .then((res) => {
        // Handle the response from the backend
        // You may want to store user information in the state or context
        // and redirect the user to the desired page

        if (res && res.data) {
          setCookie("token", res.data.access_token, 365);
          setCookie("user_id", res.data.user.User_ID, 365);
          setCookie("email", res.data.user.email, 365);
        }
        history.push("/");
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  }, [history]);

  return <div>Logging in...</div>;
};

export default SocialLoginCallback;
