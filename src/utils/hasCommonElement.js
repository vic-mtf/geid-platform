export default function hasCommonElement(...arrays) {
  let hasCommon = false;
  arrays.forEach((array, i) => {
    array.forEach((element) => {
      const foundInAllArrays = arrays.every((otherArray, j) => {
        return j === i || otherArray.includes(element);
      });
      if (foundInAllArrays) {
        hasCommon = true;
      }
    });
  });
  return hasCommon;
}
