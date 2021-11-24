import React, {useState, useEffect} from "../../_snowpack/pkg/react.js";
import {useRegions} from "../functions/useRegions.js";
import {Spinner, Container, VStack, Portal, Box} from "../../_snowpack/pkg/@chakra-ui/react.js";
import SearchCity from "../components/SearchCity.js";
import LocationList from "../components/LocationList.js";
import {SessionCache} from "../cache.js";
export default function MainPage() {
  const queryParams = new URL(window.location.href).searchParams;
  const queryParamCity = {
    city: queryParams.get("city"),
    province: queryParams.get("province")
  };
  if (queryParamCity.city && queryParamCity.province) {
    SessionCache.lastSelectedCity = queryParamCity;
    window.history.replaceState({}, document.title, "/");
  }
  const {regions, start: fetchRegions, _setRegions} = useRegions();
  const [isLoadingRegions, setLoadingRegions] = useState(SessionCache.regions.length === 0);
  const [selectedCity, setSelectedCity] = useState(SessionCache.lastSelectedCity);
  useEffect(() => {
    const cachedRegions = SessionCache.regions;
    if (cachedRegions.length !== 0)
      _setRegions(cachedRegions);
    else
      fetchRegions();
  }, []);
  useEffect(() => {
    if (regions.length === 0)
      return;
    setLoadingRegions(false);
    SessionCache.regions = regions;
  }, [regions]);
  return /* @__PURE__ */ React.createElement(Container, {
    maxW: "container.sm",
    justifyContent: "center",
    alignItems: "center",
    minH: "100vh",
    display: "flex",
    flexDirection: "column",
    px: 0
  }, /* @__PURE__ */ React.createElement(VStack, {
    hidden: isLoadingRegions,
    minH: "100vh",
    width: "100%",
    alignItems: "stretch",
    spacing: 0,
    position: "relative",
    px: 2
  }, /* @__PURE__ */ React.createElement(SearchCity, {
    regions,
    onSelectedCity: (city) => {
      setSelectedCity(city);
      SessionCache.lastSelectedCity = city;
    },
    className: selectedCity ? "" : "middle",
    position: "sticky",
    py: 3,
    bgColor: "rgba(255,255,255,0.4)",
    backdropFilter: "auto",
    backdropBlur: "sm",
    top: 0,
    zIndex: "docked",
    transition: "all 0.2s",
    transitionTimingFunction: "ease-in-out",
    sx: {
      "&.middle": {
        top: "25%",
        transform: "translateY(-50%)"
      },
      "&.middle:focus-within": {
        top: "0",
        transform: "none"
      }
    }
  }), /* @__PURE__ */ React.createElement(LocationList, {
    selectedCity,
    px: 2,
    pb: 3
  })), /* @__PURE__ */ React.createElement(Portal, null, /* @__PURE__ */ React.createElement(Box, {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    hidden: isLoadingRegions === false
  }, /* @__PURE__ */ React.createElement(Spinner, {
    boxSize: 16,
    thickness: "4px",
    emptyColor: "gray.200",
    color: "green.500"
  }))));
}
