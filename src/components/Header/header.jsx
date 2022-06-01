import { useState } from "react";
import Navigation from "../Main/navigation";
import AuthButton from "./authButton";
import Logo from '../../images/logo.png'

const Header = () => {
  const [navStatus, setNavStatus] = useState(false);
  const handleClick = () => {
    setNavStatus(prevState => !prevState);
  }
  return (
    <header className='header'>
      <div>
        <img className='logo' src={Logo} alt='logo'/>
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