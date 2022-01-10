import {useState, useMemo, useCallback} from "../../_snowpack/pkg/react.js";
import Fuse from "../../_snowpack/pkg/fusejs.js";
export default function useFuzzySearch(data, options) {
  const [isEmpty, setEmpty] = useState(true);
  const [results, setResults] = useState([]);
  const fuse = useMemo(() => {
    if (data == null)
      return new Fuse([]);
    return new Fuse(data, options);
  }, [data]);
  const search = useCallback((...props) => {
    const result = fuse.search(...props);
    setResults(result);
    return result;
  }, [fuse]);
  return {results, isEmpty, _fuse: fuse, search};
}
