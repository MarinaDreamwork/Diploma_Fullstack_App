import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import LoginForm from '../ui/loginForm';
import RegisterForm from '../ui/registerForm';

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(type === 'register' ? type : 'login');

  const toggleFormType = () => {
    setFormType(prevState => prevState === 'register' ? 'login' : 'register');
  };

  return (
    <section>
      <div className='container register-form mt-5 mb-5 shadow'>
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
            {formType === 'register' ?
              <>
                <h3 className='p-3'>Register</h3>
                <RegisterForm />
                <p>Уже зарегистрированы?
                  <a
                    className='text-muted text-decoration-none'
                    role='button'
                    onClick={toggleFormType}>
                    {' '} Войти
                  </a>
                </p>
              </> :
              <>
                <h3 className='p-3'>Login</h3>
                <LoginForm />
                <p>Не зарегистрированы?
                  <a
                    className='text-muted text-decoration-none'
                    onClick={toggleFormType}
                    role='button'>
                    {' '} Зарегистрироваться
                  </a>
                </p>
              </>
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;