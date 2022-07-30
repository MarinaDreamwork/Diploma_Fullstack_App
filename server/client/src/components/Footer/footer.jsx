import React from 'react';
import FooterColumn from './footerColumn';
import SocialNetworks from './socialNetworks';

const Footer = () => {
  const footerInfo = [
    { id: 1, title: 'О нас', content: 'Наш интернет-магазин книг появился в 2006 году и с тех пор дарит радость всем любителям чтения.' },
    { id: 2, title: 'Социальные сети', content: <SocialNetworks /> },
    { id: 3, title: 'Наш адрес', content: 'г. Москва, ул. Горбунова, д. 154' }
  ]
  return (
    <footer className='container__footer'>
      <div className='d-flex m-auto'>
        {
          footerInfo.map(item => <FooterColumn key={item.id} {...item} />)
        }
      </div>
    </footer>
  );
}

export default Footer;