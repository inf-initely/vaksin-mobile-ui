import * as __SNOWPACK_ENV__ from '../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import {ChakraProvider} from "../_snowpack/pkg/@chakra-ui/react.js";
import React from "../_snowpack/pkg/react.js";
import {Outlet} from "../_snowpack/pkg/react-router.js";
import Theme from "./themes/index.js";
function App({}) {
  return /* @__PURE__ */ React.createElement(ChakraProvider, {
    theme: Theme
  }, /* @__PURE__ */ React.createElement(Outlet, null));
}
export default App;
