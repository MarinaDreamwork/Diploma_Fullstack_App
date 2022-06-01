import { useEffect, useState } from "react";
import ProductCard from "./productCard";
import { useBooks } from "../../hooks/useBooks";
import _ from "lodash";

const ProductCardGroupSection = () => {
  const [caret, setCaret] = useState(false);
  const { data } = useBooks();
  const [sortedData, setSortedData] = useState(data)
  const directions = ['up', 'down'];

  const handleSelect = ({ target }) => {
    setCaret(prevState => !prevState);
    if(target.classList.value.indexOf('up') !== -1) {
      setSortedData(_.orderBy(data, ['price'], ['asc']));
    } else if(target.classList.value.indexOf('down') !== -1) {
      setSortedData(_.orderBy(data, ['price'], ['desc']));
    }
  }

  const getClass = (direction) => {
    if(direction === 'down') {
      return caret ? `bi-caret-${direction} m-0` : `bi-caret-${direction}-fill m-0`
    }
    return caret ? `bi-caret-${direction}-fill m-0 ms-3` : `bi-caret-${direction} m-0 ms-3`  
  };
  useEffect(() => {
    console.log('sortedBy from useEffect', sortedData);
  }, [sortedData])

  return ( 
    <div className='m-3 w-100'>
      <p className='d-flex justify-content-center sort p-2'>Отсортировать по стоимости 
      {
        directions.map(dir => <span key={dir}>
          <i className={'bi m-1 ' + getClass(dir)} onClick={handleSelect}></i>
        </span>)
      }
      </p>
      {
        sortedData.map(item => <ProductCard key={item.id} props={item}/>)
      }
    </div>
  );
}
 
export default ProductCardGroupSection;