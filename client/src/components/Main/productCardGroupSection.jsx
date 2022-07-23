import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './productCard';
import _ from 'lodash';
import PaginationSection from './paginationSection';
import { paginate } from '../../app/utils/paginate';
import { usePagination } from '../../app/hooks/usePagination';
import { getAllCategories } from '../../app/store/books';
import { useSelector } from 'react-redux';

const ProductCardGroupSection = ({ data, onDrop, onFilter }) => {
  const { activePage, pageSize, handlePageChange } = usePagination();
  const count = data?.length;
  const categories = useSelector(getAllCategories());
  const [caret, setCaret] = useState(false);
  const [sortedData, setSortedData] = useState(data);
  const directions = ['up', 'down'];

  const bookCrop = paginate(sortedData, activePage, pageSize);

  const handleSelect = ({ target }) => {
    setCaret(prevState => !prevState);
    if (target.classList.value.indexOf('up') !== -1) {
      setSortedData(_.orderBy(data, ['price'], ['asc']));
    } else if (target.classList.value.indexOf('down') !== -1) {
      setSortedData(_.orderBy(data, ['price'], ['desc']));
    }
  };

  const handleFilterByCategory = ({ target }) => {
    onFilter(target.innerText);
  };

  const getClass = (direction) => {
    if (direction === 'down') {
      return caret ? `bi-caret-${direction} m-0` : `bi-caret-${direction}-fill m-0`
    }
    return caret ? `bi-caret-${direction}-fill m-0 ms-3` : `bi-caret-${direction} m-0 ms-3`
  };

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  return (
    <div className='m-3 w-100'>
      <p className='d-flex justify-content-center sort p-2'>Отсортировать по стоимости
        {
          directions.map(dir => <span key={dir}>
            <i className={'bi m-1 ' + getClass(dir)} onClick={handleSelect}></i>
          </span>)
        }
      </p>
      <ul className='d-flex ps-0'>
        {
          categories.map(category => (
            <button
              key={category.id}
              className='btn btn-outline-primary m-1'
              onClick={handleFilterByCategory}
            >
              {category.name}
            </button>
          ))
        }
        <button className='btn btn-outline-warning m-1' onClick={onDrop}>Сбросить фильтр по категориям</button>
      </ul>
      {
        bookCrop.map(item => <ProductCard key={item.id} {...item} />)
      }
      <PaginationSection
        active={activePage}
        itemsCount={count}
        size={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

ProductCardGroupSection.propTypes = {
  data: PropTypes.array.isRequired,
  onDrop: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired
};

export default ProductCardGroupSection;