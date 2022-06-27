import { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from '../utils/validator';

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '' });
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
      <button
        className="btn btn-primary w-100"
        disabled={!isValid}>
          Submit
      </button>
    </form>
  );
};

export default LoginForm;