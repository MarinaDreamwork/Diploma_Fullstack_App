import _ from 'lodash';

const PaginationSection = ({ active, itemsCount, size, onPageChange }) => {

  const pageCount = Math.ceil(itemsCount / size);
  if(pageCount === 1) return null;
  const pages = _.range(1, pageCount+1);

  return ( 
    <ul className='justify-content-center pagination'>
      {pages.map(page => (
        <li
          className="page-item"
          key={page}
          active={page === active}
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
 
export default PaginationSection;