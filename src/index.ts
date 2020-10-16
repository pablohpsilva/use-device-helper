import { useMemo } from "react";
import Parser from "bowser/src/parser";
import useBreakpoint from "@w11r/use-breakpoint";

console.log("Parser", Parser);

const useDeviceBreakpoints = () => {
  const breakpointsChanges = useBreakpoint();
  const browser = new Parser(window.navigator.userAgent).getResults();

  const deviceBreakpointsValue = {
    ...breakpointsChanges,
    browser,
  };

  return useMemo(() => deviceBreakpointsValue, [breakpointsChanges]);
};

export default useDeviceBreakpoints;
