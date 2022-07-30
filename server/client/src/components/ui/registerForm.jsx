import React, { useEffect, useState } from 'react';
import AddressField from '../common/form/adressField';
import RadioField from '../common/form/radioField';
import TextField from '../common/form/textField';
import { validator, validatorConfig } from '../../app/utils/validator';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthErrors, signUp } from '../../app/store/users';
import { useHistory } from 'react-router-dom';
import CheckBoxField from '../common/form/checkboxField';

const RegisterForm = () => {
  const errorLogIn = useSelector(getAuthErrors());
  const history = useHistory();

  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: '',
    password: '',
    name: '',
    sex: 'male',
    city: '',
    street: '',
    appartment: '',
    zip: '',
    acceptTerms: false
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
    dispatch(signUp(data));
    history.push('/');
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
      <form className='p-3' onSubmit={handleSubmit}>
        <TextField
          label='Email'
          name='email'
          onHandleChange={handleChange}
          value={data.email}
          error={errors.email}
        />
        <TextField
          label='Пароль'
          type='password'
          name='password'
          onHandleChange={handleChange}
          value={data.password}
          error={errors.password}
        />
        <TextField
          label='Имя'
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
          type='radio'
          label='Выберете Ваш пол:'
          name='sex'
          onChange={handleChange}
          value={data.sex}
        />
        <AddressField
          label='Заполните адрес:'
          onChange={handleChange}
          valueZip={data.zip}
          valueStreet={data.street}
          valueApp={data.appartment}
          nameZip='zip'
          nameStreet='street'
          nameApp='appartment'
          errorstreet={errors.street}
          errorapp={errors.appartment}
          errorzip={errors.zip}
        />
        <CheckBoxField
          label='Принимаю условия пользовательского соглашения'
          type='checkbox'
          name='acceptTerms'
          onHandleChange={handleChange}
          value={data.acceptTerms}
          error={errors.acceptTerms}
        />
        <button
          className='btn btn-primary w-100'
          disabled={!isValid}>
          Создать профиль
        </button>
        {
          errorLogIn ? <p>{errorLogIn}</p> : null
        }
      </form>
    </section>
  );
};

export default RegisterForm;