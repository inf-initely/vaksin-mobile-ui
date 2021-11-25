import {
  Box,
  Spinner,
  VStack,
  Text,
  Portal,
  Icon
} from "../../_snowpack/pkg/@chakra-ui/react.js";
import {useLocations} from "../functions/useLocations.js";
import React, {useEffect} from "../../_snowpack/pkg/react.js";
import LocationItem from "./_LocationItem.js";
import hash from "../../_snowpack/pkg/object-hash.js";
import {LocationCache, SessionCache} from "../cache.js";
import {RiEmotionUnhappyLine} from "../../_snowpack/pkg/react-icons/ri.js";
export default function LocationList(props) {
  const {selectedCity, ...rest} = props;
  const {locations, start, loading} = useLocations(selectedCity);
  useEffect(() => {
    if (selectedCity == null)
      return;
    start().then((_) => {
      window.scrollTo({top: SessionCache.scrollY});
    });
  }, [selectedCity]);
  console.log(locations, selectedCity);
  return /* @__PURE__ */ React.createElement(Box, {
    ...rest
  }, /* @__PURE__ */ React.createElement(VStack, {
    hidden: loading,
    alignItems: "stretch"
  }, locations.map((location, index) => /* @__PURE__ */ React.createElement(LocationItem, {
    location,
    key: index,
    onOpenDetail: (location2) => {
      const locationHash = hash(location2);
      LocationCache[locationHash] = location2;
    }
  }))), /* @__PURE__ */ React.createElement(Portal, null, /* @__PURE__ */ React.createElement(Box, {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    hidden: loading === false
  }, /* @__PURE__ */ React.createElement(Spinner, {
    boxSize: 12,
    thickness: "4px",
    emptyColor: "gray.200",
    color: "green.500"
  })), /* @__PURE__ */ React.createElement(VStack, {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    hidden: locations.length > 0 || selectedCity == null || loading,
    width: "full",
    px: 10
  }, /* @__PURE__ */ React.createElement(Icon, {
    as: RiEmotionUnhappyLine,
    boxSize: 16,
    color: "red.400"
  }), /* @__PURE__ */ React.createElement(Text, {
    textAlign: "center",
    color: "red.400"
  }, "Lokasi Vaksin di ", selectedCity?.city, " tidak ditemukan."))));
}
