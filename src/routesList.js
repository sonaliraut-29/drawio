import * as routes from "./components/constant/Routes";
import Home from "./components/home/Home";
import Search from "./components/search/Search";
import SearchDetails from "./components/searchDetails/SearchDetails";
import Leaflet from "./components/leaflet/Leaflet";
import Banner from "./components/banner/Banner";
import Category from "./components/category/Categories";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import ProductDetail from "./components/productDetail/ProductDetail";
import Favourites from "./components/favourites/Favourites";
import Profile from "./components/profile/Profile";
import ChangePassword from "./components/changePassword/ChangePassword";

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
  {
    path: routes.LOGIN,
    component: Login,
    exact: true,
  },
  {
    path: routes.REGISTER,
    component: Register,
    exact: true,
  },
  {
    path: routes.PRODUCTDETAIL,
    component: ProductDetail,
    exact: true,
  },
  {
    path: routes.FAVOURITES,
    component: Favourites,
    exact: true,
  },
  {
    path: routes.MY_PROFILE,
    component: Profile,
    exact: true,
  },
  {
    path: routes.CHANGE_PASSWORD,
    component: ChangePassword,
    exact: true,
  },
];

export default routesList;
