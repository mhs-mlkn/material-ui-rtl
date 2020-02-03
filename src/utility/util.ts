import get from "lodash/get";
import moment from "moment-jalaali";

export function getLS(key: string) {
  let val = localStorage.getItem(key) || "";
  return ["undefined", "null", "NaN"].indexOf(val) > -1 ? "" : val;
}

export function displayErrMsg(enqueueSnackbar: (p: any, o: any) => any) {
  return (error: any) =>
    enqueueSnackbar(
      get(error, "response.data.message", "درخواست با خطا مواجه شد"),
      { variant: "error" }
    );
}

export function formatNumber(num: number | string) {
  return (num || 0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export function formatChartValue(
  value: any,
  opt: { devideBy: number | string; label: string }
) {
  return `${formatNumber(value / +opt.devideBy || value)} ${opt.label}`;
}

export function formatValue(type: string, value: string | number | null) {
  const _val = value || "";
  /* if (type === "DATE") {
    return moment(_val.toString().slice(0, -5)).format("jYYYY/jMM/jDD");
  } else  */

  if (type === "NUMBER") {
    return formatNumber(value === 0 ? "0" : _val);
  }
  return _val;
}

export function parseToJSON(jsonString: string, defaultValue: object) {
  try {
    return JSON.parse(jsonString || JSON.stringify(defaultValue));
  } catch (error) {
    return defaultValue;
  }
}
