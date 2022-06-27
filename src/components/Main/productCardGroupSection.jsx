import { useState } from "react";
import ProductCard from "./productCard";
import { useBooks } from "../../hooks/useBooks";
import _ from "lodash";
import PaginationSection from "./paginationSection";
import { paginate } from "../utils/paginate";

const ProductCardGroupSection = ({ filteredValue, onFilter, onDrop }) => {
  console.log('value', filteredValue);

  const count = filteredValue.length;
  const pageSize = 3;
  const [activePage, setActivePage] = useState(1);

  const { categories } = useBooks();
  const [caret, setCaret] = useState(false);
  const [sortedData, setSortedData] = useState(filteredValue)
  const directions = ['up', 'down'];

  const bookCrop = paginate(filteredValue, activePage, pageSize);

  const handleSelect = ({ target }) => {
    setCaret(prevState => !prevState);
    if(target.classList.value.indexOf('up') !== -1) {
      setSortedData(_.orderBy(filteredValue, ['price'], ['asc']));
    } else if(target.classList.value.indexOf('down') !== -1) {
      setSortedData(_.orderBy(filteredValue, ['price'], ['desc']));
    }
  }

  const getClass = (direction) => {
    if(direction === 'down') {
      return caret ? `bi-caret-${direction} m-0` : `bi-caret-${direction}-fill m-0`
    }
    return caret ? `bi-caret-${direction}-fill m-0 ms-3` : `bi-caret-${direction} m-0 ms-3`  
  };

  const handlePageChange = (pageIndex) => {
    console.log('pageIndex', pageIndex);
    setActivePage(pageIndex);
  }

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
            onClick={onFilter}
          >
            {category.name}
          </button>
        ))
      }
        <button className='btn btn-outline-warning m-1' onClick={onDrop}>Сбросить фильтр по категориям</button>
      </ul>
      {
        (bookCrop || sortedData).map(item => <ProductCard key={item.id} item={item}/>)
      }
      <PaginationSection
        active={activePage}
        itemsCount={count}
        size={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
 
export default ProductCardGroupSection;