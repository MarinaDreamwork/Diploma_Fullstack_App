import SearchIcon from './searchIcon';

const InputSearch = () => {

  return (
    <div className='container d-flex flex-row input-search-field justify-content-center'>
      <input className='input-search' type='text' placeholder="Search" />
      <SearchIcon />
    </div>
  )
}

export default InputSearch;