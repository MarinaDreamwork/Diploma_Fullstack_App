import { useState } from "react";
import Navigation from "../Main/navigation";
import SearchPage from "../searchPage";
import AuthButton from "./authButton";
import style from './header.module.css';

const Header = (props) => {
  const [navStatus, setNavStatus] = useState(false);
  const handleClick = () => {
    setNavStatus(prevState => !prevState);
  }
  return (
    <header className={style.header}>
      <div className='logo'>
        LOGO
      </div>
      <nav className='navbar'>
        { navStatus ? <Navigation onCloseBtn={handleClick} navStatus={navStatus}/> : <button onClick={handleClick}>Categories</button> }
      </nav>
      {/* <SearchPage props={props}/> */}
      <AuthButton />
    </header>
  )

}

export default Header;