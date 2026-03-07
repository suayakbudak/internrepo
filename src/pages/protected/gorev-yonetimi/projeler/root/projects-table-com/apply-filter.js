/**
 * Filters and sorts the input data based on provided filters and comparator
 * @param {Object} params Filter parameters
 * @param {Array} params.inputData Input data to filter
 * @param {Function} params.comparator Comparison function for sorting
 * @param {Object} params.filters Filter criteria
 * @returns {Array} Filtered and sorted data
 */
export function applyFilter({ inputData, comparator, filters }) {
  const { name, status, role } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter((user) => user.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (status !== "all") {
    inputData = inputData.filter((user) => user.status === status);
  }

  if (role.length) {
    inputData = inputData.filter((user) => role.includes(user.role));
  }

  return inputData;
}
