export const sortData = (data) => {
  const sortedData = [...data];
  // data.sort((a,b))
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};
