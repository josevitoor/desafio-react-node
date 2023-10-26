function parseTransaction(line) {
  const type = parseInt(line.slice(0, 1));
  const date = line.slice(1, 26);
  const product = line.slice(26, 56);
  const value = parseInt(line.slice(56, 66));
  const seller = line.slice(66, 86);

  return [type, date, product, value, seller];
}

function isValidTransaction(type, date, product, value, seller) {
  return (
    !isNaN(type) &&
    date !== "" &&
    product.trim() !== "" &&
    !isNaN(value) &&
    seller.trim() !== ""
  );
}

module.exports = {
  parseTransaction,
  isValidTransaction,
};
