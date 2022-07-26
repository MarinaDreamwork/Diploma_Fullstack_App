import React from 'react';
import SocialNetwork from './socialNetwork';

const SocialNetworks = () => {
  const names = ['facebook', 'instagram', 'telegram', 'discord', 'skype'];
  return (
    <div className='d-flex justify-content-around'>
      {
        names.map(item => <SocialNetwork key={item} name={item} />)
      }
    </div>
  );
};

export default SocialNetworks;