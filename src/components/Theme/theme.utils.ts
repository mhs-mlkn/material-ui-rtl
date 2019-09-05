export function toggleDirection(dir: "rtl" | "ltr") {
  return dir === "rtl" ? "ltr" : "rtl";
}

export function toggleThemeType(type: "dark" | "light") {
  return type === "dark" ? "light" : "dark";
}

export function toggleDrawerType(type: "temporary" | "permanent") {
  return type === "temporary" ? "permanent" : "temporary";
}
