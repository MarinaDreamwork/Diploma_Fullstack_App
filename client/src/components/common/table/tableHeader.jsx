import React from 'react';
import PropTypes from 'prop-types';

const TableHeader = ({ isForAdminBoard }) => {
  return (
    <thead>
      <tr>
        <th scope='col'>#</th>
        <th scope='col'>Автор</th>
        <th scope='col'>Название книги</th>
        <th scope='col'>Стоимость, ₽</th>
        {
          isForAdminBoard ? (
            <>
              <th scope='col'>Артикул</th>
              <th scope='col'></th>
            </>
          ) : (
            <>
              <th scope='col'>Количество, шт</th>
              <th scope='col'>Общая стоимость, ₽</th>
              <th scope='col'></th>
            </>
          )
        }
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  isForAdminBoard: PropTypes.bool.isRequired
};

export default TableHeader;