import * as __SNOWPACK_ENV__ from '../../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import contextFactory from "../functions/contextFactory.js";
import {useCallback, useContext} from "../../_snowpack/pkg/react.js";
import hash from "../../_snowpack/pkg/object-hash.js";
export const {
  context: DataContext,
  provider: DataProvider
} = contextFactory({
  regions: null
});
const isCityValidCache = new Map();
export function useDataContext() {
  const {
    regions
  } = useContext(DataContext);
  const isCityValid = useCallback((props) => {
    if (regions == null)
      throw new Error("Attempting to access isCityValid function while regions is empty!");
    const {city, province} = props;
    const hashed = hash(props);
    let result = isCityValidCache.get(hashed);
    if (result !== void 0)
      return result;
    const region = regions.find((r) => r.province === province);
    result = region != null && !!region.city.find((c) => c === city);
    isCityValidCache.set(hashed, result);
    return result;
  }, [regions]);
  return {
    regions,
    isCityValid
  };
}
