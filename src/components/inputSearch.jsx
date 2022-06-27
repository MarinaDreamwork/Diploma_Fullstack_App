import { useBooks } from '../hooks/useBooks';
import SearchIcon from './searchIcon';

const InputSearch = ({ onSort, value, onChangeData }) => {
  //const [value, setValue] = useState('');
  //const [data, setData] = useState();
   const { searchGoodsByName } = useBooks();

  const handleClick = () => {
    console.log('goodsByName', searchGoodsByName(value));
    onSort(searchGoodsByName(value));
  };

  const handleChange = ({ target }) => {
    onChangeData(target.value.trim());
  };

  return (
    <div className='container d-flex flex-row input-search-field justify-content-center'>
      <input className='form-control' type='text' name='searchQuery' placeholder="Search..." value={value} onChange={handleChange}/>
      <SearchIcon onSortClick={handleClick}/>
    </div>
  )
}

export default InputSearch;