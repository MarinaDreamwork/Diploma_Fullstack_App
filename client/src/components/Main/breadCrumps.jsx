import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const BreadCrumps = ({ category, subCategory, subSubCategory }) => {
  return (
    <div className='d-flex w-100 m-2 p-2'>
      <NavLink
        to={`/genres/${category}`}
        className='path-text'>
        {category}
      </NavLink>
      {subCategory && <span className='m-0 p-0 ps-2 pe-2 fw-bold '>&gt;</span>}
      <NavLink
        className='path-text'
        to={`/genres/${category}/${subCategory}`}>
        {subCategory}
      </NavLink>
      {subSubCategory && <span className='m-0 p-0 ps-2 pe-2 fw-bold '>&gt;</span>}
      <NavLink
        className='path-text'
        to={`/genres/${category}/${subCategory}/${subSubCategory}`}>
        {subSubCategory}
      </NavLink>
    </div>);
};
BreadCrumps.propTypes = {
  category: PropTypes.string,
  subCategory: PropTypes.string,
  subSubCategory: PropTypes.string
};

export default BreadCrumps;