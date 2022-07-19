import React, { useEffect, useState } from 'react';
import ProductCardGroupSection from '../Main/productCardGroupSection';
import Preloader from '../common/preloader';
import { useSelector } from 'react-redux';
import { getBooks, getBooksLoadingStatus } from '../../app/store/books';
import Quotes from '../Main/quotes';
import { PaginationProvider } from '../../app/hooks/usePagination';
import QuotesLoader from '../HOC/quotesLoader';
//import { getCurrentUser } from '../../app/store/users';
//import { getAddressById } from '../../app/store/address';

const Main = () => {
  const [queryValue, setQueryValue] = useState('');
  const data = useSelector(getBooks());
  const isLoadingBooks = useSelector(getBooksLoadingStatus())
  const [displayItems, setDisplayItems] = useState(data);
  //const currentUser = useSelector(getCurrentUser());
  //const dispatch = useDispatch();

  const handleSearchChange = ({ target }) => {
    setQueryValue(target.value);
    setDisplayItems(data.filter(item => item.book_title.toLowerCase().indexOf(target.value.toLowerCase()) !== -1));
  };

  const handleFilterByCategory = (categoryName) => {
    setDisplayItems(data.filter(i => i.category === categoryName));
  };

  const handleDropFilterByCategories = () => setDisplayItems(data);

  useEffect(() => {
    if (!isLoadingBooks) {
      setDisplayItems(data);
    }
    // if (currentUser?.length > 0) {
    //   dispatch(getAddressById(addressId));
    // }
  }, []);

  return (
    <>
      <div className='container d-flex flex-row input-search-field justify-content-center'>
        <input
          type='text'
          placeholder='Поиск товара по названию'
          name='searchQuery'
          onChange={handleSearchChange}
          value={queryValue}
        />
      </div>
      <main className='container container__main p-0'>
        {
          isLoadingBooks ? <Preloader /> : (
            <>
              <QuotesLoader>
                <Quotes />
              </QuotesLoader>
              <PaginationProvider>
                <ProductCardGroupSection
                  data={displayItems}
                  onDrop={handleDropFilterByCategories}
                  onFilter={handleFilterByCategory}
                />
              </PaginationProvider>
            </>
          )
        }
      </main>
    </>
  );
};

export default Main;