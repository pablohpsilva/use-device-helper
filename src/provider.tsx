import React, { createContext, useState } from "react";
import { BreakpointProvider, useResize } from "@w11r/use-breakpoint";
const Bowser = require("bowser/bundled");

const getWindow = () => {
  if (typeof window !== "undefined") {
    return window;
  }

  return {
    navigator: {
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
    },
  };
};

const browserParserFunc = () => {
  const browser = Bowser.parse(getWindow().navigator.userAgent);
  const browserParser = Bowser.getParser(getWindow().navigator.userAgent);

  const defaultState = {
    userAgent: getWindow().navigator.userAgent,
    browser,
    browserParser,
    isSafari: browserParser.satisfies({ safari: ">1" }) ?? false,
    isChrome: browserParser.satisfies({ chrome: ">1" }) ?? false,
    isInternetExplorer:
      browserParser.satisfies({ "internet explorer": ">1" }) ?? false,
    isIE: browserParser.satisfies({ "internet explorer": ">1" }) ?? false,
    isOpera: browserParser.satisfies({ opera: ">1" }) ?? false,
    isFirefox: browserParser.satisfies({ firefox: ">1" }) ?? false,
    isIOS: browser?.os?.name?.toLowerCase() === "ios",
    isAndroid: browser?.os?.name?.toLowerCase() === "android",
    isMacOS: browser?.os?.name?.toLowerCase() === "macos",
    isWindows: browser?.os?.name?.toLowerCase() === "windows",
  };

  return defaultState;
};

export const defaultState = browserParserFunc();

export const Context = createContext(defaultState);

export const DeviceBreakpointProvider = ({ children }) => {
  const [values, setValues] = useState(defaultState);

  useResize(() => {
    const userAgent = getWindow().navigator.userAgent;
    if (values?.userAgent !== userAgent) {
      const defaultState = browserParserFunc();
      setValues(defaultState);
    }
  });

  return (
    <Context.Provider value={values}>
      <BreakpointProvider>{children}</BreakpointProvider>
    </Context.Provider>
  );
};

export default DeviceBreakpointProvider;
