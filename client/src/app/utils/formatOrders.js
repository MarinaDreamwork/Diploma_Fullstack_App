export const formatOrders = (data) => {
  const arr = data.map(item => ({
    ...item.orderTime,
    ...item.orderDetails.map(item2 => ({
      orderTime: item.orderTime,
      userId: item.userId,
      ...item2
  }))
  }));

  let newArray = [];
 for(let elem of arr) {
  newArray.push(...Object.values(elem));
 }

  return newArray;
};