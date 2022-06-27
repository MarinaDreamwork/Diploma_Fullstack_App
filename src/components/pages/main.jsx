import { useEffect, useState } from "react";
import { useBooks } from "../../hooks/useBooks";
import QuotesSection from "../Main/quotesSection";
import ProductCardGroupSection from "../Main/productCardGroupSection";
import Preloader from "../common/preloader";
import { QuotesProvider } from "../../hooks/useQuotes";

const Main = () => {
  const { data, searchGoodsByName, loadingBooks } = useBooks();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredByCategories, setFilteredByCategories] = useState(data);

   const handleSearchChange = ({ target }) => {
    setSearchQuery(target.value);
  };

  const handleFilterByCategory = ({ target }) => {
    setFilteredByCategories(data.filter(item => item.category === target.innerText));
  };

  const handleDropFilterByCategories = () => setFilteredByCategories(data);

  useEffect(() => {
    setFilteredByCategories(data);
  }, [data]);

  return ( 
    <>
      <div className='container d-flex flex-row input-search-field justify-content-center'>
        <input 
          type='text'
          placeholder='Search...' 
          name='searchQuery'
          onChange={handleSearchChange}
          value={searchQuery}
        />
      </div>
      <main className='container container__main p-0'>
        {
          loadingBooks ?  <Preloader /> : ( 
            <>
              <QuotesProvider>
                <QuotesSection />
              </QuotesProvider>
              <ProductCardGroupSection
                filteredValue = { 
                  searchQuery.length > 0
                  ? searchGoodsByName(searchQuery)
                  : filteredByCategories 
                } 
                onFilter={handleFilterByCategory}
                onDrop={handleDropFilterByCategories}/></>
          )
        }
      </main>
    </>
   );
};
 
export default Main;