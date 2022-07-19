import React from 'react';
import { useSelector } from 'react-redux';
import { getCartContent } from '../../../app/store/cart';
import TableBody from './tableBody';
import TableFooter from './tableFooter';
import TableHeader from './tableHeader';

const Table = () => {
  const cartContent = useSelector(getCartContent());

  return (
    <div className='m-auto'>
      <table className='table table-dark table-striped caption-top'>
        <caption
          className='fs-3'
          style={{ color: 'black' }}
        >
          Корзина
        </caption>
        <TableHeader
          isForAdminBoard={false} />
        <TableBody
          cartContent={cartContent}
          isCart={true}
        />
        <TableFooter
          cartContent={cartContent}
          isCart={true}
        />
      </table>
    </div>
  );
};

export default Table;