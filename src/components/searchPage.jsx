import SearchIcon from './searchIcon';
import style from './searchPage.module.css';

const SearchPage = () => {
    
  return (
    <>
      <div className={style.search}>
        <button className={style.button_search}>
          <SearchIcon />
        </button>
      </div>
    </>
  )
}

export default SearchPage;