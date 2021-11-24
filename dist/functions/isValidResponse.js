import * as s from "../../_snowpack/pkg/superstruct.js";
const successfulResponseStruct = s.object({
  data: s.array(s.any()),
  code: s.literal(200),
  message: s.string()
});
export default function isValidResponse(res) {
  return s.is(res, successfulResponseStruct);
}
