import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import api from "../../redux/services/api";
import { BANNERS } from "../../redux/reduxConstants/EndPoints";

import * as images from "../constant/Assets";
import * as routes from "../constant/Routes";

const ProductDetail = ({ history }) => {
  const [banners, setBanners] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetchBanners();
  }, []);

  const baseUrl = process.env.REACT_APP_API_BASEURL;

  const fetchBanners = () => {
    api(baseUrl)
      .get(BANNERS + "?days_tolerance=-10&num_of_rows_required=10")
      .then((res) => {
        if (res.data.success) {
          setBanners(res.data.data);
        }
      })
      .catch((e) => console.log(e));
  };

  const handleChange = (e) => {
    if (e.target.value) {
      setSearchValue(e.target.value);
    } else {
      setSearchValue("");
    }
  };

  const handleSearch = () => {
    history.push({
      pathname: `${routes.SEARCH_ROUTE}`,
      search: `?query=${searchValue}`,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchValue.trim().length > 0) {
      history.push({
        pathname: `${routes.SEARCH_ROUTE}`,
        search: `?query=${searchValue}`,
      });
    }
  };

  return <>Test</>;
};
export default ProductDetail;
