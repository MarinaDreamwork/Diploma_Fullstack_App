import React from 'react';
import Logo from '../../app/images/logo.png'
import ButtonLinkGroup from './buttonLinkGroup';

const Header = () => {
  return (
    <header className='header'>
      <div>
        <img className='logo' src={Logo} alt='logo' />
      </div>
      <ButtonLinkGroup />
    </header>
  )
};

export default Header;