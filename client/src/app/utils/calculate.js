export const calculateOrderSumm = (array) => {
  return array.reduce((sum, item) =>  sum + item.totalAmount, 0)
};

export const getSalesDataById = (id, data) => {
  const filteredItem = data.filter(item => item.goodsId === id);
  if (filteredItem) {
    const salesData = filteredItem.reduce((sum, item) => sum + item.totalAmount, 0);
    return salesData;
  } else {
    return 0;
  }
};

export const getQuantityDataById = (id, data) => {
  const fileredItem = data.filter(item => item.goodsId === id);
  if (fileredItem) {
    const salesData = fileredItem.reduce((sum, item) => sum + item.quantity, 0);
    return salesData;
  } else {
    return 0;
  }
};

export const calculatePercentage = (quantity, totalQuantity) => {
  return ((quantity / totalQuantity) * 100).toFixed(2);
};