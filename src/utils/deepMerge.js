import { isPlainObject } from "@reduxjs/toolkit";

export default function deepMerge(oldObject, newObject) {
  let result = Object.assign({}, oldObject);
  Object.keys(newObject).forEach((key) => {
    if (isPlainObject(newObject[key]) && isPlainObject(oldObject[key]))
      result[key] = deepMerge(oldObject[key], newObject[key]);
    else {
      const newState = newObject[key];
      result[key] =
        typeof newState === "function" ? newState(result[key]) : newState;
    }
  });
  return result;
}

export function getValueByKey(obj, key) {
  const keys = key.split(".");
  let current = obj;
  for (let i = 0; i < keys.length; i++) {
    if (Object.hasOwnProperty.call(current, keys[i]))
      current = current[keys[i]];
    else return;
  }
  return current;
}

export function setValueByKey(obj, key, value) {
  const keys = key.split(".");
  let current = obj;
  keys.slice(0, -1).forEach((key) => {
    const notObject = !isPlainObject(current[key]);
    if (!Object.hasOwnProperty.call(current, key) || notObject)
      current[key] = {};
    current = current[key];
  });
  current[keys[keys.length - 1]] = value;
  return { ...obj };
}

window.setValueByKey = setValueByKey;
