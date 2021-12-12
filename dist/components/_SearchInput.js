import * as __SNOWPACK_ENV__ from '../../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import {Icon, Input, InputGroup, InputLeftElement} from "../../_snowpack/pkg/@chakra-ui/react.js";
import Fuse from "../../_snowpack/pkg/fusejs.js";
import React, {forwardRef, useEffect, useState} from "../../_snowpack/pkg/react.js";
import {FaSearch} from "../../_snowpack/pkg/react-icons/fa.js";
const SearchInput = forwardRef((props, ref) => {
  const {regions, onSearchResults} = props;
  const [fuse, setFuse] = useState(new Fuse([]));
  useEffect(() => {
    if (regions.length === 0)
      return;
    const cities = regions.map((region) => region.city.map((city) => ({
      city,
      province: region.province
    }))).flat();
    setFuse(new Fuse(cities, {
      keys: ["city"]
    }));
  }, [regions]);
  const [results, setResult] = useState([]);
  function inputHandler(val) {
    setResult(fuse.search(val));
  }
  useEffect(() => {
    onSearchResults(results);
  }, [results]);
  return /* @__PURE__ */ React.createElement(InputGroup, {
    zIndex: "docked"
  }, /* @__PURE__ */ React.createElement(InputLeftElement, null, /* @__PURE__ */ React.createElement(Icon, {
    as: FaSearch,
    color: "green.500"
  })), /* @__PURE__ */ React.createElement(Input, {
    placeholder: "Cari kota/kabupaten disini...",
    ref,
    onInput: (e) => {
      const input = e.target;
      inputHandler(input.value);
    },
    onFocus: (e) => {
      const input = e.target;
      if (input.value !== "")
        inputHandler(input.value);
    },
    bgColor: "white",
    fontSize: "sm",
    boxShadow: "sm"
  }));
});
export default SearchInput;
