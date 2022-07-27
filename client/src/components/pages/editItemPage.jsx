import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changeItemData, createNewItem, getItemById } from '../../app/store/books';
import TextField from '../common/form/textField';
import Button from '../common/styles/button';
import { generateBooksArticleNumber } from '../../app/utils/createNumbers';

const EditItemPage = ({ itemId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const item = useSelector(getItemById(itemId));
  console.log('item', item);
  const [data, setData] = useState({});
  const [number, setNumber] = useState(null);

  const handleChange = ({ target }) => {
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleClick = () => {
    setNumber(generateBooksArticleNumber());
  }

  const handleSubmit = () => {
    if (!itemId) {
      dispatch(createNewItem(data));
    } else {
      dispatch(changeItemData(data));
    }
    setData({});
    history.push('/admin/books_page');
  };

  useEffect(() => {
    setData(...item);
  }, []);

  console.log('data', data);

  return (
    <section>
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
            <div className='d-flex justify-content-center m-3'>
              <p className='fw-bold p-2 m-2' onClick={handleClick}>Нажать для создания артикула</p>
              <p className='text-primary fw-bold p-2 m-2'>{number ? number : ''}</p>
            </div>
            <TextField
              label='Номер артикула:'
              type='text'
              name='articleNumber'
              value={!data ? '' : data.articleNumber}
              onHandleChange={handleChange}
            />
            <TextField
              label='Количество на складе:'
              type='number'
              name='inStock'
              value={!data ? '' : data.inStock}
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
              <Button
                color='primary'
                description={!itemId ? 'Добавить новую позицию товара' : `Изменить данные позиции №${itemId}`} />
            </div>
          </form>
        </div>
      </div>
    </section >
  );
};

EditItemPage.propTypes = {
  itemId: PropTypes.string
};

export default EditItemPage;