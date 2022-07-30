import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Button from '../../common/styles/button';
import FlexStyleWrapper from '../../common/styles/flexStyleWrapper';

const AdminCard = ({ cardTitle, cardText, buttonColor, buttonPath }) => {
  return (
    <FlexStyleWrapper position='center'>
      <div className="card m-2 shadow" style={{ width: '18rem' }}>
        <div className="card-body text-center">
          <h5 className="card-title">{cardTitle}</h5>
          <p className="card-text">{cardText}</p>
          <NavLink to={buttonPath}>
            <Button
              color={buttonColor}
              description={'Перейти в ' + cardTitle}
            />
          </NavLink>
        </div>
      </div>
    </FlexStyleWrapper>
  );
};

AdminCard.propTypes = {
  cardTitle: PropTypes.string.isRequired,
  cardText: PropTypes.string.isRequired,
  buttonColor: PropTypes.string.isRequired,
  buttonPath: PropTypes.string.isRequired
};

export default AdminCard;