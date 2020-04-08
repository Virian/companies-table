export default (value) => {
  if (!value) {
    return null;
  }
  if (Number.isNaN(value)) {
    return value;
  }
  return value.toLocaleString();
};
