import {useEffect, useState} from "../../_snowpack/pkg/react.js";
import isValidResponse from "./isValidResponse.js";
import isValidRegions from "./isValidRegions.js";
export function useRegions(options) {
  const {instantStart} = Object.assign({}, options, {
    instantStart: false
  });
  const [loading, setLoading] = useState(instantStart);
  const [regions, setRegions] = useState([]);
  function start() {
    fetch("https://api.vaksinasi.id/regions").then((res) => res.json()).then((res) => {
      if (isValidResponse(res)) {
      } else
        throw new Error("Oops! Looks like there are some error on API side!");
      if (isValidRegions(res.data)) {
      } else
        throw new Error("Data of regions received is different from the schema");
      setRegions(res.data);
    });
  }
  useEffect(() => {
    if (instantStart)
      start();
  }, []);
  return {regions, start, loading, _setRegions: setRegions};
}
