import { escapeRegExp } from "lodash";
import getFullName from "./getFullName";

export default function filterByKey(_key = "id", ..._arrays) {
  const key = Array.isArray(_key) ? "id" : _key;
  const arrays = Array.isArray(_key) ? [_key, _arrays.flat()].flat() : _arrays;
  const combinedArray = arrays.flat();
  const uniqueObjectsById = {};
  combinedArray.forEach((obj) => (uniqueObjectsById[obj[key]] = obj));
  return Object.values(uniqueObjectsById);
}

export function filterByName(item, search) {
  const keywords = search.trim().toLowerCase().split(/\s+/);
  const names = getFullName(item)?.toLowerCase()?.split(/\s+/);
  for (const keyword of keywords)
    if (
      names.find((name) => new RegExp(`^${escapeRegExp(keyword)}`).test(name))
    )
      return true;
  return search ? false : true;
}

export function filterByKeyword(object, keyword) {
  const escapedKeyword = escapeRegExp(keyword);
  const words = escapedKeyword.split(" ");
  const regExes = words
    .filter((word) => (words.length > 1 ? word.trim() : true))
    .map((word) => new RegExp(word, "i"));
  return regExes.some(
    (regex) => regex.test(object.name) || regex.test(object.email)
  );
}
