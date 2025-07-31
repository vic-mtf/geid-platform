export default function replaceObjects(array1, array2) {
  const objectHash = {};
  array1.forEach((object1) => {
    objectHash[object1.id] = object1;
  });
  array2.forEach((object2, index) => {
    const object1 = objectHash[object2.id] ? objectHash[object2.id] : object2;
    array2[index] = object1;
  });
  return array2;
}
