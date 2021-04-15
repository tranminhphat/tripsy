const createFilterString = (filterObject) => {
  if (!filterObject) {
    return "";
  }

  return JSON.stringify(
    Object.entries(filterObject).map((item) => `${item[0]}:${item[1]}`)
  );
};

export default createFilterString;
