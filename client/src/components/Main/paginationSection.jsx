import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const PaginationSection = ({
  active,
  itemsCount,
  size,
  onPageChange
}) => {

  const pageCount = Math.ceil(itemsCount / size);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <ul className='justify-content-center pagination'>
      {pages.map(page => (
        <li
          className={'page-item' + (page === active ? ' active' : '')}
          key={page}
        >
          <a
            className="page-link"
            href="#"
            onClick={() => onPageChange(page)}>
            {page}
          </a>
        </li>
      ))}
    </ul>
  );
};

PaginationSection.propTypes = {
  active: PropTypes.number.isRequired,
  itemsCount: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default PaginationSection;