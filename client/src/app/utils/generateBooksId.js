import { random } from 'lodash';

export const generateBooksId = () => {
  const numbers = '0123456789';
  let number = '';
  for(let i = 0; i < 6; i++) {
    number += numbers[random(0, 9)]
  }
  return number;
};