import * as __SNOWPACK_ENV__ from '../../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import React, {Fragment} from "../../_snowpack/pkg/react.js";
import LocationBackButton from "../components/pages/Detail/BackButton.js";
import LocationDetail from "../components/pages/Detail/TheDetail.js";
import {valueToApi} from "../functions/regionValueNormalizer.js";
import useFetchLocations from "../functions/useFetchLocations.js";
import {useCityParam, useLocationHashParam} from "../functions/useValidParams.js";
import {useEffect, useMemo} from "../../_snowpack/pkg/react.js";
import {useLocation} from "../../_snowpack/pkg/react-router-dom.js";
import hash from "../../_snowpack/pkg/object-hash.js";
import useSetRootBg from "../functions/useSetRootBg.js";
import {useStoreContext} from "../components/StoreContext.js";
import useSetInitialSearch from "../functions/useSetInitialSearch.js";
export default function LocationPage() {
  const city = useCityParam();
  const {pathname} = useLocation();
  const locationHash = useLocationHashParam();
  const {
    locations: [locations]
  } = useStoreContext();
  const {startFetch, locations: l} = useFetchLocations(city ? valueToApi(city) : null);
  const cache = useMemo(() => {
    if (city == null || locationHash == null || locations == null)
      return null;
    console.log("Attempting to use cache with hash:", locationHash);
    return locations.data.find((l2) => hash(l2) === locationHash);
  }, [city, locationHash]);
  useEffect(() => {
    if (city == null)
      return;
    if (cache == null) {
      console.log("Fetching since cache is empty!");
      startFetch();
    }
  }, [city, cache]);
  const location = useMemo(() => {
    if (cache)
      return cache;
    if (l == null)
      return null;
    return l.find((l2) => hash(l2) === locationHash) ?? null;
  }, [cache, l]);
  useSetRootBg("gray.50");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useSetInitialSearch();
  useEffect(() => {
    console.log(city);
    if (city == null)
      return;
    if (city === false || location == null && cache == null)
      window.location.replace("/404.html");
  }, [city, location]);
  return /* @__PURE__ */ React.createElement(Fragment, null, /* @__PURE__ */ React.createElement(LocationBackButton, {
    py: 3
  }), /* @__PURE__ */ React.createElement(LocationDetail, {
    data: location
  }));
}
