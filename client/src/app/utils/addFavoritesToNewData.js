export function addFavoritesToNewData(newArray, arrayOfFavorites) {
  // здесь будем сравнивать элементы 
  const processedArray = [];
  for(let i = 0; i < newArray.length; i++) {
    processedArray.push(newArray[i]);
    // array[i] - каждый пришедший объект, надо его id сравнить с 
    for(let j = 0; j < arrayOfFavorites.length; j++) {
      if(newArray[i].id === arrayOfFavorites[j].id) {
        //const keysOfNewArray = Object.keys(newArray)
        // for (let value of Object.values(newArray[i])) {
        //           alert(value); // значения пришедших с сервера данных 
      }
    }
  }
  return newArray;
}
