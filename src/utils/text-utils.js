export function toPathParamCase(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function toSentenceCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const toCamelCase = (str) =>
  str
    .replace(/\s(.)/g, ($1) => $1.toUpperCase())
    .replace(/\s/g, "")
    .replace(/^(.)/, ($1) => $1.toLowerCase());

export function toSnakeCase(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
}

export function toKebabCase(str) {
  return str.replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export function toPascalCase(str) {
  return str
    .replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
    .replace(/\s+/g, "");
}

export function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function snakeToSentenceCase(str) {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const hasUpperCase = (str) => /[A-Z]/.test(str);
export const hasLowerCase = (str) => /[a-z]/.test(str);
export const hasDigit = (str) => /[0-9]/.test(str);
export const hasSpecial = (str) => /[^A-Za-z0-9]/.test(str);
