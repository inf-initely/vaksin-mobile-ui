import {
  RiCommunityLine,
  RiBuilding4Line,
  RiHome5Line,
  RiInformationLine,
  RiArrowRightCircleLine
} from "../../_snowpack/pkg/react-icons/ri.js";
var RegistrationMethod;
(function(RegistrationMethod2) {
  RegistrationMethod2["ONLINE"] = "Online";
  RegistrationMethod2["OFFLINE"] = "Walk In";
  RegistrationMethod2["BOTH"] = "Online & Walk In";
})(RegistrationMethod || (RegistrationMethod = {}));
function otherMethodNormalizer(str, detailed) {
  if (str.length > 25 && detailed == false)
    return {
      display: "Cek Detail",
      color: "red",
      icon: RiArrowRightCircleLine
    };
  return {
    display: str,
    color: "purple",
    icon: RiInformationLine
  };
}
export default function regMethodNormalizer(str, detailed = false) {
  if (/offline.*online/gi.test(str) || /online.*offline/gi.test(str))
    return {
      display: detailed ? str : RegistrationMethod.BOTH,
      color: "blue",
      icon: RiCommunityLine
    };
  if (/walk.*in/gi.test(str) || /offline/gi.test(str) || /langsung.*datang/gi.test(str) || /datang.*langsung/gi.test(str) || /langsung.*tempat/gi.test(str) || /on.*the.*spot/gi.test(str))
    return {
      display: detailed ? str : RegistrationMethod.OFFLINE,
      color: "green",
      icon: RiBuilding4Line
    };
  if (/online/gi.test(str))
    return {
      display: detailed ? str : RegistrationMethod.ONLINE,
      color: "pink",
      icon: RiHome5Line
    };
  return otherMethodNormalizer(str, detailed);
}
