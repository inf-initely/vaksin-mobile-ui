import * as __SNOWPACK_ENV__ from '../../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import React, {Fragment} from "../../_snowpack/pkg/react.js";
import TheList from "../components/pages/List/TheList.js";
import ListSearchBar from "../components/pages/List/SearchBar.js";
import useFetchLocations from "../functions/useFetchLocations.js";
import {useLocation} from "../../_snowpack/pkg/react-router-dom.js";
import {useEffect} from "../../_snowpack/pkg/react.js";
import {valueToApi} from "../functions/regionValueNormalizer.js";
import {useCityParam} from "../functions/useValidParams.js";
import hash from "../../_snowpack/pkg/object-hash.js";
import useSetRootBg from "../functions/useSetRootBg.js";
import {useStoreContext} from "../components/StoreContext.js";
import useSetInitialSearch from "../functions/useSetInitialSearch.js";
export default function ListPage() {
  const {
    locations: [locationsStore, setLocationsStore]
  } = useStoreContext();
  const {pathname} = useLocation();
  const city = useCityParam();
  const {locations: l, startFetch} = useFetchLocations(city ? valueToApi(city) : null);
  useEffect(() => {
    if (locationsStore == null || locationsStore.pathname !== pathname)
      startFetch();
  }, [pathname, city]);
  useEffect(() => {
    if (l == null)
      return;
    const uniqueMap = Array.from(new Map(l.map((v) => [hash(v), v])).values());
    setLocationsStore({
      data: uniqueMap,
      pathname
    });
  }, [l]);
  useSetRootBg("gray.50");
  useSetInitialSearch();
  useEffect(() => {
    console.log(city);
    if (city == null)
      return;
    if (city === false)
      window.location.replace("/404.html");
  }, [city]);
  return /* @__PURE__ */ React.createElement(Fragment, null, /* @__PURE__ */ React.createElement(ListSearchBar, null), /* @__PURE__ */ React.createElement(TheList, {
    data: locationsStore?.data ?? null
  }));
}
