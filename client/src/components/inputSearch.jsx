import React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from './searchIcon';
import { useDispatch } from 'react-redux';
import { findGoodsByName } from '../app/store/books';

const InputSearch = ({ onSort, value, onChangeData }) => {
  //const [value, setValue] = useState('');
  //const [data, setData] = useState();
  const dispatch = useDispatch();
  //const valueQuery = useSelector(getSearchQuery());
  const handleClick = () => {
    onSort(dispatch(findGoodsByName(value)));
  };

  const handleChange = ({ target }) => {
    onChangeData(target.value.trim());
  };

  return (
    <div className='container d-flex flex-row input-search-field justify-content-center'>
      <input className='form-control' type='text' name='searchQuery' placeholder="Search..." value={value} onChange={handleChange} />
      <SearchIcon onSortClick={handleClick} />
    </div>
  )
};
InputSearch.propTypes = {
  onSort: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onChangeData: PropTypes.func.isRequired
};

export default InputSearch;