import { NavLink } from "react-router-dom";
import { useBooks } from "../../hooks/useBooks";

const TableFooter = () => {
  const { calculateCartSumm, clearCartContent } = useBooks();
  const totalCartAmount = calculateCartSumm();
  const handleClick = () => {
    
  };
  return ( 
    <tfoot>
      <tr>
        <th scope='row'></th>
        <td colSpan='4'>Итоговая стоимость:</td>
        <td>{totalCartAmount}</td>
        <td></td>
      </tr>
      <tr>
        <th scope='row'></th>
        <td colSpan='6'>
          <div className='d-flex justify-content-around'>
          <button
            className='p-2 m-1 btn btn-outline-danger'
            onClick={clearCartContent}>
              Отменить оформление заказа
          </button>
          <NavLink to='/create_order'>
            <button
              className='p-2 m-1 btn btn-outline-success'
              onClick={handleClick}>
              Продолжить оформление заказа
            </button>
          </NavLink>
          </div>
        </td>
      </tr>
    </tfoot>
   );
}
 
export default TableFooter;