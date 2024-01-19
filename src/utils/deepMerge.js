import { isPlainObject } from "lodash";
export default function deepMerge(oldObject, newObject) {
    let result = {...oldObject};
    Object.keys(newObject).forEach(key => {
        if (isPlainObject(newObject[key]) && isPlainObject(oldObject[key]))
            result[key] = deepMerge(oldObject[key], newObject[key]);
        else result[key] = newObject[key];
    });
    return result;
}
