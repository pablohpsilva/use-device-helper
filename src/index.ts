import { useMemo } from "react";
import useBreakpoint from "@w11r/use-breakpoint";

export enum Devices {
  IOS = "IOS",
  ANDROID = "ANDROID",
  WINDOWSPHONE = "WP",
  SYMBIAN = "SYMBIAN",
}

export enum AppleDevices {
  iPhone4 = 480,
  iPhoneSE = 568,
  iPhone8 = 667,
  iPhonePlus = 736,
  iPhoneX = 812,
  iPhoneMax = 896,
}

export enum SamsungDevices {
  GalaxyS3 = "Galaxy S III",
  GalaxyS4 = "Galaxy S4",
  GalaxyS5 = "Galaxy S5",
  SamsungNote2 = "Galaxy Note II",
  GalaxyNote3 = "Galaxy Note 3",
  GalaxyNote4 = "Galaxy Note 4",
  GalaxyTabPro101 = "Galaxy TabPro 10.1",
}

export enum Browsers {
  AmazonSilk = "Silk",
  Android = "Android Browser",
  BLine = "B-Line",
  DBrowser = "dbrowser",
  Dolphin = "Dolphin",
  Firefox = "Firefox",
  InternetExplorer = "Internet Explorer",
  Isivioo = "Isivioo",
  MIUI = "MIUI Browser",
  Mercury = "Mercury",
  Opera = "Opera",
  Safari = "Safari",
  SafariMobile = "Mobile Safari",
  Samsung = "Samsung Browser",
  Silk = "Silk",
  SilkMobile = "Mobile Silk",
  UC = "UC Browser",
  Yandex = "Yandex Browser",
}

const useDeviceBreakpoints = () => {
  const breakpointsChanges = useBreakpoint();

  return useMemo(
    () => ({
      ...breakpointsChanges,
    }),
    [breakpointsChanges]
  );
};

export default useDeviceBreakpoints;
