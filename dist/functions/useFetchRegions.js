import {useMemo} from "../../_snowpack/pkg/react.js";
import isValidResponse from "./isValidResponse.js";
import isValidRegions from "./isValidRegions.js";
import useFetchJSON from "./useFetchJSON.js";
export function useFetchRegions() {
  const {response, ...rest} = useFetchJSON("https://api.vaksinasi.id/regions", {name: "region"});
  const regions = useMemo(() => {
    if (response == null)
      return null;
    if (isValidResponse(response)) {
    } else
      throw new Error("Oops! Looks like there are some error on API side!");
    if (isValidRegions(response.data)) {
    } else
      throw new Error("Data of regions received is different from the schema");
    return response.data;
  }, [response]);
  return {regions, ...rest};
}
