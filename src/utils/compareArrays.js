export default function compareArrays(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    let found = false;
    for (let j = 0; j < arr2.length; j++)
      if (JSON.stringify(arr1[i]) === JSON.stringify(arr2[j])) {
        found = true;
        break;
      }
    if (!found) return false;
  }
  return true;
}
