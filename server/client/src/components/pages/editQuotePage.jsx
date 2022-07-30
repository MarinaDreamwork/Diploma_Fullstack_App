import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getQuoteById, changeQuoteData } from '../../app/store/quotes';
import { validator, validatorConfig } from '../../app/utils/validator';
import TextArea from '../common/form/textArea';
import TextField from '../common/form/textField';
import Button from '../common/styles/button';

const EditQuotePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const quote = useSelector(getQuoteById(itemId));

  const [data, setData] = useState({
    author: quote[0].author,
    content: quote[0].content
  });
  const [errors, setErrors] = useState({});

  const handleChange = ({ target }) => {
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log('data', data);
    dispatch(changeQuoteData({ ...data, _id: quote[0]._id }));
    history.push('/admin/quotes_page');
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    validate();
  }, [data]);

  return (
    <section>
      <div className='container p-3'>
        <div className='m-auto w-50 bg-light p-4'>
          <form onSubmit={handleSubmit}>
            <TextField
              label='Автор цитаты:'
              name='author'
              value={data.author}
              onHandleChange={handleChange}
              error={errors.author}
            />
            <TextArea
              label='Цитата:'
              name='content'
              value={data.content}
              onHandleChange={handleChange}
              error={errors.content}
            />
            <div className='d-flex justify-content-center'>
              <Button
                disabled={!isValid}
                color='warning'
                description='Изменить цитату' />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default EditQuotePage;