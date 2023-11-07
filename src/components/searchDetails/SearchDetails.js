import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Accordion,
  Dropdown,
  Modal,
} from "react-bootstrap";
import * as images from "../constant/Assets";

import api from "../../redux/services/api";
import {
  SEARCH,
  CATEGORIES,
  SUBCATEGORIES,
  ADD_FAVOURITES,
  REMOVE_FAVOURITES,
  VENDORS,
  BRANDS,
} from "../../redux/reduxConstants/EndPoints";
import Pagination from "../../uikit/Paginate";
import CommunityLoaderCircularDash from "../../uikit/CommunityLoaderCircularDash";
import ReactSlider from "react-slider";
import { deleteCookie, getCookie } from "../../lib/helpers";

import * as routes from "../constant/Routes";

const SearchDetails = ({ history }) => {
  let fullSlug = "";
  let slugString = "";
  let slug = "";
  let searchArr = "";
  let searchText = "";
  let arrSubCategory = [];
  let arrVendor = [];
  let arrCategory = [];
  let arrBrand = [];
  if (window !== undefined && typeof window !== "undefined") {
    const paramArray = window.location.href.split("/");

    fullSlug = paramArray[paramArray.length - 1];

    if (fullSlug.includes("?")) {
      slugString = fullSlug.split("?");
      slug = slugString[1];

      if (slug) {
        searchArr = slug.split("=");
        let searchUrl = searchArr[1];

        if (searchArr[0] == "query" && searchUrl) {
          let searchUrlArr = searchUrl.split("&");
          if (searchUrlArr && searchUrlArr.length > 0) {
            searchText = searchUrlArr[0];
          }
        }
      }
    } else {
      slug = paramArray[paramArray.length - 1];
    }

    const query = new URLSearchParams(history.location.search);
    let sub_category = query.get("sub_category");

    if (sub_category && "" !== sub_category) {
      sub_category = sub_category
        .replace("_", " ")
        .replace("and_", "and ")
        .replace("and", "&");
      arrSubCategory = sub_category.split(",");
      arrSubCategory = arrSubCategory.map((item) => {
        if (item.includes("|")) {
          item = item.replace("|", ", ");
        }
        if (item.includes("addcomma")) {
          item = item.replace(" addcomma", ",");
        }
        return item;
      });
    }

    let vendor = query.get("vendor");

    if (vendor && "" !== vendor) {
      vendor = vendor
        .replace("_", " ")
        .replace("and_", "and ")
        .replace("and", "&");
      arrVendor = vendor.split(",");
    }

    let brand = query.get("brand");

    if (brand && "" !== brand) {
      brand = brand
        .replace("_", " ")
        .replace("and_", "and ")
        .replace("and", "&");
      arrBrand = brand.split(",");
    }

    let category = query.get("category");

    if (category && "" !== category) {
      category = category
        .replace("_", " ")
        .replace("and_", "and ")
        .replace("and", "&");

      arrCategory = category.split(",");
      arrCategory = arrCategory.map((item) => {
        if (item.includes("|")) {
          item = item.replace("|", ", ");
        }
        if (item.includes("addcomma")) {
          item = item.replace(" addcomma", ",");
        }
        return item;
      });
    }
  }

  const [value, setValue] = useState([]);
  const [productList, setProductList] = useState([]);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubcategories] = useState([]);
  const [actualSubcategories, setActualSubCategories] = useState([]);
  const [actualCategories, setActualCategories] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState(
    history &&
      history.location &&
      history.location.state &&
      history.location.state !== undefined &&
      history.location.state.selectedCategory
      ? [history.location.state.selectedCategory]
      : arrCategory
      ? arrCategory
      : []
  );
  const [selectedSubCategories, setSelectedSubCategories] = useState(
    arrSubCategory ? arrSubCategory : []
  );
  const [totalCount, setTotalCount] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5);

  const [OrderBy, setOrderBy] = useState("NEWID()");
  const [sort, setSort] = useState("");

  const [vendors, setVendors] = useState();
  const [selectedVendors, setSelectedVendors] = useState(
    arrVendor ? arrVendor : []
  );
  const [title, setTitle] = useState();

  const [exclude_accessory, setExcludeAccessory] = useState(0);
  const [only_discounted, setOnlyDiscounted] = useState(0);
  const [available_only, setAvailableOnly] = useState(0);
  const [isShowFilter, setIsShowFilter] = useState(true);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState(
    arrBrand ? arrBrand : []
  );
  const [isShowPopup, setIsShowPopup] = useState(false);

  const token = getCookie("token");

  const handleClose = () => setIsShowPopup(false);
  const handleShow = () => setIsShowPopup(true);

  // for filter-popup
  // const [show, setShow] = useState(false);

  const [isShowMobFilter, setIsMobShowFilter] = useState(false);
  const handleCloseFilter = () => setIsMobShowFilter(false);
  const handleShowFilter = () => setIsMobShowFilter(true);

  // const [expandedItem, setExpandedItem] = useState(
  //   arrCategory.length > 0 || arrSubCategory.length > 0 ? "0" : ""
  // );
  // const [expandedItemInner, setExpandedItemInner] = useState("");

  const [isActive, setIsActive] = useState(
    arrVendor && arrVendor.length > 0 ? true : false
  );

  const [isActiveBrand, setIsActiveBrand] = useState(
    arrBrand && arrBrand.length > 0 ? true : false
  );

  const [isActiveCategory, setIsActiveCategory] = useState(
    ((arrCategory && arrCategory.length) ||
      (arrSubCategory && arrSubCategory.length > 0)) > 0
      ? true
      : false
  );

  const [activeCategory, setActiveCategory] = useState(
    arrSubCategory && arrSubCategory.length ? [0] : []
  );
  const [isActiveSubCategory, setIsActiveSubcategory] = useState(
    arrSubCategory && arrSubCategory.length > 0 ? true : false
  );

  const [activeIndex, setActiveIndex] = useState(
    arrSubCategory && arrSubCategory.length > 0 ? 0 : undefined
  );

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
    fetchVendors();
    fetchBrands();
  }, []);

  useEffect(() => {
    history &&
      history.location &&
      history.location.state &&
      history.location.state !== undefined &&
      history.location.state.selectedCategory &&
      setIsShowFilter(true);
  }, [history]);

  useEffect(() => {
    const subCategoriesTemp = [];
    if (subCategories && subCategories.length > 0) {
      subCategories.forEach((item) => {
        const Category = item.Category;
        subCategoriesTemp[Category] = subCategoriesTemp[Category] || [];
        subCategoriesTemp[Category].push(item.Sub_Category);
      });
      const resultKeys = Object.keys(subCategoriesTemp);
      const resultArray = Object.values(subCategoriesTemp);

      setActualSubCategories(resultArray);
      setActualCategories(resultKeys);
    }
  }, [subCategories]);

  useEffect(() => {
    fetchProductList(
      searchValue && "" !== searchValue ? searchValue : searchText
    );

    let valuesearch =
      searchValue && "" !== searchValue ? searchValue : searchText;
    let text = "";
    if (value.length > 0) {
      text = "&price_from=" + value[0] + "&price_to=" + value[1];
    }

    let categoryText = "";
    if (selectedCategories && selectedCategories.length > 0) {
      const newselectedCategories = selectedCategories.map((item) => {
        return item
          .replace(/ & /g, "_and_")
          .replace(/&/g, "and")
          .replace(",", " addcomma");
      });

      let category = newselectedCategories.join("|");

      categoryText = "&category=" + category;
    }

    let subcategoryText = "";
    if (selectedSubCategories && selectedSubCategories.length > 0) {
      const newselectedSubCategories = selectedSubCategories.map((item) => {
        return item
          .replace(/ & /g, "_and_")
          .replace(/&/g, "and")
          .replace(",", " addcomma");
      });

      const subcategory = newselectedSubCategories.join("|");
      subcategoryText = "&sub_category=" + subcategory;
    }

    let vendorText = "";
    if (selectedVendors && selectedVendors.length > 0) {
      const vendor = selectedVendors.join(",");
      vendorText = "&vendor=" + vendor;
    }

    let brandText = "";
    if (selectedBrands && selectedBrands.length > 0) {
      const brands = selectedBrands.join(",");

      brandText = "&brand=" + brands;
    }
    let url = `?query=${valuesearch}&page=1&page_size=${limit}${text}${categoryText}${vendorText}${subcategoryText}${brandText}`;

    if (exclude_accessory) {
      url = url + "&exclude_accessory=" + exclude_accessory;
    }

    if (only_discounted) {
      url = url + "&only_discounted=" + only_discounted;
    }

    if (available_only) {
      url = url + "&available_only=" + available_only;
    }

    // if (valuesearch) {
    history.replace({
      pathname: history.location.pathname,
      search: url,
    });
    // }
  }, [
    selectedCategories,
    selectedSubCategories,
    selectedVendors,
    selectedBrands,
    exclude_accessory,
    only_discounted,
    available_only,
    OrderBy,
    sort,
    value,
    limit,
  ]);

  const baseUrl = process.env.REACT_APP_API_BASEURL;

  const handleVendor = (e) => {
    setPage(1);
    setLimit(20);
    const prevValues = [...selectedVendors];

    if (e.target.checked) {
      prevValues.push(e.target.value);
      setSelectedVendors(prevValues);
    } else {
      const newArray = prevValues.filter((item) => item !== e.target.value);
      setSelectedVendors(newArray);
    }
  };

  const handleBrand = (e) => {
    setPage(1);
    setLimit(20);
    const prevValues = [...selectedBrands];

    if (e.target.checked) {
      prevValues.push(e.target.value);
      setSelectedBrands(prevValues);
    } else {
      const newArray = prevValues.filter((item) => item !== e.target.value);
      setSelectedBrands(newArray);
    }
  };
  const handleCategories = (e) => {
    setLimit(20);
    const prevValues = [...selectedCategories];

    if (e.target.checked) {
      prevValues.push(e.target.value);
      setSelectedCategories(prevValues);
    } else {
      const newArray = prevValues.filter((item) => item !== e.target.value);
      setSelectedCategories(newArray);
    }
    // setExpandedItem(0);
  };

  const handleSubcategories = (e, key) => {
    setLimit(20);
    const prevValues = [...selectedSubCategories];
    const prevCategories = [...selectedCategories];

    const removeCategory = actualCategories[key];

    if (removeCategory) {
      const newArray = prevCategories.filter((item) => item !== removeCategory);
      setSelectedCategories(newArray);
    }
    if (e.target.checked) {
      prevValues.push(e.target.value);
      setSelectedSubCategories(prevValues);
      setActiveIndex(0);
    } else {
      const newArray = prevValues.filter((item) => item !== e.target.value);
      setSelectedSubCategories(newArray);
      setActiveIndex(undefined);
    }
  };
  const fetchCategories = () => {
    api(baseUrl)
      .get(CATEGORIES)
      .then((res) => {
        if (res.data.success) {
          setCategories(res.data.data);
        }
      })
      .catch((e) => console.log(e));
  };

  const fetchSubcategories = () => {
    api(baseUrl)
      .get(SUBCATEGORIES)
      .then((res) => {
        if (res.data.success) {
          setSubcategories(res.data.data);
        }
      })
      .catch((e) => console.log(e));
  };

  const fetchVendors = () => {
    api(baseUrl)
      .get(VENDORS)
      .then((res) => {
        if (res.data.success) {
          setVendors(res.data.data);
        }
      })
      .catch((e) => console.log(e));
  };

  const fetchBrands = () => {
    api(baseUrl)
      .get(BRANDS)
      .then((res) => {
        if (res.data.success) {
          setBrands(res.data.data);
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (searchText && "" !== searchText) {
      fetchProductList(searchText);
      setSearchValue(searchText.replace("%20", " ").replace(/%20| /g, " "));
    }
  }, [searchText]);

  const fetchProductList = (searchText) => {
    let user_id = getCookie("user_id");
    setLoading(true);

    const offset_rows = (page - 1) * limit;

    let text = "";
    if (value.length > 0) {
      text = "&price_from=" + value[0] + "&price_to=" + value[1];
    }

    let category = "";
    if (selectedCategories && selectedCategories.length > 0) {
      const newselectedCategories = selectedCategories.map((item) => {
        return item.replace(/ & /g, "_and_").replace(/&/g, "and");
      });

      category = newselectedCategories.join("|");
    }

    let subcategory = "";
    if (selectedSubCategories && selectedSubCategories.length > 0) {
      const newselectedSubCategories = selectedSubCategories.map((item) => {
        return item.replace(/ & /g, "_and_").replace(/&/g, "and");
      });

      subcategory = newselectedSubCategories.join("|");
    }

    let vendor = "";
    if (selectedVendors && selectedVendors.length > 0) {
      vendor = selectedVendors.join(",");
    }

    let brands = "";
    if (selectedBrands && selectedBrands.length > 0) {
      brands = selectedBrands.join(",");
    }
    // const textTemp =
    //   searchValue && "" !== searchValue ? searchValue : searchText;
    if (!user_id) {
      user_id = "";
    }
    api(baseUrl)
      .get(
        SEARCH +
          "?search_text=" +
          searchText +
          "&offset_rows=" +
          offset_rows +
          "&page_size=" +
          limit +
          "&order_by=" +
          OrderBy +
          "&sort=" +
          sort +
          text +
          "&category=" +
          category +
          "&vendor=" +
          vendor +
          "&exclude_accessory=" +
          exclude_accessory +
          "&only_discounted=" +
          only_discounted +
          "&available_only=" +
          available_only +
          "&sub_category=" +
          subcategory +
          "&brand=" +
          brands +
          "&user_id=" +
          user_id
      )
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          setProductList(res.data.data);
          setBrands(res.data.brand);
          setSubcategories(res.data.sub_category);
          setVendors(res.data.vendor);
          setTotalCount(res.data.totalCount);
          // setMinPrice(res.data.min_price);
          // setMaxPrice(res.data.man_price);
        }
      })
      .catch((e) => console.log(e));
  };

  const handleLink = (link) => {
    window.open(link, "_blank");
  };

  const handleChange = (e) => {
    setPage(1);
    setLimit(20);
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value.trim().length > 2) {
      setPage(1);
      setLimit(20);
      const offset_rows = 0;
      // setAvailableOnly(0);
      // setOnlyDiscounted(0);
      // setExcludeAccessory(0);
      // setSelectedCategories([]);
      // setSelectedSubCategories([]);
      // setSelectedVendors([]);

      let text = "";
      if (value.length > 0) {
        text = "&price_from=" + value[0] + "&price_to=" + value[1];
      }

      let categoryText = "";
      if (selectedCategories && selectedCategories.length > 0) {
        const newselectedCategories = selectedCategories.map((item) => {
          return item.replace(/ & /g, "_and_").replace(/&/g, "and");
        });

        let category = newselectedCategories.join("|");

        categoryText = "&category=" + category;
      }

      let subcategoryText = "";
      if (selectedSubCategories && selectedSubCategories.length > 0) {
        const newselectedSubCategories = selectedSubCategories.map((item) => {
          return item.replace(/ & /g, "_and_").replace(/&/g, "and");
        });

        const subcategory = newselectedSubCategories.join("|");
        subcategoryText = "&sub_category=" + subcategory;
      }

      let vendorText = "";
      if (selectedVendors && selectedVendors.length > 0) {
        const vendor = selectedVendors.join(",");
        vendorText = "&vendor=" + vendor;
      }

      let brandText = "";
      if (selectedBrands && selectedBrands.length > 0) {
        const brands = selectedBrands.join(",");

        brandText = "&brand=" + brands;
      }
      let url = `?query=${e.target.value}&page=1&page_size=${limit}${text}${categoryText}${vendorText}${subcategoryText}${brandText}`;

      if (exclude_accessory) {
        url = url + "&exclude_accessory=" + exclude_accessory;
      }

      if (only_discounted) {
        url = url + "&only_discounted=" + only_discounted;
      }

      if (available_only) {
        url = url + "&available_only=" + available_only;
      }

      history.push({
        pathname: `${routes.SEARCH_ROUTE}`,
        search: `${url}`,
      });
    }
  };

  const handlePageClick = (currentpage) => {
    let user_id = getCookie("user_id");
    window.scroll(0, 0);

    setPage(currentpage.selected + 1);
    const currentPageSelected = currentpage.selected + 1;
    const offset_rows = (currentPageSelected - 1) * limit;

    setLoading(true);
    let text = "";
    if (value.length > 0) {
      text = "&price_from=" + value[0] + "&price_to=" + value[1];
    }

    let category = "";
    if (selectedCategories && selectedCategories.length > 0) {
      const newselectedCategories = selectedCategories.map((item) => {
        return item.replace(/ & /g, "_and_").replace(/&/g, "and");
      });

      category = newselectedCategories.join("|");
    }

    let subcategory = "";
    if (selectedSubCategories && selectedSubCategories.length > 0) {
      const newselectedSubCategories = selectedSubCategories.map((item) => {
        return item.replace(/ & /g, "_and_").replace(/&/g, "and");
      });

      subcategory = newselectedSubCategories.join("|");
    }

    let vendor = "";
    if (selectedVendors && selectedVendors.length > 0) {
      vendor = selectedVendors.join(",");
    }

    let brands = "";
    if (selectedBrands && selectedBrands.length > 0) {
      brands = selectedBrands.join(",");
    }

    if (!user_id) {
      user_id = "";
    }

    const textTemp =
      searchValue && "" !== searchValue ? searchValue : searchText;

    let categoryText = "";
    if (selectedCategories && selectedCategories.length > 0) {
      const newselectedCategories = selectedCategories.map((item) => {
        return item.replace(/ & /g, "_and_").replace(/&/g, "and");
      });

      let category = newselectedCategories.join("|");

      categoryText = "&category=" + category;
    }

    let subcategoryText = "";
    if (selectedSubCategories && selectedSubCategories.length > 0) {
      const newselectedSubCategories = selectedSubCategories.map((item) => {
        return item.replace(/ & /g, "_and_").replace(/&/g, "and");
      });

      const subcategory = newselectedSubCategories.join("|");
      subcategoryText = "&sub_category=" + subcategory;
    }

    let vendorText = "";
    if (selectedVendors && selectedVendors.length > 0) {
      const vendor = selectedVendors.join(",");
      vendorText = "&vendor=" + vendor;
    }

    let brandText = "";
    if (selectedBrands && selectedBrands.length > 0) {
      const brands = selectedBrands.join(",");

      brandText = "&brand=" + brands;
    }
    let url = `?query=${textTemp}&page=${currentPageSelected}&page_size=${limit}${text}${categoryText}${vendorText}${subcategoryText}${brandText}`;

    if (exclude_accessory) {
      url = url + "&exclude_accessory=" + exclude_accessory;
    }

    if (only_discounted) {
      url = url + "&only_discounted=" + only_discounted;
    }

    if (available_only) {
      url = url + "&available_only=" + available_only;
    }

    api(baseUrl)
      .get(
        SEARCH +
          "?search_text=" +
          textTemp +
          "&offset_rows=" +
          offset_rows +
          "&page_size=" +
          limit +
          "&order_by=" +
          OrderBy +
          "&sort=" +
          sort +
          text +
          "&category=" +
          category +
          "&vendor=" +
          vendor +
          "&exclude_accessory=" +
          exclude_accessory +
          "&only_discounted=" +
          only_discounted +
          "&available_only=" +
          available_only +
          "&sub_category=" +
          subcategory +
          "&brand=" +
          brands +
          "&user_id=" +
          user_id
      )
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          setProductList(res.data.data);
          setBrands(res.data.brand);
          setSubcategories(res.data.sub_category);
          setVendors(res.data.vendor);
          setTotalCount(res.data.totalCount);
          // setMinPrice(res.data.min_price);
          // setMaxPrice(res.data.man_price);
        }
      })
      .catch((e) => console.log(e));
    history.replace({
      pathname: history.location.pathname,
      search: url,
    });
  };

  const handleRemoveCategory = (item) => {
    const prevValues = [...selectedCategories];

    const newArray = prevValues.filter((itemIn) => itemIn !== item);
    setSelectedCategories(newArray);
  };

  const handleRemoveSubCategory = (item) => {
    const prevValues = [...selectedSubCategories];

    const newArray = prevValues.filter((itemIn) => itemIn !== item);
    setSelectedSubCategories(newArray);
  };

  const handleSort = (value, sort, titleValue) => {
    setOrderBy(value);
    setSort(sort);
    setTitle(titleValue);
    setPage(1);
  };

  const handleSlider = (value, index) => {
    setValue(value);
    setPage(1);
    setLimit(20);
  };

  const handleAddToFavourites = (item) => {
    if (!token) {
      setIsShowPopup(true);
    } else {
      const user_id = getCookie("user_id");
      const data = {
        Country_ID: 1,
        User_ID: user_id,
        Vendor: item.Vendor,
        Item_Key: item.Item_Key,
        Price: item.Selling_Price,
        Item_name: item.Item_name,
        Item_Image_URL: item.Item_Image_URL,
        Item_URL: item.Item_URL,
      };

      const headers = {
        Authorization: "bearer " + token,
      };

      api(baseUrl, headers)
        .post(ADD_FAVOURITES, data)
        .then((res) => {
          if (res.data.success) {
            let prevProductList = [...productList];

            prevProductList = prevProductList.map((itemIn) => {
              if (
                itemIn.Vendor == item.Vendor &&
                itemIn.Item_Key == item.Item_Key
              ) {
                itemIn.is_a_Favorite = "1";
              }
              return itemIn;
            });
            setProductList(prevProductList);
          } else if ("Unauthorized." == res.data) {
            deleteCookie("user_id");
            deleteCookie("email");
            deleteCookie("token");
            history.push({ pathname: routes.LOGIN });
          }
        })
        .catch((e) => console.log(e));
    }
  };

  const handleRemoveFavourites = (item) => {
    const COUNTRY_ID = 1;
    const user_id = getCookie("user_id");
    const headers = {
      Authorization: "bearer " + token,
    };

    const data = {
      Country_ID: COUNTRY_ID,
      User_ID: user_id,
      Vendor: item.Vendor,
      Item_Key: item.Item_Key,
    };

    api(baseUrl, headers)
      .post(REMOVE_FAVOURITES, data)
      .then((res) => {
        if (res.data.success) {
          const prevProductList = [...productList];

          prevProductList.map((itemIn) => {
            if (
              itemIn.Vendor == item.Vendor &&
              itemIn.Item_Key == item.Item_Key
            ) {
              itemIn.is_a_Favorite = "0";
            }
            return itemIn;
          });
          setProductList(prevProductList);
        }
      })
      .catch((e) => console.log(e));
  };

  const handleExcludeAccessory = (e) => {
    setPage(1);
    if (e.target.checked) {
      setExcludeAccessory(1);
    } else {
      setExcludeAccessory(0);
    }
  };

  const handleOnlyDiscounted = (e) => {
    setPage(1);
    if (e.target.checked) {
      setOnlyDiscounted(1);
    } else {
      setOnlyDiscounted(0);
    }
  };

  const handleOnlyAvailable = (e) => {
    setPage(1);
    if (e.target.checked) {
      setAvailableOnly(1);
    } else {
      setAvailableOnly(0);
    }
  };

  const handleReset = () => {
    setPage(1);
    setAvailableOnly(0);
    setOnlyDiscounted(0);
    setExcludeAccessory(0);
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setSelectedVendors([]);
    setSearchValue("");
    setActiveCategory([]);
    setIsActiveCategory(false);
    history.push({
      pathname: `${routes.SEARCH_ROUTE}`,
      // search: `?query=`,
    });
  };

  const handleProductDetail = (item) => {
    history.push({
      pathname: routes.PRODUCTDETAIL,
      search: "?Vendor=" + item.Vendor + "&Item_Key=" + item.Item_Key,
      state: {
        Vendor: item.Vendor,
        ItemKey: item.Item_Key,
      },
    });
  };

  const handleSearch = (e) => {
    setPage(1);
    const offset_rows = 0;
    // setAvailableOnly(0);
    // setOnlyDiscounted(0);
    // setExcludeAccessory(0);
    // setSelectedCategories([]);
    // setSelectedSubCategories([]);
    // setSelectedVendors([]);

    let text = "";
    if (value.length > 0) {
      text = "&price_from=" + value[0] + "&price_to=" + value[1];
    }

    let categoryText = "";
    if (selectedCategories && selectedCategories.length > 0) {
      const newselectedCategories = selectedCategories.map((item) => {
        return item.replace(/ & /g, "_and_").replace(/&/g, "and");
      });

      let category = newselectedCategories.join("|");

      categoryText = "&category=" + category;
    }

    let subcategoryText = "";
    if (selectedSubCategories && selectedSubCategories.length > 0) {
      const newselectedSubCategories = selectedSubCategories.map((item) => {
        return item.replace(/ & /g, "_and_").replace(/&/g, "and");
      });

      const subcategory = newselectedSubCategories.join("|");
      subcategoryText = "&sub_category=" + subcategory;
    }

    let vendorText = "";
    if (selectedVendors && selectedVendors.length > 0) {
      const vendor = selectedVendors.join(",");
      vendorText = "&vendor=" + vendor;
    }

    let brandText = "";
    if (selectedBrands && selectedBrands.length > 0) {
      const brands = selectedBrands.join(",");

      brandText = "&brand=" + brands;
    }
    let url = `?query=${searchValue}&page=1&page_size=${limit}${text}${categoryText}${vendorText}${subcategoryText}${brandText}`;

    if (exclude_accessory) {
      url = url + "&exclude_accessory=" + exclude_accessory;
    }

    if (only_discounted) {
      url = url + "&only_discounted=" + only_discounted;
    }

    if (available_only) {
      url = url + "&available_only=" + available_only;
    }

    history.push({
      pathname: `${routes.SEARCH_ROUTE}`,
      search: `${url}`,
    });
  };

  console.log(activeCategory);
  return (
    <main className="search-page test">
      <div className="search-wrap">
        <section id="search-bar" className="mt-4 px-0 ">
          <Container>
            <Row>
              <div className="col-sm-2"></div>
              <div className="col-sm-8">
                <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                  <Form.Control
                    type="Search product here"
                    placeholder="Search product here"
                    className=""
                    aria-label="Search product here"
                    value={searchValue}
                    onChange={(e) => handleChange(e)}
                    onKeyDown={(e) => handleKeyDown(e)}
                  />
                  <Button
                    onClick={handleSearch}
                    disabled={searchValue && "" !== searchValue ? false : true}
                    type="button"
                  >
                    <img src={images.SearchBack} alt="searchBack" />
                  </Button>
                </Form>
              </div>
              <div className="col-sm-2"></div>
            </Row>
          </Container>
        </section>
      </div>
      <Container>
        {loading && <CommunityLoaderCircularDash isbackground={false} />}

        <section className="pb-5">
          <Row>
            <div className="col-sm-2 mb-3 for-desktop">
              <button
                className="btn-simple btn-show-filter"
                type="button"
                onClick={() => setIsShowFilter(!isShowFilter)}
              >
                {isShowFilter ? "Hide Filter" : "Show Filter"}
              </button>
            </div>
            <div className="col-sm-10">
              <div className="col-sm-12 mb-sm-4 mb-0 search-title-wrapper 1">
                <Row>
                  <div className="col-sm-6">
                    {searchValue == "" &&
                    searchText == "" &&
                    selectedBrands.length == 0 &&
                    selectedCategories.length == 0 &&
                    selectedSubCategories.length == 0 &&
                    selectedVendors.length == 0 &&
                    exclude_accessory == 0 &&
                    available_only == 0 &&
                    only_discounted == 0 ? (
                      ""
                    ) : (
                      <h5>
                        {totalCount}{" "}
                        {totalCount == 0 || totalCount == 1
                          ? "Product"
                          : "Products"}{" "}
                        found
                      </h5>
                    )}
                  </div>

                  <div className="col-sm-6 cat-for-desktop">
                    <section className=" d-flex justify-content-end">
                      <button
                        className="btn btn-custom"
                        type="button"
                        onClick={handleReset}
                      >
                        Reset
                      </button>
                      <Dropdown className="mx-2 d-flex justify-content-end">
                        <Dropdown.Toggle variant="success" id="dropdown-sort">
                          <i class="fa fa-exchange" aria-hidden="true"></i>{" "}
                          {title ? title : "Sort by"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => {
                              handleSort(
                                "Discounted_Price",
                                "asc",
                                "Price Low to High"
                              );
                            }}
                          >
                            Price Low to High
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              handleSort(
                                "Discounted_Price",
                                "desc",
                                "Price High to Low"
                              );
                            }}
                          >
                            Price High to Low
                          </Dropdown.Item>
                          {/* <Dropdown.Item
                            onClick={() => {
                              handleSort(
                                "Discount_Percent",
                                "asc",
                                "Discount Low to High"
                              );
                            }}
                          >
                            Discount % Low to High
                          </Dropdown.Item> */}
                          <Dropdown.Item
                            onClick={() => {
                              handleSort(
                                "Discount_Percent",
                                "desc",
                                "Discount High to Low"
                              );
                            }}
                          >
                            Discount % High to Low
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              handleSort("Category", "asc", "Category Asc");
                            }}
                          >
                            Category Asc
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              handleSort("Category", "desc", "Category Desc");
                            }}
                          >
                            Category Desc
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              handleSort("item_name", "asc", "Title Asc");
                            }}
                          >
                            Title Asc
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              handleSort("item_name", "desc", "Title Desc");
                            }}
                          >
                            Title Desc
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              handleSort("Brand", "asc", "Brand Asc");
                            }}
                          >
                            Brand Asc
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              handleSort("Brand", "desc", "Brand Desc");
                            }}
                          >
                            Brand Desc
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </section>
                  </div>
                </Row>
              </div>
            </div>
          </Row>

          <Row>
            <div
              className="col-sm-3 cat-left "
              style={{ display: isShowFilter ? "block" : "None" }}
            >
              <section className="cat-for-desktop">
                <div className="mt-4 vendors-filter">
                  <div className="accordion">
                    <div className="accordion-item">
                      <div className="accordion-title one">
                        <h6>Category</h6>
                        <div
                          className="main-cat-icon"
                          onClick={() => {
                            setIsActiveCategory(!isActiveCategory);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          {/* {isActiveCategory ? "-" : "+"} */}
                          {isActiveCategory ? (
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                          ) : (
                            <i class="fa fa-angle-up" aria-hidden="true"></i>
                          )}
                        </div>
                      </div>
                      <div className="accordion-content three">
                        {isActiveCategory &&
                        actualSubcategories &&
                        actualSubcategories.length > 0
                          ? actualSubcategories.map((item, index) => {
                              return (
                                <>
                                  <div className="accordion">
                                    <div className="accordion-item">
                                      <div className="accordion-title">
                                        <div>
                                          <Form.Check
                                            type="checkbox"
                                            id={index}
                                            label={actualCategories[index]}
                                            value={actualCategories[index]}
                                            onChange={handleCategories}
                                            checked={selectedCategories.includes(
                                              actualCategories[index]
                                            )}
                                          />
                                        </div>
                                        <div
                                          onClick={() => {
                                            console.log(isActiveSubCategory);
                                            setActiveIndex(index);
                                            setIsActiveSubcategory(
                                              !isActiveSubCategory
                                            );
                                          }}
                                          style={{ cursor: "pointer" }}
                                          className="cat-icon"
                                        >
                                          {activeCategory.includes(index) ? (
                                            <span
                                              onClick={() => {
                                                let prevCate = [
                                                  ...activeCategory,
                                                ];

                                                prevCate = prevCate.filter(
                                                  (t) => t !== index
                                                );

                                                setActiveCategory(prevCate);
                                              }}
                                            >
                                              -
                                            </span>
                                          ) : (
                                            <span
                                              onClick={() => {
                                                let prevCate = [
                                                  ...activeCategory,
                                                ];

                                                prevCate.push(index);

                                                setActiveCategory(prevCate);
                                              }}
                                            >
                                              +
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                      <div className="accordion-content">
                                        {activeCategory.includes(index)
                                          ? item.map((innerItem, idx) => {
                                              return (
                                                <Form.Check
                                                  type="checkbox"
                                                  id={idx}
                                                  label={innerItem}
                                                  value={innerItem}
                                                  onChange={(e) =>
                                                    handleSubcategories(
                                                      e,
                                                      index
                                                    )
                                                  }
                                                  checked={selectedSubCategories.includes(
                                                    innerItem
                                                  )}
                                                />
                                              );
                                            })
                                          : ""}
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            })
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
                {/* {actualSubcategories && actualSubcategories.length > 0 ? (
                  <Accordion>
                    <Accordion.Item
                      eventKey="0"
                      defaultActiveKey={expandedItem}
                    >
                      <Accordion.Header>Category</Accordion.Header>
                      <Accordion.Body>
                        <Accordion>
                          {actualSubcategories.map((item, index) => {
                            return (
                              <Accordion.Item
                                eventKey={index}
                                defaultActiveKey={expandedItemInner}
                                // onClick={(e) => e.preventDefault()}
                              >
                                <Accordion.Header>
                                  <Form.Check
                                    type="checkbox"
                                    id={index}
                                    label={actualCategories[index]}
                                    value={actualCategories[index]}
                                    onChange={handleCategories}
                                    checked={selectedCategories.includes(
                                      actualCategories[index]
                                    )}
                                  />
                                </Accordion.Header>
                                <Accordion.Body>
                                  <ul>
                                    {item.map((innerItem, idx) => {
                                      return (
                                        <li>
                                          <Form.Check
                                            type="checkbox"
                                            id={idx}
                                            label={innerItem}
                                            value={innerItem}
                                            onChange={(e) =>
                                              handleSubcategories(e, index)
                                            }
                                            checked={selectedSubCategories.includes(
                                              innerItem
                                            )}
                                          />
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </Accordion.Body>
                              </Accordion.Item>
                            );
                          })}
                        </Accordion>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                ) : (
                  ""
                )} */}

                <div className="price-range-slider mt-4">
                  <h6>Price</h6>

                  <ReactSlider
                    className="horizontal-slider"
                    thumbClassName="thumb"
                    trackClassName="track"
                    defaultValue={[minPrice, maxPrice]}
                    ariaLabel={["Lower thumb", "Upper thumb"]}
                    ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                    renderThumb={(props, state) => (
                      <div {...props}>{state.valueNow}</div>
                    )}
                    min={Math.floor(minPrice)}
                    max={Math.floor(maxPrice)}
                    // pearling
                    // minDistance={10}
                    onChange={handleSlider}
                  />
                </div>
                <div className="mt-4 vendors-filter">
                  <div className="accordion">
                    <div className="accordion-item">
                      <div className="accordion-title">
                        <h6>Vendors</h6>
                        <div
                          onClick={() => setIsActive(!isActive)}
                          style={{ cursor: "pointer" }}
                        >
                          {/* {isActive ? "-" : "+"} */}
                          {isActive ? (
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                          ) : (
                            <i class="fa fa-angle-up" aria-hidden="true"></i>
                          )}
                        </div>
                      </div>
                      <div className="accordion-content">
                        {isActive && vendors && vendors.length > 0
                          ? vendors.map((item, index) => {
                              return (
                                <Form.Check
                                  type="checkbox"
                                  id={index}
                                  label={item.Name}
                                  value={item.Name}
                                  onChange={handleVendor}
                                  checked={selectedVendors.includes(item.Name)}
                                />
                              );
                            })
                          : ""}
                      </div>
                    </div>
                  </div>
                  {/* <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Vendors</Accordion.Header>
                    <Accordion.Body>
                      {vendors && vendors.length > 0
                        ? vendors.map((item, index) => {
                            return (
                              <Form.Check
                                type="checkbox"
                                id={index}
                                label={item.Name}
                                value={item.Name}
                                onChange={handleVendor}
                                checked={selectedVendors.includes(item.Name)}
                              />
                            );
                          })
                        : ""}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion> */}
                </div>
                <div className="mt-4 vendors-filter">
                  <div className="accordion">
                    <div className="accordion-item">
                      <div className="accordion-title">
                        <h6>Brands</h6>
                        <div
                          onClick={() => setIsActiveBrand(!isActiveBrand)}
                          style={{ cursor: "pointer" }}
                        >
                          {/* {isActiveBrand ? "-" : "+"} */}
                          {isActiveBrand ? (
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                          ) : (
                            <i class="fa fa-angle-up" aria-hidden="true"></i>
                          )}
                        </div>
                      </div>
                      <div className="accordion-content">
                        {isActiveBrand && brands && brands.length > 0
                          ? brands.map((item, index) => {
                              return (
                                <Form.Check
                                  type="checkbox"
                                  id={index}
                                  label={item.Name}
                                  value={item.Name}
                                  onChange={handleBrand}
                                  checked={selectedBrands.includes(item.Name)}
                                />
                              );
                            })
                          : ""}
                      </div>
                    </div>
                  </div>
                  {/* <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Brands</Accordion.Header>
                    <Accordion.Body>
                      {brands && brands.length > 0
                        ? brands.map((item, index) => {
                            return (
                              <Form.Check
                                type="checkbox"
                                id={index}
                                label={item.Name}
                                value={item.Name}
                                onChange={handleBrand}
                                checked={selectedBrands.includes(item.Name)}
                              />
                            );
                          })
                        : ""}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion> */}
                </div>
                <div className="mt-4 filter-layout">
                  <div className="mt-0">
                    <div>
                      <Form.Check
                        type="checkbox"
                        id="exclude_accessory"
                        label="Exclude Accessory"
                        value={exclude_accessory}
                        onChange={handleExcludeAccessory}
                        checked={exclude_accessory}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div>
                      <Form.Check
                        type="checkbox"
                        id="only_discounted"
                        label="Only Discounted"
                        value={only_discounted}
                        onChange={handleOnlyDiscounted}
                        checked={only_discounted}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div>
                      <Form.Check
                        type="checkbox"
                        id="available_only"
                        label="Available Only"
                        value={available_only}
                        onChange={handleOnlyAvailable}
                        checked={available_only}
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div
              className={
                isShowFilter ? "col-sm-9 cat-right" : "col-sm-12 cat-right"
              }
            >
              <Row>
                <div className="col-sm-12 mb-4  search-title-wrapper cat-for-mobile">
                  <Row>
                    {/* <div className="col-sm-8">
                      {searchValue == "" &&
                      searchText == "" &&
                      selectedBrands.length == 0 &&
                      selectedCategories.length == 0 &&
                      selectedSubCategories.length == 0 &&
                      selectedVendors.length == 0 &&
                      exclude_accessory == 0 &&
                      available_only == 0 &&
                      only_discounted == 0 ? (
                        ""
                      ) : (
                        <h5>
                          {totalCount}{" "}
                          {totalCount == 0 || totalCount == 1
                            ? "Product"
                            : "Products"}{" "}
                          found
                        </h5>
                      )}
                    </div> */}

                    <div className="col-sm-4 d-flex justify-content-end ">
                      <button
                        className="btn-simple btn-show-filter"
                        onClick={handleShowFilter}
                      >
                        Filter
                      </button>
                      <Modal
                        show={isShowMobFilter}
                        onHide={handleCloseFilter}
                        className="mob-filter-popup"
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Filter </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Show filter category</Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="secondary"
                            onClick={handleCloseFilter}
                          >
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                      <button
                        className="btn btn-custom"
                        type="button"
                        onClick={handleReset}
                      >
                        Reset
                      </button>
                      <Dropdown className="mx-2 d-flex justify-content-end">
                        <Dropdown.Toggle variant="success" id="dropdown-sort">
                          <i class="fa fa-exchange" aria-hidden="true"></i>{" "}
                          {title ? title : "Sort by"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => {
                              handleSort(
                                "Discounted_Price",
                                "asc",
                                "Price Low to High"
                              );
                            }}
                          >
                            Price Low to High
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              handleSort(
                                "Discounted_Price",
                                "desc",
                                "Price High to Low"
                              );
                            }}
                          >
                            Price High to Low
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              handleSort(
                                "Discount_Percent",
                                "desc",
                                "Discount High to Low"
                              );
                            }}
                          >
                            Discount % High to Low
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              handleSort("Category", "asc", "Category Asc");
                            }}
                          >
                            Category Asc
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              handleSort("Category", "desc", "Category Desc");
                            }}
                          >
                            Category Desc
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              handleSort("item_name", "asc", "Title Asc");
                            }}
                          >
                            Title Asc
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              handleSort("item_name", "desc", "Title Desc");
                            }}
                          >
                            Title Desc
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              handleSort("Brand", "asc", "Brand Asc");
                            }}
                          >
                            Brand Asc
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              handleSort("Brand", "desc", "Brand Desc");
                            }}
                          >
                            Brand Desc
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </Row>{" "}
                </div>
              </Row>
              <Row>
                <div className="col-sm-12 mb-4 mt-sm-0 mt-4 category-tags">
                  {selectedCategories && selectedCategories.length > 0
                    ? selectedCategories.map((item) => {
                        return (
                          <span className="badge badge-primary">
                            {item}
                            <button
                              type="button"
                              className="close"
                              aria-label="Dismiss"
                              onClick={() => {
                                handleRemoveCategory(item);
                              }}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </span>
                        );
                      })
                    : ""}
                  {selectedSubCategories && selectedSubCategories.length > 0
                    ? selectedSubCategories.map((item) => {
                        return (
                          <span className="badge badge-primary">
                            {item}
                            <button
                              type="button"
                              className="close"
                              aria-label="Dismiss"
                              onClick={() => {
                                handleRemoveSubCategory(item);
                              }}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </span>
                        );
                      })
                    : ""}
                  {/* 
                  <span className="badge badge-primary">
                    Category
                    <button type="button" className="close" aria-label="Dismiss">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </span>
                  <span className="badge badge-primary">
                    Category
                    <button type="button" className="close" aria-label="Dismiss">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </span> */}
                </div>
              </Row>
              {productList && productList.length > 0 ? (
                <section className="cat-products item-design">
                  <Row>
                    {productList &&
                      productList.map((item, index) => {
                        let vendorName = item.Vendor.replace(
                          " ",
                          "-"
                        ).toLowerCase();
                        return (
                          <div
                            className="col-6 col-sm-3 mb-4"
                            style={{
                              cursor: "pointer",
                            }}
                            key={"result" + index}
                          >
                            <div className="item">
                              <div className="main-item-wrap">
                                <div className="img-wrap">
                                  {item.Discount_Percent > 0 ? (
                                    <div className="offer-tag">
                                      {item.Discount_Percent > 0
                                        ? Math.floor(item.Discount_Percent)
                                        : 0}
                                      % OFF
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  <div
                                    className="heart-icon"
                                    onClick={() =>
                                      item.hasOwnProperty("is_a_Favorite") &&
                                      item.is_a_Favorite !== "0"
                                        ? handleRemoveFavourites(item)
                                        : handleAddToFavourites(item)
                                    }
                                  >
                                    {item.hasOwnProperty("is_a_Favorite") &&
                                    item.is_a_Favorite !== "0" ? (
                                      <i
                                        class="fa fa-heart"
                                        aria-hidden="true"
                                      ></i>
                                    ) : (
                                      <i
                                        class="fa fa-heart-o"
                                        aria-hidden="true"
                                      ></i>
                                    )}
                                  </div>
                                  <img
                                    src={item.Item_Image_URL}
                                    alt="img"
                                    className="img-fluid"
                                    onClick={() => handleProductDetail(item)}
                                    // onClick={() => handleLink(item.Item_URL)}
                                  />
                                </div>
                                <div
                                  className="item-desc"
                                  onClick={() => handleProductDetail(item)}
                                >
                                  <img
                                    src={
                                      item.Vendor
                                        ? images[vendorName]
                                        : "./dist/assets/images/default-logo-sm.png"
                                    }
                                    alt="img"
                                  />
                                  <h5
                                  // onClick={() => handleLink(item.Item_URL)}
                                  >
                                    {item.Brand}
                                  </h5>
                                  <p
                                  // onClick={() => handleLink(item.Item_URL)}
                                  >
                                    {item.Item_name}
                                  </p>
                                </div>
                                <div
                                  className="price"
                                  onClick={() => handleProductDetail(item)}
                                >
                                  <span>KD {item.Selling_Price} </span>
                                  {item.Discount_Percent > 0 ? (
                                    <small>
                                      <strike>{item.Regular_Price}</strike>
                                    </small>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </Row>
                  <Row className="">
                    <Col md={9} xs={12} className="pagination">
                      <Pagination
                        totalCount={totalCount}
                        limitValue={limit}
                        currentPage={page}
                        handlePageClick={handlePageClick}
                      />
                    </Col>
                    <Col>
                      {totalCount > 20 ? (
                        <Dropdown className="mx-2 d-flex justify-content-end page-size">
                          <span className="text">Page Size</span>
                          <Dropdown.Toggle variant="success" id="dropdown-sort">
                            {limit}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setLimit(20)}>
                              20
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setLimit(30)}>
                              30
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setLimit(40)}>
                              40
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setLimit(50)}>
                              50
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setLimit(100)}>
                              100
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      ) : (
                        ""
                      )}
                    </Col>
                  </Row>
                </section>
              ) : (
                <p className="loading-msg">
                  Hang tight! Genie is searching high and low to find the best
                  results for you. Sit back, relax, and let us do the work. Your
                  wait will be worth it!
                </p>
              )}
            </div>
          </Row>
        </section>
      </Container>
      <Modal show={isShowPopup} onHide={handleClose} className="postFullscreen">
        <Modal.Header closeButton>
          <Modal.Title>Add to Whishlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            You need to login or sign up to add products to your wishlist.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              history.push({ pathname: routes.LOGIN });
            }}
          >
            Login
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};
export default SearchDetails;
