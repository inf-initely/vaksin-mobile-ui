import {useStoreContext} from "../components/StoreContext.js";
export default function useCache() {
  const {lastLocationCache, detailCache} = useStoreContext();
  const [lastLocation, setLastLocation] = lastLocationCache;
  const [detail, setDetail] = detailCache;
  return {
    lastLocation,
    setLastLocation
  };
}
