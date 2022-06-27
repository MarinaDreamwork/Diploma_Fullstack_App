import { useBooks } from '../../hooks/useBooks';
import TableBody from './tableBody';
import TableFooter from './tableFooter';
import TableHeader from './tableHeader';

const Table = () => {
  const { cartContent, deleteCartItem } = useBooks();
  return ( 
    <div className='m-auto'>
      <table className='table table-dark table-striped caption-top'>
        <caption
          className='fs-3'
          style={{color: 'black'}}
        >
          Корзина
        </caption>
        <TableHeader />
        <TableBody
          cartContent={cartContent}
          onDelete={deleteCartItem}
        />
        <TableFooter
          cartContent={cartContent}
        />
      </table>
    </div>
  );
}
 
export default Table;