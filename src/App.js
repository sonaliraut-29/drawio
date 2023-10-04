import React from "react";
import OwlCarousel from "react-owl-carousel";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/styles.scss";
import { createBrowserHistory } from "history";
import { Provider as ReduxProvider } from "react-redux";
import createStore from "./redux/store";
import Layout from "./components/container/Layout";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const store = createStore();
  const history = createBrowserHistory();

  return (
    <ReduxProvider store={store}>
      <Router history={history}>
        <Layout />
      </Router>
    </ReduxProvider>
  );
}

export default App;
