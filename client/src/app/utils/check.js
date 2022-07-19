export function check(array, item) {
  const newArray = [...array];
  console.log('item from check', item);
  const index = array.findIndex(elem => elem.id === item.id);
  if(index === -1) {
    newArray.push(item);
  }
  return newArray;
}