import * as __SNOWPACK_ENV__ from '../../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import {Link} from "../../_snowpack/pkg/@chakra-ui/react.js";
import React from "../../_snowpack/pkg/react.js";
export default function GoogleMapEmbed(props) {
  const {link} = props;
  return /* @__PURE__ */ React.createElement(Link, {
    href: link,
    variant: "highlight",
    target: "_blank"
  }, "Buka di Google Maps");
}
