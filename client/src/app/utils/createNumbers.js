import { random } from 'lodash';

export function createOrderNumber(list) {
  console.log('list', list);
  if(list?.length === 0) return '00-001';
  else {
    const lastOrder = list[list?.length-1]?.orderNumber; 

    console.log('lastOrder', lastOrder);
    return '00-00' + (Number(lastOrder.replace('-', '')) + 1).toString();
  } 
}

// export function getOrderLastNumber(lastOrder) {
//   if(!lastOrder) return 
//   // она будет проверять массив заказов у user
//   const lastNumber = [];
//   if(!orderList) {
//      return []
//   } else {
//     for(let i = 0; i < orderList?.length; i++) {
//       lastNumber.push(Number(orderList[i]));
//     }
//   }
//   console.log('lastNumber', lastNumber);
//   console.log('Next number', Math.max(...lastNumber));
//   return Math.max(...lastNumber);
// }

export const generateBooksArticleNumber = () => {
  const numbers = '0123456789';
  let number = '';
  for(let i = 0; i < 8; i++) {
    number += numbers[random(0, 9)]
  }
  return number;
};