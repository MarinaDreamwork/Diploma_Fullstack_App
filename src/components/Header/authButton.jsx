import { NavLink } from "react-router-dom";

const AuthButton = () => {
  return <NavLink to='/login' className='auth btn btn-secondary'>Вход/Регистрация</NavLink>;
}
 
export default AuthButton;