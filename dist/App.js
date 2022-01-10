import * as __SNOWPACK_ENV__ from '../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import React from "../_snowpack/pkg/react.js";
import {ChakraProvider, Flex, Portal} from "../_snowpack/pkg/@chakra-ui/react.js";
import LayoutFooter from "./components/layouts/Footer.js";
import {LoadingProvider} from "./components/LoadingContext.js";
import ProgressBar from "./components/ProgressBar.js";
import {StoreProvider} from "./components/StoreContext.js";
import {useState} from "../_snowpack/pkg/react.js";
import {Outlet} from "../_snowpack/pkg/react-router.js";
import Startup from "./Startup.js";
import Theme from "./themes/index.js";
function App({}) {
  const loading = useState(true);
  const progress = useState({});
  const lastLocationCache = useState(null);
  const detailCache = useState({});
  const lastScroll = useState({});
  const locations = useState(null);
  const searchFuse = useState(null);
  const searchInput = useState(null);
  const locationCache = useState({});
  return /* @__PURE__ */ React.createElement(ChakraProvider, {
    theme: Theme
  }, /* @__PURE__ */ React.createElement(LoadingProvider, {
    value: {loading, progress}
  }, /* @__PURE__ */ React.createElement(StoreProvider, {
    value: {
      lastLocationCache,
      detailCache,
      lastScroll,
      locations,
      searchFuse,
      searchInput,
      locationCache
    }
  }, /* @__PURE__ */ React.createElement(Startup, null, /* @__PURE__ */ React.createElement(Flex, {
    flexDirection: "column",
    minH: "100%",
    spacing: 0,
    pb: 14
  }, /* @__PURE__ */ React.createElement(Outlet, null)), /* @__PURE__ */ React.createElement(LayoutFooter, null), /* @__PURE__ */ React.createElement(Portal, null, /* @__PURE__ */ React.createElement(ProgressBar, null))))));
}
export default App;
