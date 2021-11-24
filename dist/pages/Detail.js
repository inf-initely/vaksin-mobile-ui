import * as __SNOWPACK_ENV__ from '../../_snowpack/env.js';

import {LocationCache} from "../cache.js";
import {
  Container,
  Table,
  Td,
  Tr,
  Text,
  Link,
  Tbody,
  Box,
  Heading,
  HStack,
  Icon
} from "../../_snowpack/pkg/@chakra-ui/react.js";
import React from "../../_snowpack/pkg/react.js";
import {useParams} from "../../_snowpack/pkg/react-router.js";
import {
  RiTimeLine,
  RiTimeFill,
  RiMapPinLine,
  RiFileList3Line,
  RiUserAddLine,
  RiTeamLine,
  RiInformationLine,
  RiCalendar2Line,
  RiCalendar2Fill,
  RiTeamFill,
  RiExternalLinkFill
} from "../../_snowpack/pkg/react-icons/ri.js";
import regMethodNormalizer from "../functions/regMethodNormalizer.js";
import GoogleMapEmbed from "../components/GMapEmbed.js";
const TablesBody = [
  [
    "Deskripsi",
    RiFileList3Line,
    (l) => l.description.split("\n").map((v, i) => /* @__PURE__ */ React.createElement(Text, {
      fontSize: "inherit",
      key: i
    }, v))
  ],
  [
    "Alamat",
    RiMapPinLine,
    (l) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Text, {
      fontSize: "inherit"
    }, l.address), /* @__PURE__ */ React.createElement(HStack, {
      mt: 1
    }, /* @__PURE__ */ React.createElement(Icon, {
      as: RiExternalLinkFill,
      color: "gray.500",
      boxSize: 4
    }), /* @__PURE__ */ React.createElement(Text, {
      fontSize: "inherit"
    }, /* @__PURE__ */ React.createElement(GoogleMapEmbed, {
      link: l.map
    }))))
  ],
  [
    "Jam Buka",
    RiTimeLine,
    (l) => /* @__PURE__ */ React.createElement(HStack, null, /* @__PURE__ */ React.createElement(Icon, {
      as: RiTimeFill,
      color: "gray.500",
      boxSize: 4
    }), /* @__PURE__ */ React.createElement(Text, {
      fontSize: "inherit"
    }, l.timestart, " - ", l.timeend))
  ],
  [
    "Registrasi",
    RiUserAddLine,
    (l) => {
      const {display, icon, color} = regMethodNormalizer(l.registration, true);
      return /* @__PURE__ */ React.createElement(HStack, null, /* @__PURE__ */ React.createElement(Icon, {
        as: icon,
        color: "gray.500",
        boxSize: 4
      }), /* @__PURE__ */ React.createElement(Text, {
        fontSize: "inherit"
      }, display));
    }
  ],
  [
    "Rentang Umur",
    RiTeamLine,
    (l) => /* @__PURE__ */ React.createElement(HStack, null, /* @__PURE__ */ React.createElement(Icon, {
      as: RiTeamFill,
      color: "gray.500",
      boxSize: 4
    }), /* @__PURE__ */ React.createElement(Box, null, l.agerange.map((v, i) => /* @__PURE__ */ React.createElement(Text, {
      fontSize: "inherit",
      key: i
    }, v))))
  ],
  [
    "Tautan",
    RiInformationLine,
    (l) => /* @__PURE__ */ React.createElement(HStack, null, /* @__PURE__ */ React.createElement(Icon, {
      as: RiExternalLinkFill,
      color: "gray.500",
      boxSize: 4
    }), /* @__PURE__ */ React.createElement(Text, {
      fontSize: "inherit"
    }, /* @__PURE__ */ React.createElement(Link, {
      href: l.link,
      target: "_blank",
      children: new URL(l.link).hostname,
      variant: "highlight"
    })))
  ],
  [
    "Periode Vaksinasi",
    RiCalendar2Line,
    (l) => /* @__PURE__ */ React.createElement(HStack, null, /* @__PURE__ */ React.createElement(Icon, {
      as: RiCalendar2Fill,
      color: "gray.500",
      boxSize: 4
    }), /* @__PURE__ */ React.createElement(Text, {
      fontSize: "inherit"
    }, l.datestart, " s/d ", l.dateend))
  ]
];
export default function InformationPage() {
  const {locationHash} = useParams();
  const location = LocationCache[locationHash];
  if (location == null) {
    window.location.href = __SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL;
    return /* @__PURE__ */ React.createElement(React.Fragment, null);
  }
  return /* @__PURE__ */ React.createElement(Container, {
    maxW: "container.sm",
    justifyContent: "center",
    alignItems: "center",
    minH: "100vh",
    display: "flex",
    flexDirection: "column",
    px: 4,
    pb: 3
  }, /* @__PURE__ */ React.createElement(Heading, {
    as: "h1",
    size: "sm",
    my: 4,
    color: "green.500"
  }, location.title), /* @__PURE__ */ React.createElement(Box, {
    border: "1px solid",
    borderColor: "gray.300",
    borderRadius: "md"
  }, /* @__PURE__ */ React.createElement(Table, {
    fontSize: "sm"
  }, /* @__PURE__ */ React.createElement(Tbody, null, TablesBody.map((v, i) => /* @__PURE__ */ React.createElement(Tr, {
    key: i,
    borderBottom: "1px solid",
    borderColor: "gray.300",
    sx: {
      "&:last-of-type": {
        borderBottom: "none"
      }
    }
  }, /* @__PURE__ */ React.createElement(Td, {
    display: ["flex", "table-cell"],
    border: "none",
    px: 2,
    pt: 4,
    pb: [0, 4],
    color: "gray.500",
    fontWeight: "medium"
  }, /* @__PURE__ */ React.createElement(HStack, null, /* @__PURE__ */ React.createElement(Text, {
    fontSize: "inherit"
  }, v[0]))), /* @__PURE__ */ React.createElement(Td, {
    display: ["flex", "table-cell"],
    px: 2,
    pb: 4,
    pt: [2, 4],
    border: "none",
    flexDirection: "column"
  }, v[2]?.(location))))))));
}
