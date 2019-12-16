import { TTheme } from "./theme.types";
import get from "lodash/get";

const SETTINGS = "DU_SETTINGS";

export function toggleDirection(dir: "rtl" | "ltr"): "ltr" | "rtl" {
  return dir === "rtl" ? "ltr" : "rtl";
}

export function toggleThemeType(type: "dark" | "light") {
  return type === "dark" ? "light" : "dark";
}

export function toggleDrawerType(type: "temporary" | "permanent") {
  return type === "temporary" ? "permanent" : "temporary";
}

export function toggleFullScreen() {
  if (!document.fullscreen) {
    document.body.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

export function saveSettings(state: TTheme): Promise<any> {
  return new Promise(resolve => {
    window.setTimeout(() => {
      localStorage.setItem(SETTINGS, JSON.stringify(state));
      return resolve();
    }, 100);
  });
}

export function loadSettings(): TTheme {
  let settings = {};
  const get2 = (key: string, def: any) => get(settings, key, def);

  try {
    settings = JSON.parse(localStorage.getItem(SETTINGS) || "");
  } catch (error) {
    settings = {};
  }

  return {
    direction: get2("direction", "rtl"),
    type: get2("type", "light"),
    isDrawerOpen: get2("isDrawerOpen", false),
    isSettingsOpen: false,
    drawerType: get2("drawerType", "temporary"),
    showAppBar: get2("showAppBar", true),
    showSideBar: get2("showSideBar", true),
    isFullContent: false
  };
}
