import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthErrors, getCurrentUser, updateUserData } from '../../app/store/users';
import AddressField from '../common/form/adressField';
import RadioField from '../common/form/radioField';
import TextField from '../common/form/textField';
import { validator } from '../../app/utils/validator';
import { useHistory } from 'react-router-dom';

const EditUserPage = () => {
  const errorLogIn = useSelector(getAuthErrors());
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser());
  const [data, setData] = useState({
    email: currentUser.email,
    name: currentUser.name,
    sex: currentUser.sex,
    // city: '',
    street: currentUser.address.street,
    appartment: currentUser.address.appartment,
    zip: currentUser.address.zip
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
    // данные по созданию user и address передаются на сервер и локальный стейт очищается
    dispatch(updateUserData({
      ...data,
      address: { street: data.street, appartment: data.appartment, zip: data.zip },
      userId: currentUser.userId
    }));
    // dispatch(createNewAddress(data)); - адрес отдельно не будем делать
    history.goBack();
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
    },
    name: {
      isRequired: {
        message: 'Имя обязательно для заполнения'
      }
    },
    street: {
      isRequired: {
        message: 'Улица обязательна для заполнения'
      }
    },
    appartment: {
      isRequired: {
        message: '№ дома/квартиры обязательны для заполнения'
      }
    },
    zip: {
      isRequired: {
        message: 'Улица обязательна для заполнения'
      }
    },
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
      <div className="border rounded m-auto pt-5 ps-5 pe-5 pb-3 mb-5 w-50 bg-light shadow-sm">
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
          />
          <AddressField
            onChange={handleChange}
            valueZip={data.zip}
            valueStreet={data.street}
            valueApp={data.appartment}
            errorStreet={errors.street}
          />
          <button
            className='btn btn-primary w-100'
            disabled={!isValid}>
            Submit
          </button>
          {
            errorLogIn ? <p>{errorLogIn}</p> : null
          }
        </form>
      </div>
    </div>
  );
};

export default EditUserPage;