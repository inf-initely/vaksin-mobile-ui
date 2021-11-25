import {useState} from "../../_snowpack/pkg/react.js";
import isValidResponse from "./isValidResponse.js";
import isValidLocations from "./isValidLocations.js";
export function useLocations(input) {
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  function start() {
    return new Promise((resolve, reject) => {
      if (input == null)
        return;
      const {province, city} = input;
      setLoading(true);
      fetch(`https://api.vaksinasi.id/locations/${province}?city=${city}`).then((res) => res.json()).then((res) => {
        if (isValidResponse(res)) {
        } else
          throw new Error("Oops! Looks like there are some error on API side!");
        if (isValidLocations(res.data)) {
        } else
          throw new Error("Data of locations received is different from the schema");
        setLocations(res.data);
        setLoading(false);
        resolve(res.data);
      });
    });
  }
  return {locations, start, loading};
}
