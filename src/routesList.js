import * as routes from "./components/constant/Routes";
import Home from "./components/home/Home";
import Search from "./components/search/Search";
import SearchDetails from "./components/searchDetails/SearchDetails";
import Leaflet from "./components/leaflet/Leaflet";
import Banner from "./components/banner/Banner";
import Category from "./components/category/Category";

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
  {
    path: routes.LEAFLETS,
    component: Leaflet,
    exact: true,
  },
  {
    path: routes.BANNERS,
    component: Banner,
    exact: true,
  },
  {
    path: routes.CATEGORY,
    component: Category,
    exact: true,
  },
];

export default routesList;
