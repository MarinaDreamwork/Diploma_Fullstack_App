import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCalculateCartSumm, clearCartContent } from '../../../app/store/cart';
import Button from '../styles/button';
import { formateNumberToPrice } from '../../../app/utils/formateNumbers';

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
          <td>{formateNumberToPrice(totalCartAmount)}</td>
          <td></td>
        </tr>
        {isCart && (
          <tr>
            <th scope='row'></th>
            <td colSpan='6'>
              <div className='d-flex justify-content-around'>
                <Button
                  style={{ padding: '0.5rem', margin: '0.25rem' }}
                  color='outline-danger'
                  onClick={handleDeleteClick}
                  description='Отменить оформление заказа'
                />
                <NavLink to='/create_order'>
                  <Button
                    color='outline-success'
                    style={{ padding: '0.5rem', margin: '0.25rem' }}
                    description='Продолжить оформление заказа'
                  />
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