export function checkFavoritesFromStorage(newData, localStorageData) {
  if(localStorageData === []) return newData;
  else {
    let processedArray = [...newData];
    for(let i = 0; i < processedArray.length; i++) {
      // array[i] - каждый пришедший объект, надо его id сравнить с 
      for(let j = 0; j < localStorageData.length; j++) {
        if(processedArray[i].id === localStorageData[j].id) {
          processedArray[i] = {...processedArray[i], isFavorite: true}
        }
        // const itemIndex = processedArray.findIndex(item => item.id === localStorageData[j].id);
      }
    }
    return processedArray;
  }
}
