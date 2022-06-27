import Logo from '../../images/logo.png'
import ButtonLinkGroup from "./buttonLinkGroup";

const Header = () => {
  return (
    <header className='header'>
      <div>
        <img className='logo' src={Logo} alt='logo'/>
      </div>
      <button>Категории</button>
      <ButtonLinkGroup />
    </header>
  )

}

export default Header;