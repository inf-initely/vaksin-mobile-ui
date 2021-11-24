import React from "../../_snowpack/pkg/react.js";
import {
  Text,
  Grid,
  VStack,
  Button,
  Icon,
  Badge,
  LinkBox,
  LinkOverlay
} from "../../_snowpack/pkg/@chakra-ui/react.js";
import {Link as RouterLink} from "../../_snowpack/pkg/react-router-dom.js";
import {
  RiInformationLine,
  RiRoadMapLine,
  RiMapPinLine
} from "../../_snowpack/pkg/react-icons/ri.js";
import hash from "../../_snowpack/pkg/object-hash.js";
import regMethodNormalizer from "../functions/regMethodNormalizer.js";
export default function LocationItem(props) {
  const {location, onOpenDetail: onOpenModal, ...rest} = props;
  const {display, icon, color} = regMethodNormalizer(location.registration);
  return /* @__PURE__ */ React.createElement(LinkBox, {
    ...rest,
    bgColor: "white",
    border: "1px solid",
    borderColor: "gray.300",
    borderRadius: "md",
    px: 2,
    py: 2
  }, /* @__PURE__ */ React.createElement(Grid, {
    templateColumns: "auto max-content",
    gridGap: 3
  }, /* @__PURE__ */ React.createElement(VStack, {
    alignItems: "flex-start",
    textAlign: "left"
  }, /* @__PURE__ */ React.createElement(LinkOverlay, {
    as: RouterLink,
    to: `detail/${hash(location)}`,
    href: "#",
    color: "green.600",
    fontWeight: "semibold",
    fontSize: "sm",
    onClick: () => onOpenModal?.(location)
  }, location.title), /* @__PURE__ */ React.createElement(Grid, {
    templateColumns: "max-content auto",
    gridGap: 1,
    color: "gray.500"
  }, /* @__PURE__ */ React.createElement(Icon, {
    as: icon
  }), /* @__PURE__ */ React.createElement(Badge, {
    size: "xs",
    width: "max-content",
    colorScheme: color
  }, display), /* @__PURE__ */ React.createElement(Icon, {
    as: RiMapPinLine
  }), /* @__PURE__ */ React.createElement(Text, {
    fontSize: "xs"
  }, location.address))), /* @__PURE__ */ React.createElement(VStack, {
    alignItems: "stretch"
  }, /* @__PURE__ */ React.createElement(Button, {
    as: "a",
    href: location.link,
    size: "xs",
    leftIcon: /* @__PURE__ */ React.createElement(Icon, {
      as: RiInformationLine,
      transform: "scale(1.3)"
    }),
    target: "_blank",
    colorScheme: "orange",
    variant: "outline"
  }, "Link"), /* @__PURE__ */ React.createElement(Button, {
    as: "a",
    href: location.map,
    size: "xs",
    leftIcon: /* @__PURE__ */ React.createElement(Icon, {
      as: RiRoadMapLine,
      transform: "scale(1.3)"
    }),
    target: "_blank",
    variant: "outline",
    colorScheme: "cyan"
  }, "Map"))));
}
