export default function groupArrayInAlphaOrder(_array = [], key = "name") {
  const data = [];
  const sortData = [..._array].sort((a, b) =>
    a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0
  );
  "abcdefghijklmnopqrstuvwxyz".split("").forEach((char) => {
    const subData = {
      label: char.toUpperCase(),
      children: sortData.filter((item) =>
        item[key]?.match(new RegExp("^" + char, "ig"))
      ),
    };
    if (subData.children.length) data.push(subData);
  });
  return data;
}
