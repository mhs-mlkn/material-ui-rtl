export function getLS(key: string) {
  let val = localStorage.getItem(key) || "";
  return ["undefined", "null", "NaN"].indexOf(val) > -1 ? "" : val;
}
