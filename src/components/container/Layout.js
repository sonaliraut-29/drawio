import React, { useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import NoPageFound from "../common/uikit/NoPageFound";
import routesList from "../../routesList";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";

const Layout = ({ history }) => {
  const isLoginOrRegiterRoute =
    history &&
    history.location &&
    history.location.pathname &&
    (history.location.pathname.includes("/login") ||
      history.location.pathname.includes("/register"))
      ? true
      : false;
  return (
    <React.Fragment>
      {!isLoginOrRegiterRoute && <Header />}

      <Switch>
        {routesList.map((route) => {
          const data = {
            ...route,
          };
          return <Route key={route.path} {...data} />;
        })}
        <Route component={NoPageFound} />
      </Switch>

      {!isLoginOrRegiterRoute && <Footer />}
    </React.Fragment>
  );
};

export default withRouter(Layout);
