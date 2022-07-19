import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changeItemData, createNewItem, getItemById } from '../../app/store/books';
import { generateBooksId } from '../../app/utils/generateBooksId';
import TextField from '../common/form/textField';

const EditItemPage = ({ itemId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const item = useSelector(getItemById(itemId));
  console.log('item', item);
  const [data, setData] = useState({});

  const handleChange = ({ target }) => {
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = () => {
    if (!itemId) {
      dispatch(createNewItem({ ...data, id: generateBooksId() }))
    } else {
      dispatch(changeItemData(data));
    }
    setData({});
    history.push('/admin');
  };

  useEffect(() => {
    setData(...item);
  }, []);

  console.log('data', data);

  return (
    <div className='container p-3'>
      <div className='m-auto w-50 bg-light p-4'>
        <form onSubmit={handleSubmit}>
          <TextField
            label='Автор книги:'
            type='text'
            name='author'
            value={!data ? '' : data.author}
            onHandleChange={handleChange}
          />
          <TextField
            label='Название книги:'
            type='text'
            name='book_title'
            value={!data ? '' : data.book_title || ''}
            onHandleChange={handleChange}
          />
          <TextField
            label='Цена за штуку:'
            type='text'
            name='price'
            value={!data ? '' : data.price}
            onHandleChange={handleChange}
          />
          <TextField
            label='Категория:'
            type='text'
            name='category'
            value={!data ? '' : data.category}
            onHandleChange={handleChange}
          />
          <TextField
            label='Подкатегория:'
            type='text'
            name='subCategory'
            value={!data ? '' : data.subCategory}
            onHandleChange={handleChange}
          />
          <TextField
            label='Под-подкатегория:'
            type='text'
            name='subSubCategory'
            value={!data ? '' : data.subSubCategory}
            onHandleChange={handleChange}
          />
          <TextField
            label='Краткое описание:'
            type='text'
            name='description'
            value={!data ? '' : data.description}
            onHandleChange={handleChange}
          />
          <TextField
            label='Путь к категории:'
            type='text'
            name='categoryPath'
            value={!data ? '' : data.categoryPath}
            onHandleChange={handleChange}
          />
          <TextField
            label='Путь к картинке:'
            type='text'
            name='src'
            value={!data ? '' : data.src}
            onHandleChange={handleChange}
          />
          <div className='d-flex justify-content-center'>
            <button className='btn btn-primary'>{!itemId ? 'Добавить новую позицию товара' : `Изменить данные позиции №${itemId}`}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditItemPage.propTypes = {
  itemId: PropTypes.string
};

export default EditItemPage;