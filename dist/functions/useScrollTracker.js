import {useStoreContext} from "../components/StoreContext.js";
import {useCallback, useEffect} from "../../_snowpack/pkg/react.js";
import {cloneDeep, merge, throttle} from "../../_snowpack/pkg/lodash-es.js";
export default function useScrollTracker(id, track = false) {
  const {lastScroll} = useStoreContext();
  const [scrollList, setScrollList] = lastScroll;
  const scrollTrack = useCallback(throttle(() => {
    setScrollList((old) => {
      return merge(cloneDeep(old), {
        [id]: {
          left: window.scrollX,
          top: window.scrollY
        }
      });
    });
  }, 100), [id]);
  useEffect(() => {
    if (track == false)
      return;
    document.addEventListener("scroll", scrollTrack);
    return () => document.removeEventListener("scroll", scrollTrack);
  }, [id]);
  const restoreScroll = useCallback((smooth = false) => {
    window.scrollTo({
      ...scrollList[id],
      behavior: smooth ? "smooth" : void 0
    });
  }, [id]);
  return {
    restoreScroll
  };
}
