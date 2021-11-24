import * as s from "../../_snowpack/pkg/superstruct.js";
const locationsStruct = s.array(s.object({
  province: s.string(),
  city: s.string(),
  title: s.string(),
  description: s.string(),
  link: s.string(),
  address: s.string(),
  map: s.string(),
  registration: s.string(),
  agerange: s.array(s.string()),
  isfree: s.boolean(),
  datestart: s.string(),
  dateend: s.string(),
  timestart: s.string(),
  timeend: s.string(),
  isvalid: s.boolean(),
  code: s.string(),
  dateadded: s.string()
}));
export default function isValidLocations(res) {
  return s.is(res, locationsStruct);
}
