import React from "react";
import OwlCarousel from "react-owl-carousel";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/styles.scss";
import { createBrowserHistory } from "history";
import { Provider as ReduxProvider } from "react-redux";
import createStore from "./redux/store";
import Layout from "./components/container/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthVerify from "./components/common/AuthVerify";
import api from "./redux/services/api";
import { LOGOUT } from "./redux/reduxConstants/EndPoints";
import { deleteCookie, getCookie } from "./lib/helpers";
import * as routes from "./components/constant/Routes";

function App() {
  const token = getCookie("token");
  const baseUrl = process.env.REACT_APP_API_BASEURL;

  const logOut = () => {
    const headers = {
      Authorization: "bearer " + token,
    };
    api(baseUrl, headers)
      .get(LOGOUT)
      .then((res) => {
        if (res.data.message) {
          deleteCookie("token");
          deleteCookie("user_id");
          deleteCookie("email");
          window.location.replace(routes.HOME_ROUTE);
        } else {
          deleteCookie("token");
          deleteCookie("user_id");
          deleteCookie("email");
          window.location.replace(routes.HOME_ROUTE);
        }
      })
      .catch((e) => console.log(e));
  };

  const store = createStore();
  const history = createBrowserHistory();

  return (
    <ReduxProvider store={store}>
      <Router history={history}>
        <>
          <Layout />
          <AuthVerify logOut={logOut} history={history} />
        </>
      </Router>
    </ReduxProvider>
  );
}

export default App;
