const rawString = (str) => {
  let string = str;
  if (!Number.isNaN) {
    string = string.toLocaleString();
  }
  return string
    .toString()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, '');
};

export default (array, value, keys) => {
  const rawValue = rawString(value);
  return array.filter(
    (element) => keys.some((key) => rawString(element[key]).includes(rawValue)),
  );
};
