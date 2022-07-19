import React, { useEffect, useState } from 'react';
import TextField from '../common/form/textField';
import { validator } from '../../app/utils/validator';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthErrors, logIn } from '../../app/store/users';

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const loginError = useSelector(getAuthErrors());
  const dispatch = useDispatch();

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
    dispatch(logIn(data));
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения'
      },
      isEmail: {
        message: 'Email введен некорректно'
      }
    },
    password: {
      isRequired: {
        message: 'Пароль обязателен для заполнения'
      },
      isCapital: {
        message: 'Пароль должен содержать по крайней мере одну заглавную букву'
      },
      isDigit: {
        message: 'Пароль должен содержать по крайней мере одну цифру'
      },
      minSymbols: {
        message: 'Необходимо ввести минимум 8 символов',
        value: 8
      }
    }
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
    <form className='p-3' onSubmit={handleSubmit}>
      <TextField
        label='Email address'
        name='email'
        onHandleChange={handleChange}
        value={data.email}
        error={errors.email}
      />
      <TextField
        label='Password'
        type='password'
        name='password'
        onHandleChange={handleChange}
        value={data.password}
        error={errors.password}
      />
      {
        loginError ? <p className='text-danger'>{loginError}</p> : null
      }
      <button
        className='btn btn-primary w-100'
        disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default LoginForm;