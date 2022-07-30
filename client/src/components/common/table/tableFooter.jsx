import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCalculateCartSumm, clearCartContent } from '../../../app/store/cart';
import Button from '../styles/button';
import { formateNumberToPrice } from '../../../app/utils/formateNumbers';
import FlexStyleWrapper from '../styles/flexStyleWrapper';
import { summInStockQuantity } from '../../../app/store/books';
import { getTotalSalesAmount, getTotalSoldQuantity } from '../../../app/store/orders';

const TableFooter = ({ isCart }) => {
  const dispatch = useDispatch();
  const totalCartAmount = useSelector(getCalculateCartSumm());
  const totalRemainsQuantity = useSelector(summInStockQuantity());

  const totalSalesAmount = useSelector(getTotalSalesAmount());
  const totalSoldQuantity = useSelector(getTotalSoldQuantity());

  const { essence } = useParams();

  const handleDeleteClick = () => {
    dispatch(clearCartContent());
  };

  if (essence === 'report_remains_page' || essence === 'report_sales_page') {
    return (
      <tfoot>
        <tr>
          <th scope='row'></th>
          <th scope='row'>Итого:</th>
          <th scope='row'></th>
          {
            essence === 'report_sales_page' &&
            <>
              <th scope='row' className='text-center'>{totalSoldQuantity}</th>
              <th scope='row' className='text-center'>{totalSalesAmount}</th>
              <th scope='row' className='text-center'></th>
            </>

          }
          {
            essence === 'report_remains_page' &&
            <>
              <th scope='row'></th>
              <th scope='row' className='text-center'>{totalRemainsQuantity}</th>
            </>
          }
        </tr>
      </tfoot>
    )
  } else {
    return (
      <tfoot>
        <tr>
          <th scope='row'></th>
          <td colSpan='4'>Итоговая стоимость:</td>
          <td className='text-center'>{formateNumberToPrice(totalCartAmount)}</td>
          <td></td>
        </tr>
        {isCart && (
          <tr>
            <th scope='row'></th>
            <td colSpan='6'>
              <FlexStyleWrapper position='around'>
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
              </FlexStyleWrapper>
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