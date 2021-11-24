import {useState} from "../../_snowpack/pkg/react.js";
export function useFetch(input) {
  const [res, setRes] = useState();
  function start() {
    fetch(input).then((v) => setRes(v));
  }
  return {response: res, startFetch: start};
}
