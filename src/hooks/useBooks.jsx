import React, { useContext } from 'react';

const BookContext = React.createContext();

export const useBooks = () => {
  return useContext(BookContext);
};

export const BookProvider = ({ children }) => {
  const quotes = [
    {id: 1, content: 'Все дело в мыслях. Мысль — начало всего. И мыслями можно управлять. И поэтому главное дело совершенствования: работать над мыслями.', author: 'Лев Толстой'},
    {id: 2, content: 'Начинайте делать все, что вы можете сделать – и даже то, о чем можете хотя бы мечтать. В смелости гений, сила и магия', author: 'Иоганн Вольфганг Гете'},
    {id: 3, content: 'Есть только один способ избежать критики: ничего не делайте, ничего не говорите и будьте никем.', author: 'Аристотель'},
    {id: 4, content: 'Успех — это способность идти от поражения к поражению, не теряя оптимизма.', author: 'Уинстон Черчилль'}
  ];
    const data = [
    {
      id: '123456', price: 700, author: 'Александр Дюма', book_title: 'Граф Монте-Кристо', src: 'https://cdn2.static1-sima-land.com/items/4480382/0/700-nw.jpg',  category: 'Художественная литература', subCategory: 'Классическая проза', subSubCategory: 'Классическая зарубежная проза'
    },
    {
      id: '234567', price: 550, author: 'Эрих Мария Ремарк', book_title: 'Три товарища' , src: 'https://foliant72.ru/image/cache/data/product/547800-800x800.jpg', category: 'Художественная литература', subCategory: 'Классическая проза', subSubCategory: 'Классическая зарубежная проза'
    },
    {
      id: '345678', price: 650, author: 'Александр Пушкин', book_title: 'Евгений Онегин', src: 'https://knigamir.com/upload/iblock/90d/90d83999e2b765a1804fb072399db4c5.jpg', category: 'Художественная литература', subCategory: 'Поэзия', subSubCategory: 'Классическая отечественная поэзия'
    },
    {
      id: '456789', price: 450, author: 'Виктор Гюго', book_title: 'Отверженные', src: 'https://i.pinimg.com/736x/3b/e4/34/3be4342535357ca316b805eae803c316.jpg', category: 'Художественная литература', subCategory: 'Классическая проза', subSubCategory: 'Классическая зарубежная проза'
    }
  ];
  const getItemById = (id) => {
    return data.find(item => item.id === id);
  }
  return (
    <BookContext.Provider value={{ quotes, data, getItemById }}>
      { children }
    </BookContext.Provider>
  )
}