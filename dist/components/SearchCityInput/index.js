import * as __SNOWPACK_ENV__ from '../../../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import React from "../../../_snowpack/pkg/react.js";
import {
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  VStack
} from "../../../_snowpack/pkg/@chakra-ui/react.js";
import {useDataContext} from "../DataContext.js";
import {useLoadingContext} from "../LoadingContext.js";
import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState
} from "../../../_snowpack/pkg/react.js";
import {RiCloseLine, RiSearchLine} from "../../../_snowpack/pkg/react-icons/ri.js";
import CityDropdown from "./Dropdown.js";
import useHasFocusWithin from "../../functions/useHasFocusWithin.js";
import mergeRefs from "../../../_snowpack/pkg/react-merge-refs.js";
import {apiToValue} from "../../functions/regionValueNormalizer.js";
import {useStoreContext} from "../StoreContext.js";
const SearchCityInput = forwardRef((props, ref) => {
  const {onFocusWithin, ...rest} = props;
  const {regions} = useDataContext();
  const {isLoading} = useLoadingContext();
  const {
    searchFuse: [searchFuse],
    searchInput: [searchInput, setSearchInput]
  } = useStoreContext();
  const [dropdownData, setDropdownData] = useState(searchInput?.dropdownData ?? []);
  const search = useCallback((...props2) => {
    if (searchFuse == null)
      return null;
    const result = searchFuse.search(...props2);
    setDropdownData(result.slice(0, 5).map((r) => r.item));
    return result;
  }, [searchFuse]);
  useEffect(() => {
    if (searchInput != null)
      setDropdownData(searchInput.dropdownData);
  }, [searchInput]);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const {hasFocus, setFocus} = useHasFocusWithin(containerRef);
  useEffect(() => {
    if (onFocusWithin)
      onFocusWithin(hasFocus);
  }, [hasFocus]);
  return /* @__PURE__ */ React.createElement(VStack, {
    alignItems: "flex-start",
    spacing: 0.5,
    position: "relative",
    ref: mergeRefs([ref ?? (() => {
    }), containerRef]),
    zIndex: "docked",
    ...rest
  }, /* @__PURE__ */ React.createElement(InputGroup, null, /* @__PURE__ */ React.createElement(InputRightElement, {
    w: 10
  }, /* @__PURE__ */ React.createElement(IconButton, {
    variant: "ghost",
    boxSize: 7,
    minW: "initial",
    icon: /* @__PURE__ */ React.createElement(Icon, {
      as: RiCloseLine,
      boxSize: 5
    }),
    "aria-label": "search-location",
    hidden: hasFocus === false || isLoading,
    onClick: () => {
      if (inputRef.current == null)
        return;
      inputRef.current.value = "";
      search("");
      inputRef.current.focus();
    }
  }), /* @__PURE__ */ React.createElement(IconButton, {
    variant: "ghost",
    boxSize: 7,
    minW: "initial",
    icon: /* @__PURE__ */ React.createElement(Icon, {
      as: RiSearchLine,
      boxSize: 5
    }),
    "aria-label": "search-location",
    hidden: hasFocus || isLoading,
    disabled: true,
    pointerEvents: "none"
  }), /* @__PURE__ */ React.createElement(Spinner, {
    boxSize: 5,
    thickness: "3px",
    color: "gray.300",
    hidden: isLoading === false
  })), /* @__PURE__ */ React.createElement(Input, {
    placeholder: isLoading && regions == null ? `Sedang mengunduh daftar kota...` : `Masukkan kota/kabupaten-mu disini`,
    bgColor: "white",
    shadow: "md",
    pr: 10,
    ref: inputRef,
    defaultValue: searchInput?.inputValue,
    onInput: (e) => {
      search(inputRef.current.value);
    },
    disabled: isLoading
  })), /* @__PURE__ */ React.createElement(CityDropdown, {
    data: dropdownData,
    hidden: dropdownData.length === 0 || hasFocus == false,
    onClickItem: (city, e) => {
      console.log("clicked", city);
      if (inputRef.current == null)
        return;
      const displayValue = apiToValue(city);
      inputRef.current.value = displayValue.city;
      setSearchInput({
        inputValue: displayValue.city,
        dropdownData
      });
      setFocus(false);
      document.body.focus();
    }
  }));
});
export default SearchCityInput;
