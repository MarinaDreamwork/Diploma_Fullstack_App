import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const CategoriesPage = ({ author, src, description, id }) => {
  return (

    <div className="col">
      <NavLink to={`/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
        <div className="card shadow">
          <img src={src} style={{ height: '100px', objectFit: 'cover' }} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{author}</h5>
            <p className="card-text" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{description}</p>
          </div>
        </div>
      </NavLink>
    </div >);
};

CategoriesPage.propTypes = {
  author: PropTypes.string,
  src: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string
};

export default CategoriesPage;