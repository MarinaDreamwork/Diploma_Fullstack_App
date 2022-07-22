import React from 'react';
import PropTypes from 'prop-types';
import AdminCard from './adminCard';

const AdminReportSection = ({ editSectionTitle }) => {
  return (
    <div className='d-flex flex-column'>
      <h3 className='text-center'>{editSectionTitle}</h3>
      <AdminCard
        cardTitle='Товары'
        cardText='товаров'
        buttonColor='success'
        buttonPath='admin/books_page'
      />
      <AdminCard
        cardTitle='Пользователи'
        cardText='пользователей'
        buttonColor='primary'
        buttonPath='admin/users_page'
      />
      <AdminCard
        cardTitle='Цитаты'
        cardText='цитат'
        buttonColor='warning'
        buttonPath='admin/quotes_page'
      />
    </div>
  );
};

AdminReportSection.propTypes = {
  editSectionTitle: PropTypes.string.isRequired
};

export default AdminReportSection;