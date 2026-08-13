export const myAction = (product) => {
  return {
    type: 'ADD_TO_CART',
    payload: product
  };
};
