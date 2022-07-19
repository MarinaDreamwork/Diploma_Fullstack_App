export function createOrderNumber(lastNum) {
  return !lastNum ? '001' : '00' + (lastNum + 1).toString();
}

export function getLastNumber(orderList) {
  console.log('orderList');
  // она будет проверять массив заказов у user
  const lastNumber = [];
  if(orderList.length !== 0) {
    for(let i = 0; i < orderList.length; i++) {
      lastNumber.push(Number(orderList[i]));
    }
  } else {
    return []
  }
  
  return Math.max(...lastNumber);
}