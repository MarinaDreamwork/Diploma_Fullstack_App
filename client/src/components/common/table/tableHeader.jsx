import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

const TableHeader = ({ isForAdminBoard }) => {
  const params = useParams();
  const { essence } = params;
  console.log('params', params);
  if (essence === 'users_page') {
    return (
      <thead>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Email</th>
          <th scope='col'>Имя</th>
          <th scope='col'>Пол</th>
          <th scope='col'>Адрес: индекс</th>
          <th scope='col'>Адрес: улица</th>
          <th scope='col' className='text-center'>Адрес: №дома/квартиры</th>
          <th scope='col'></th>
        </tr>
      </thead>
    )
  } else if (essence === 'quotes_page') {
    return (
      <thead>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Автор</th>
          <th scope='col'>Цитата</th>
          <th></th>
        </tr>
      </thead>
    )
  } else if (essence === 'report_remains_page') {
    return (
      <thead>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Артикул</th>
          <th scope='col'>Название товара</th>
          <th scope='col' className='text-center'>Единицы измерения</th>
          <th scope='col' className='text-center'>Остатки на указанную дату</th>
        </tr>
      </thead>
    )
  } else if (essence === 'report_sales_page') {
    return (
      <thead>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Артикул</th>
          <th scope='col'>Название товара</th>
          <th scope='col' className='text-center'>Количество</th>
          <th scope='col' className='text-center'>Продажи</th>
          <th scope='row' className='text-center'>% от продаж</th>
        </tr>
      </thead>
    )
  } else {
    return (
      <thead>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Автор</th>
          <th scope='col'>Название книги</th>
          <th scope='col' className='text-center'>Стоимость, ₽</th>
          {
            isForAdminBoard ? (
              <>
                <th scope='col' className='text-center'>Остаток товара</th>
                <th scope='col' className='text-center'>Артикул</th>
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
  }
}

TableHeader.propTypes = {
  isForAdminBoard: PropTypes.bool
};

export default TableHeader;