export const formateNumberToPrice = (number) => {
  let price = '';
  if(number.toString().length % 3 === 0 + 1) {
    let lastPart = number.toString().slice(-3);
    let previousPart = number.toString().slice(0, -3);
    price = previousPart + ' ' + lastPart;
  } else {
    price = number;
  }
  return price;
};

export const unFormatPriceToNumber = (price) => {
  return Number(price.replace(' ', ''));
};

export const formatCardInterface = (value) => {
  let formattedValue = '';
  if(value.length === 4 || value.length === 9 || value.length === 14) {
    formattedValue = value + ' ';
  } else return value;
  return formattedValue;
};

export const formatExpDateInterface = (value) => {
  let formattedValue = '';
  if(value.length === 2) {
    formattedValue = value + '/';
  } else return value;
  return formattedValue;
};