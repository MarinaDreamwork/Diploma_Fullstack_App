import React from 'react';
import { useSelector } from 'react-redux';
import { getCartContent } from '../../../app/store/cart';
import TableStyleWrapper from '../styles/tableStyleWrapper';
import TableBody from './tableBody';
import TableFooter from './tableFooter';
import TableHeader from './tableHeader';

const Table = () => {
  const content = useSelector(getCartContent());

  return (
    <div className='m-auto'>
      <TableStyleWrapper color='dark' style='table-striped caption-top'>
        <caption
          className='fs-3'
          style={{ color: 'black' }}
        >
          Корзина
        </caption>
        <TableHeader
          isForAdminBoard={false} />
        <TableBody
          content={content}
          isCart={true}
        />
        <TableFooter
          content={content}
          isCart={true}
        />
      </TableStyleWrapper>
    </div>
  );
};

export default Table;