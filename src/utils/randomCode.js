import { random } from "lodash";
let initParam = {
  length: 6,
  mode: "alphanum",
  discount: true,
};
export default function randomCode(param = { ...initParam }) {
  initParam = {
    ...initParam,
    ...param,
  };
  let alphaString = "abcdefghijklmnopqrstuvwz";
  let num = "01234567898";
  let code = "";
  let chars = "";
  while (code.length < initParam.length) {
    chars = [alphaString, num][random(0, 1)];
    if (initParam.mode === "num") chars = num;
    if (initParam.mode === "alpha") chars = alphaString;
    const char = chars.charAt(random(0, chars.length));
    code += char;
    if (!initParam.discount) {
      if (chars === alphaString) alphaString = alphaString.replace(char, "");
      else num = alphaString.replace(char, "");
    }
  }
  return code;
}
