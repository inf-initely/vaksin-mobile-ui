import * as __SNOWPACK_ENV__ from '../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import React from "../_snowpack/pkg/react.js";
import {DataProvider} from "./components/DataContext.js";
import {useFetchRegions} from "./functions/useFetchRegions.js";
import {useEffect, useMemo} from "../_snowpack/pkg/react.js";
import {useLocation} from "../_snowpack/pkg/react-router-dom.js";
import {useStoreContext} from "./components/StoreContext.js";
import Fuse from "../_snowpack/pkg/fusejs.js";
export default function Startup({children}) {
  const {startFetch, regions} = useFetchRegions();
  const {
    searchFuse: [_, setSearchFuse]
  } = useStoreContext();
  const {pathname} = useLocation();
  useEffect(() => {
    startFetch();
  }, []);
  const cities = useMemo(() => {
    if (regions == null)
      return null;
    return regions.map((region) => region.city.map((city) => ({city, province: region.province}))).flat();
  }, [regions]);
  useEffect(() => {
    if (cities == null)
      return;
    setSearchFuse(new Fuse(cities, {keys: ["city"]}));
  }, [cities]);
  return /* @__PURE__ */ React.createElement(DataProvider, {
    value: {regions}
  }, children);
}
