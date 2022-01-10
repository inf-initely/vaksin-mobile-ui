import * as __SNOWPACK_ENV__ from '../../../../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import React from "../../../../_snowpack/pkg/react.js";
import {Container, Heading, VStack, Text} from "../../../../_snowpack/pkg/@chakra-ui/react.js";
import {useCityParam} from "../../../functions/useValidParams.js";
import DataDisplay from "./DataDisplay.js";
export default function LocationDetail(props) {
  const {data, ...rest} = props;
  const city = useCityParam();
  return /* @__PURE__ */ React.createElement(Container, {
    layerStyle: "constraint-sm"
  }, /* @__PURE__ */ React.createElement(Heading, {
    size: "md",
    as: "h1",
    ml: 5
  }, data?.title), /* @__PURE__ */ React.createElement(Text, {
    ml: 5
  }, city ? `${city.province}, ${city.city}` : null), /* @__PURE__ */ React.createElement(VStack, {
    alignItems: "stretch",
    bgColor: "white",
    boxShadow: "sm",
    borderRadius: "lg",
    my: 5,
    spacing: 0,
    wordBreak: "break-word"
  }, data == null ? null : Object.entries(data)?.map(([key, value]) => /* @__PURE__ */ React.createElement(DataDisplay, {
    key,
    value,
    k: key,
    location: data
  }))));
}
