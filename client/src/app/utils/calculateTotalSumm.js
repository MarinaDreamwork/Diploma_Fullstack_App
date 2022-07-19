export const calculateOrderSumm = (array) => {
  return array.reduce((sum, item) =>  sum + item.totalAmount, 0)
};