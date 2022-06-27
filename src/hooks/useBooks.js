import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import bookService from '../components/services/book.service';
import quotesService from '../components/services/quotes.service';

const BookContext = React.createContext();

export const useBooks = () => {
  return useContext(BookContext);
};

export const BookProvider = ({ children }) => {
  const [filteredByName, setFilteredByName] = useState([]);
  // const quotes = [
  //   {id: 1, content: 'Все дело в мыслях. Мысль — начало всего. И мыслями можно управлять. И поэтому главное дело совершенствования: работать над мыслями.', author: 'Лев Толстой'},
  //   {id: 2, content: 'Начинайте делать все, что вы можете сделать – и даже то, о чем можете хотя бы мечтать. В смелости гений, сила и магия', author: 'Иоганн Вольфганг Гете'},
  //   {id: 3, content: 'Есть только один способ избежать критики: ничего не делайте, ничего не говорите и будьте никем.', author: 'Аристотель'},
  //   {id: 4, content: 'Успех — это способность идти от поражения к поражению, не теряя оптимизма.', author: 'Уинстон Черчилль'}
  // ];

  // const initialState = [
  //   {
  //     id: '123456', price: 700, author: 'Александр Дюма', book_title: 'Граф Монте-Кристо', src: 'https://cdn2.static1-sima-land.com/items/4480382/0/700-nw.jpg',  category: 'Художественная литература', categoryPath: '/fiction', subCategory: 'Классическая проза', subSubCategory: 'Классическая зарубежная проза', isFavorite: false
  //   },
  //   {
  //     id: '234567', price: 550, author: 'Эрих Мария Ремарк', book_title: 'Три товарища' , src: 'https://foliant72.ru/image/cache/data/product/547800-800x800.jpg', category: 'Художественная литература', categoryPath: '/fiction', subCategory: 'Классическая проза', subSubCategory: 'Классическая зарубежная проза', isFavorite: false
  //   },
  //   {
  //     id: '345678', price: 650, author: 'Александр Пушкин', book_title: 'Евгений Онегин', src: 'https://knigamir.com/upload/iblock/90d/90d83999e2b765a1804fb072399db4c5.jpg', category: 'Художественная литература', categoryPath: '/fiction', subCategory: 'Поэзия', subSubCategory: 'Классическая отечественная поэзия', isFavorite: false
  //   },
  //   {
  //     id: '456789', price: 450, author: 'Виктор Гюго', book_title: 'Отверженные', src: 'https://i.pinimg.com/736x/3b/e4/34/3be4342535357ca316b805eae803c316.jpg', category: 'Художественная литература', categoryPath: '/fiction', subCategory: 'Классическая проза', subSubCategory: 'Классическая зарубежная проза', isFavorite: false
  //   },
  //   {
  //     id: '456589', price: 464, author: 'Толкин Джон Рональд Руэл', book_title: 'Хоббит', src: 'https://img3.labirint.ru/rc/11cdb92265f13e03c74af557f5df878e/363x561q80/books45/442891/cover.jpg?1563780589', category: 'Иностранные языки', categoryPath: '/foreign', subCategory: 'Художественная литература на англ. языке', subSubCategory: 'Классическая зарубежная проза на английском языке', isFavorite: false
  //   },
  //   {
  //     id: '456587', price: 884, author: 'Митрополит Тихон (Шевкунов)', book_title: '"Несвятые святые" и другие рассказы', src: 'https://img4.labirint.ru/rc/ff5cf8a1371c8f08e42c8e91a6961423/363x561q80/books70/695038/cover.jpg?1564203838', category: 'Книги о религии', categoryPath: '/religion', subCategory: 'Христианство', subSubCategory: 'Православие', isFavorite: false
  //   },
  //   {
  //     id: '466587', price: 1340, author: 'Татьяна Скорочкина', book_title: 'Онлайф. Как учить и учиться в онлайне', src: 'https://img4.labirint.ru/rc/5acd3167ed07f516948e60de0d52cdbc/363x561q80/books83/825452/cover.jpg?1633346718', category: 'Учебная, методическая литература', categoryPath: '/training', subCategory: 'Педагогика', subSubCategory: 'История и организация народного образования', isFavorite: false
  //   },
  //   {
  //     id: '835266', price: 1102, author: 'Виноградов Андрей', book_title: 'Легенды Царьграда', src: 'https://img4.labirint.ru/rc/afc88e01fce145686e2d4646ed61ec4b/363x561q80/books84/835426/cover.jpg?1653330386', category: 'Нехудожественная литература', categoryPath: '/non-fiction', subCategory: 'Педагогика', subSubCategory: 'История и организация народного образования', isFavorite: false
  //   },
  //   {
  //     id: '843938', price: 800, author: 'Люси Стрейндж', book_title: 'Призрак полночного озера', src: 'https://img4.labirint.ru/rc/4dea73dbeb2a49e986352d91b15996ce/363x561q80/books85/843938/cover.png?1652365534', category: 'Книги для детей', categoryPath: '/children', subCategory: 'Проза для детей', subSubCategory: 'Мистика. Фантастика. Фэнтези', isFavorite: false
  //   }
  // ];

  const [data, setData] = useState([]);
  const [cartContent, setCartContent] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const categories = [
    {id: '1', name: 'Художественная литература'},
    {id: '2', name: 'Нехудожественная литература'},
    {id: '3', name: 'Книги для детей'},
    {id: '4', name: 'Учебная, методическая литература'},
    {id: '5', name: 'Иностранные языки'},
    {id: '6', name: 'Книги о религии'}
  ];

  const getBooks = async () => {
    try {
      const { content } = await bookService.get();
      setData(content);
      setLoading(false);
    } catch(error) {
      console.log(error);
    }
  };

  const getItemById = (id) => {
    return data.find(item => item.id === id);
  };

  const getFavoritedItems = () => {
    return data.filter(item => item.isFavorite);
  };

  const searchGoodsByName = (value) => {
    // вернет только первый вариант совпадения по запросу
    return data.filter(item => item.book_title.indexOf(value) !== -1);
  };

  const toggleFavorite = (id) => {
    const favorited = data.map(item => {
      if (item.id === id) {
        if(!item.isFavorite) {
          return {...item, isFavorite: true};
        } else {
          return {...item, isFavorite: false};
        }
      }
      return {...item}
    });
    setData(favorited);
  };

  const addCartContent = (newItem) => {
    const result = cartContent.length > 0
    ? (cartContent.map(item => item.id === newItem.id 
      ? {...item, quantity: item.quantity + newItem.quantity}
      : {...item}))
    : [{...newItem}];
    console.log('result', result);
    const newResult = check(result, newItem);
    setCartContent(newResult);
  };

  function check(array, item) {
    const newArray = [...array];
    for(let elem of newArray) {
      if(elem.id !== item.id) { 
        newArray.push(item);
        break;
      }
    }; 
    return newArray;
  };

  const updatedQuantity = (changedItem) => {
    const updatedQuantity = cartContent.map(cartItem => cartItem.id === changedItem.id && {...cartItem, quantity: changedItem.quantity });
    setCartContent(updatedQuantity);
  };

  const deleteCartItem = (id) => {
    const updatedCart = cartContent.filter(item => {
      return item.id !== id;
    });
    setCartContent(updatedCart);
  };

  const clearCartContent = () => {
    setCartContent([]);
  };

  const calculateCartSumm = () => {
    const commonSumm = cartContent.reduce((sum, item) =>  {
      return sum + (item.price * item.quantity);
    }, 0);
    return commonSumm;
  };

  const getItemsInCart = () => {
    const cartQuantity = cartContent.reduce((sum, item) =>  {
      return sum + item.quantity;
    }, 0);
    return cartQuantity;
  }

  useEffect(() => {
    getBooks();
  }, []);

  console.log('cartContent', cartContent);

  return (
    <BookContext.Provider
      value={{ 
        data, 
        getItemById,
        searchGoodsByName,
        categories,
        toggleFavorite,
        getFavoritedItems,
        loadingBooks: isLoading,
        cartContent,
        addCartContent,
        deleteCartItem,
        clearCartContent,
        calculateCartSumm,
        updatedQuantity,
        getItemsInCart
      }}
    >
      { children }
    </BookContext.Provider>
  )
};