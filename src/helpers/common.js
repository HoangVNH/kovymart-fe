export const isValidArray = (array) => Array.isArray(array) && array.length > 0;

export const modifyProduct = (product, quantity) => {
  const modifiedProduct = { ...product, quantity, productId: product.id };
  delete modifiedProduct["id"];

  return modifiedProduct;
};