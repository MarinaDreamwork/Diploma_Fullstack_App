import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changeItemData, createNewItem, getItemById } from '../../app/store/books';
import TextField from '../common/form/textField';
import Button from '../common/styles/button';
import { generateBooksArticleNumber } from '../../app/utils/createNumbers';
import { validator, validatorConfig } from '../../app/utils/validator';

const EditItemPage = ({ itemId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const item = useSelector(getItemById(itemId));
  console.log('item', item);
  const [data, setData] = useState({});
  const [number, setNumber] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = ({ target }) => {
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleClick = () => {
    setNumber(generateBooksArticleNumber());
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    if (!itemId) {
      dispatch(createNewItem(data));
    } else {
      dispatch(changeItemData(data));
    }
    setData({});
    history.push('/admin/books_page');
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    setData(...item);
  }, []);

  useEffect(() => {
    validate();
  }, [data]);

  console.log('data', data);

  return (
    <section>
      <div className='container p-3'>
        <div className='m-auto w-50 bg-light p-4'>
          <form onSubmit={handleSubmit}>
            <TextField
              label='Автор книги:'
              name='author'
              value={!data ? '' : data.author}
              onHandleChange={handleChange}
              error={errors.author}
            />
            <TextField
              label='Название книги:'
              name='book_title'
              value={!data ? '' : data.book_title || ''}
              onHandleChange={handleChange}
              error={errors.book_title}
            />
            <TextField
              label='Цена за штуку:'
              name='price'
              value={!data ? '' : data.price}
              onHandleChange={handleChange}
              error={errors.price}
            />
            <TextField
              label='Категория:'
              name='category'
              value={!data ? '' : data.category}
              onHandleChange={handleChange}
              error={errors.category}
            />
            <TextField
              label='Подкатегория:'
              name='subCategory'
              value={!data ? '' : data.subCategory}
              onHandleChange={handleChange}
              error={errors.subCategory}
            />
            <TextField
              label='Под-подкатегория:'
              name='subSubCategory'
              value={!data ? '' : data.subSubCategory}
              onHandleChange={handleChange}
              error={errors.subSubCategory}
            />
            <TextField
              label='Краткое описание:'
              name='description'
              value={!data ? '' : data.description}
              onHandleChange={handleChange}
              error={errors.description}
            />
            <div className='d-flex justify-content-center m-3'>
              <p className='fw-bold p-2 m-2' onClick={handleClick}>Нажать для создания артикула</p>
              <p className='text-primary fw-bold p-2 m-2'>{number ? number : ''}</p>
            </div>
            <TextField
              label='Номер артикула:'
              name='articleNumber'
              value={!data ? '' : data.articleNumber}
              onHandleChange={handleChange}
              error={errors.articleNumber}
            />
            <TextField
              label='Количество на складе:'
              type='number'
              name='inStock'
              value={!data ? '' : data.inStock}
              onHandleChange={handleChange}
              error={errors.inStock}
            />
            <TextField
              label='Путь к картинке:'
              name='src'
              value={!data ? '' : data.src}
              onHandleChange={handleChange}
              error={errors.src}
            />
            <div className='d-flex justify-content-center'>
              <Button
                disabled={!isValid}
                color='primary'
                description={!itemId ? 'Добавить новую позицию товара' : `Изменить данные позиции №${data.articleNumber}`} />
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