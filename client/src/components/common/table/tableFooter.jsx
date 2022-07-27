import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCalculateCartSumm, clearCartContent } from '../../../app/store/cart';

const TableFooter = ({ isCart }) => {
  const dispatch = useDispatch();
  const totalCartAmount = useSelector(getCalculateCartSumm());
  const { essence } = useParams();

  const handleDeleteClick = () => {
    dispatch(clearCartContent());
  };

  if (essence === 'report_remains_page') {
    return (
      <tfoot>
        <tr>
          <th scope='row'></th>
          <th scope='row'>Итого остатков:</th>
          <th scope='row'></th>
          <th scope='row'></th>
          <th scope='row'>итоговое кол-во, соберем reduce</th>
        </tr>
      </tfoot>
    )
  } else {
    return (
      <tfoot>
        <tr>
          <th scope='row'></th>
          <td colSpan='4'>Итоговая стоимость:</td>
          <td>{totalCartAmount}</td>
          <td></td>
        </tr>
        {isCart && (
          <tr>
            <th scope='row'></th>
            <td colSpan='6'>
              <div className='d-flex justify-content-around'>
                <button
                  className='p-2 m-1 btn btn-outline-danger'
                  onClick={handleDeleteClick}>
                  Отменить оформление заказа
                </button>
                <NavLink to='/create_order'>
                  <button
                    className='p-2 m-1 btn btn-outline-success'>
                    Продолжить оформление заказа
                  </button>
                </NavLink>
              </div>
            </td>
          </tr>
        )}
      </tfoot>
    );
  }
};

TableFooter.propTypes = {
  isCart: PropTypes.bool.isRequired
};

export default TableFooter;