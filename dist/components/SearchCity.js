import {
  Box
} from "../../_snowpack/pkg/@chakra-ui/react.js";
import React, {useEffect, useRef, useState} from "../../_snowpack/pkg/react.js";
import SearchInput from "./_SearchInput.js";
import SearchResultList from "./_SearchResultList.js";
import {SessionCache} from "../cache.js";
export default function SearchCity(props) {
  const {regions, onSelectedCity, ...rest} = props;
  const [results, setResults] = useState([]);
  const SearchInputRef = useRef(null);
  useEffect(() => {
    if (SearchInputRef.current == null)
      return;
    if (SessionCache.lastSelectedCity == null)
      return;
    SearchInputRef.current.value = SessionCache.lastSelectedCity.city.replace("Kota ", "").replace("Kab. ", "");
    SearchInputRef.current.focus();
  }, [SearchInputRef]);
  return /* @__PURE__ */ React.createElement(Box, {
    ...rest
  }, /* @__PURE__ */ React.createElement(SearchInput, {
    regions,
    ref: SearchInputRef,
    onSearchResults: setResults
  }), /* @__PURE__ */ React.createElement(SearchResultList, {
    fuseResult: results,
    onClickResult: (result) => onSelectedCity(result.item),
    InputElement: SearchInputRef,
    position: "absolute",
    top: 10,
    pt: 3,
    hidden: true
  }));
}
