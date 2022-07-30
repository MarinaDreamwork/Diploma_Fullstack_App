import React from 'react';
import PropTypes from 'prop-types';
import AdminCard from './adminCard';

const AdminPanelSection = ({ editSectionTitle, adminData }) => {
  return (
    <div className='d-flex flex-column p-3'>
      <h3 className='text-center'>{editSectionTitle}</h3>
      {
        adminData.map(adminItem => <AdminCard
          key={adminItem.id}
          cardTitle={adminItem.cardTitle}
          cardText={adminItem.cardText}
          buttonColor={adminItem.buttonColor}
          buttonPath={adminItem.buttonPath}
        />)
      }

    </div>
  );
};

AdminPanelSection.propTypes = {
  editSectionTitle: PropTypes.string.isRequired,
  adminData: PropTypes.array.isRequired
};

export default AdminPanelSection;