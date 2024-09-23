export default (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // getUTCMonth() retorna de 0 a 11
  const year = date.getUTCFullYear();
  return `${day}-${month}-${year}`;
};
