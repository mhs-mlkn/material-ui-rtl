export function toggleDirection(dir: "rtl" | "ltr") {
  return dir === "rtl" ? "ltr" : "rtl";
}

export function toggleType(type: "dark" | "light") {
  return type === "dark" ? "light" : "dark";
}
