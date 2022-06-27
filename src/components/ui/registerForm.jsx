import { useEffect, useState } from "react";
import RadioField from "../common/form/radioField";
import TextField from "../common/form/textField";
import { validator } from '../utils/validator';

const RegisterForm = () => {
  const [data, setData] = useState({ email: '', password: '', sex: 'male' });
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
    if(!isValid) return;
    console.log(data);
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
      <RadioField 
        options={[
          { name: 'Female', value: 'female', id: 1 }, 
          { name: 'Male', value: 'male', id: 2 },
          { name: 'Other', value: 'other', id: 3},
        ]}
        label='Выберете Ваш пол:'
        name='sex'
        onChange={handleChange}
        value={data.sex} 
      />
      <button
        className="btn btn-primary w-100"
        disabled={!isValid}>
          Submit
      </button>
    </form>
  );
};
 
export default RegisterForm;