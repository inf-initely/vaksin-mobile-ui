import * as s from "../../_snowpack/pkg/superstruct.js";
const regionsStruct = s.array(s.object({
  province: s.string(),
  city: s.array(s.string())
}));
export default function isValidRegions(res) {
  return s.is(res, regionsStruct);
}
