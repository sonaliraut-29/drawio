import * as routes from "./components/constant/Routes";
import Home from "./components/home/Home";

const routesList = [
  {
    path: routes.ROOT_ROUTE,
    component: Home,
    exact: true,
  },
];

export default routesList;
