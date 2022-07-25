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
          <th scope='col'>Пароль</th>
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
          <th scope='col'>id цитаты</th>
          <th scope='col'>Цитата</th>
          <th></th>
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
  isForAdminBoard: PropTypes.bool.isRequired
};

export default TableHeader;