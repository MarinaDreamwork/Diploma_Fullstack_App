import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthErrors, getUserById, updateUserData } from '../../app/store/users';
import AddressField from '../common/form/adressField';
import RadioField from '../common/form/radioField';
import TextField from '../common/form/textField';
import { validator, validatorConfig } from '../../app/utils/validator';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../common/styles/button';
import FormStyleTitle from '../common/styles/formStyleTitle';

const EditUserPage = () => {
  const errorLogIn = useSelector(getAuthErrors());
  // подумать, делать ли проверку админ может изменить всех или удалить
  const { itemId } = useParams();

  const user = useSelector(getUserById(itemId));
  const history = useHistory();
  console.log('user', user);

  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: user[0].email,
    name: user[0].name,
    sex: user[0].sex,
    //city: '',
    street: user[0].address.street,
    appartment: user[0].address.appartment,
    zip: user[0].address.zip
  });

  const [errors, setErrors] = useState({});

  const handleChange = ({ target }) => {
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    dispatch(updateUserData({
      ...data,
      address: { street: data.street, appartment: data.appartment, zip: data.zip },
      _id: user[0]._id
    }));
    history.goBack();
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
    <div className='container'>
      <div className="d-flex flex-column border rounded m-auto pt-5 ps-5 pe-5 pb-3 mt-5 mb-5 w-50 bg-light shadow-sm">
        <FormStyleTitle description='Изменить данные в профиле:' style={{ textShadow: '1px 1px 2px black' }} />
        <form className='p-3' onSubmit={handleSubmit}>
          <TextField
            label='Email'
            name='email'
            onHandleChange={handleChange}
            value={data.email}
            error={errors.email}
          />
          <TextField
            label='Имя'
            type='name'
            name='name'
            onHandleChange={handleChange}
            value={data.name}
            error={errors.name}
          />
          <RadioField
            options={[
              { name: 'Female', value: 'female', id: 1 },
              { name: 'Male', value: 'male', id: 2 },
              { name: 'Other', value: 'other', id: 3 },
            ]}
            label='Выберете Ваш пол:'
            name='sex'
            onChange={handleChange}
            value={data.sex}
            type='radio'
          />
          <AddressField
            label='Введите адрес:'
            onChange={handleChange}
            valueZip={data.zip}
            valueStreet={data.street}
            valueApp={data.appartment}
            nameZip='zip'
            nameStreet='street'
            nameApp='appartment'
            errorstreet={errors.street}
            errorzip={errors.zip}
            errorapp={errors.appartment}
          />
          <Button
            style={{ width: '100%' }}
            color='primary'
            disabled={!isValid}
            description='Изменить данные профиля' />
          {
            errorLogIn ? <p>{errorLogIn}</p> : null
          }
        </form>
      </div>
    </div>
  );
};

EditUserPage.propTypes = {
  userId: PropTypes.string
}

export default EditUserPage;