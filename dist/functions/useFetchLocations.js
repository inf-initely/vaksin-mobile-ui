import {useMemo} from "../../_snowpack/pkg/react.js";
import isValidResponse from "./isValidResponse.js";
import isValidLocations from "./isValidLocations.js";
import useFetchJSON from "./useFetchJSON.js";
export default function useFetchLocations(input) {
  const {province, city} = input ?? {};
  const {response, ...rest} = useFetchJSON(input ? `https://api.vaksinasi.id/locations/${province}?city=${city}` : null, {name: "location"});
  const locations = useMemo(() => {
    if (response == null)
      return null;
    if (isValidResponse(response)) {
    } else
      throw new Error("Oops! Looks like there are some error on API side!");
    if (isValidLocations(response.data)) {
    } else
      throw new Error("Data of regions received is different from the schema");
    return response.data;
  }, [response]);
  return {locations, ...rest};
}
