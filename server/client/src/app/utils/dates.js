export const expiresDate = (expiresTime) => {
  return new Date().getTime() + expiresTime * 1000;
} 

const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']

export function getDate(timestamp) {
  const day = timestamp.getDate();
  const month = timestamp.getMonth();
  const year = timestamp.getFullYear();
  return day + ' ' + months[month] + ' ' + year;
}

export const formattingDate = (date) => {
  const year = date.slice(0, 4);
  let month = months[Number(date.slice(5, 7)) - 1];
  if(month && month.endsWith('я') && !(month === 'Мая')) {
    month = month.replace('я', 'ь');
  } else if(month && month.endsWith('а')) {
    month = month.replace('а', '');
  } else if(month && month === 'Мая') {
    month = 'Май'
  }
  return month + ' ' + year;
}