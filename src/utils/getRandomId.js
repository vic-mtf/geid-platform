const getRandomId = (id) => {
  return (
    parseInt(Date.now()).toString(16) +
    parseInt(Math.random() * Number.MAX_SAFE_INTEGER).toString(16) +
    (id || "")
  );
};

export default getRandomId;
