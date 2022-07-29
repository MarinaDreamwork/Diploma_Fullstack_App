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
          <th scope='col'>Адрес: №дома/квартиры</th>
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
          <th scope='col'>Единицы измерения</th>
          <th scope='col'>Остатки на указанную дату</th>
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
          <th scope='col'>Количество</th>
          <th scope='col'>Продажи</th>
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
          <th scope='col'>Стоимость, ₽</th>
          {
            isForAdminBoard ? (
              <>
                <th scope='col'>Остаток товара</th>
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
  }
}

TableHeader.propTypes = {
  isForAdminBoard: PropTypes.bool
};

export default TableHeader;