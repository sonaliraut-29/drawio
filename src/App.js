import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/styles.scss";
import { createBrowserHistory } from "history";
import { Provider as ReduxProvider } from "react-redux";
import createStore from "./redux/store";
import Layout from "./components/container/Layout";

function App() {
  const store = createStore();
  const history = createBrowserHistory();

  return (
    <ReduxProvider store={store}>
      <Router>
        <Layout history={history} />
      </Router>
    </ReduxProvider>
  );
}

export default App;
