import {kebabCase, mapValues, transform, upperFirst} from "../../_snowpack/pkg/lodash-es.js";
const apiToValueTable = {
  "Kota Makasar": "Kota Makassar"
};
const valueToApiTable = transform(apiToValueTable, (r, v, k) => r[v] = k);
const urlToValueTable = {
  "kab-tojo-una-una": "Kab. Tojo Una-Una",
  "kab-toli-toli": "Kab. Toli-Toli",
  "dki-jakarta": "DKI Jakarta",
  "di-yogyakarta": "DI Yogyakarta"
};
export function apiToValue(city) {
  return mapValues(city, (v) => apiToValueTable[v] ?? v);
}
export function valueToApi(city) {
  return mapValues(city, (v) => valueToApiTable[v] ?? v);
}
export function valueToUrl(city) {
  return mapValues(city, (v) => kebabCase(v).replace(".", ""));
}
export function urlToValue(city) {
  return mapValues(city, (v) => urlToValueTable[v] ?? v.split("-").map(upperFirst).join(" ").replace(/^Kab /, "Kab. "));
}
