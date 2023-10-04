import * as routes from "./components/constant/Routes";
import Home from "./components/home/Home";
import Search from "./components/search/Search";
import SearchDetails from "./components/searchDetails/SearchDetails";

const routesList = [
  {
    path: routes.ROOT_ROUTE,
    component: Search,
    exact: true,
  },
  {
    path: routes.HOME_ROUTE,
    component: Home,
    exact: true,
  },
  {
    path: routes.SEARCH_ROUTE,
    component: SearchDetails,
    exact: true,
  },
];

export default routesList;
