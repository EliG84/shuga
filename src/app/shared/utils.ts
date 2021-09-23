import { isString } from "lodash";

export function isStringJson(str: string | null): boolean {
  if(!str || !isString(str)) {
    return false;
  }
  try {
    JSON.parse(str);
  } catch (error) {
    return false;
  }
  return true;
}
