import { kebabCase } from "es-toolkit";

export function idParam(str, value) {
  return str.replace(":id", value);
}

export function idsParam(str, values) {
  return values.reduce((acc, value, index) => acc.replace(`:id${index + 1}`, value), str);
}

export function slugParam(str, value) {
  return str.replace(":slug", value);
}

export function titleParam(str, value) {
  return str.replace(":title", kebabCase(value));
}
