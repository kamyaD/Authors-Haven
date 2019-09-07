
const paginate = (page, pageSize) => {
  if (!page) {
    page = 1;
  }
  pageSize = 30;
  const offset = (page - 1) * (pageSize);
  const limit = pageSize;

  return {
    offset,
    limit
  };
};
export default paginate;
