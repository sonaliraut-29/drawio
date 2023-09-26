import React, { useEffect } from "react";
import api from "../../redux/services/api";
import { LEAFLETS } from "../../redux/reduxConstants/EndPoints";

const Home = () => {
  useEffect(() => {
    fetchLeafts();
  }, []);

  const baseUrl = process.env.REACT_APP_API_BASEURL;

  const fetchLeafts = () => {
    api(baseUrl)
      .get(LEAFLETS + "?days_tolerance=-25&num_of_rows_required=10")
      .then((res) => {
        console.log(res);
        if (res.data.success) {
        }
      })
      .catch((e) => console.log(e));
  };
  return <div data-testid="home-page">Home page</div>;
};

export default Home;
