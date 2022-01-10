import * as __SNOWPACK_ENV__ from '../../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import React, {Fragment} from "../../_snowpack/pkg/react.js";
import HomeFooter from "../components/pages/Home/Footer.js";
import HomeHero from "../components/pages/Home/Hero.js";
import useSetRootBg from "../functions/useSetRootBg.js";
import {useEffect} from "../../_snowpack/pkg/react.js";
import {useLocation} from "../../_snowpack/pkg/react-router-dom.js";
export default function HomePage() {
  const {pathname} = useLocation();
  useSetRootBg(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return /* @__PURE__ */ React.createElement(Fragment, null, /* @__PURE__ */ React.createElement(HomeHero, null), /* @__PURE__ */ React.createElement(HomeFooter, null));
}
