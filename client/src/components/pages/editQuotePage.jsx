import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getQuoteById, changeQuoteData } from '../../app/store/quotes';
import TextArea from '../common/form/textArea';
import TextField from '../common/form/textField';
import Button from '../common/styles/button';

const EditQuotePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const quote = useSelector(getQuoteById(itemId));
  console.log('quote', quote);
  console.log('itemId', itemId);
  const [data, setData] = useState({
    author: quote[0].author,
    content: quote[0].content
  });

  const handleChange = ({ target }) => {
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('data', data);
    dispatch(changeQuoteData({ ...data, _id: quote[0]._id }));
    history.push('/admin/quotes_page');
  };
  return (
    <section>
      <div className='container p-3'>
        <div className='m-auto w-50 bg-light p-4'>
          <form onSubmit={handleSubmit}>
            <TextField
              label='Автор цитаты:'
              type='text'
              name='author'
              value={!data ? '' : data.author}
              onHandleChange={handleChange}
            />
            <TextArea
              label='Цитата:'
              type='text'
              name='quote'
              value={data.content}
              onHandleChange={handleChange}
            />
            <div className='d-flex justify-content-center'>
              <Button
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