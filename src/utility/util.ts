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
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export function formatValue(type: string, value: string) {
  if (type === "DATE") {
    return moment(value.slice(0, -5)).format("jYYYY/jMM/jDD");
  } else if (type === "NUMBER") {
    return formatNumber(value);
  }
  return value;
}
