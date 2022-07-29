import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCalculateCartSumm, clearCartContent } from '../../../app/store/cart';
import Button from '../styles/button';
import { formateNumberToPrice } from '../../../app/utils/formateNumbers';
import FlexStyleWrapper from '../styles/flexStyleWrapper';
import { summInStockQuantity } from '../../../app/store/books';
import { getOrders } from '../../../app/store/orders';

const TableFooter = ({ isCart }) => {
  const dispatch = useDispatch();
  const totalCartAmount = useSelector(getCalculateCartSumm());
  const totalQuantity = useSelector(summInStockQuantity());
  const orders = useSelector(getOrders());

  const totalSales = (data) => {
    return data.reduce((sum, item) => sum + item.totalAmount, 0)
  };

  const totalSoldQuantity = (data) => {
    return data.reduce((sum, item) => sum + item.quantity, 0)
  };

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
              <th scope='row'>{totalSoldQuantity(orders)}</th>
              <th scope='row'>{totalSales(orders)}</th>
            </>

          }
          {
            essence === 'report_remains_page' &&
            <>
              <th scope='row'></th>
              <th scope='row'>{totalQuantity}</th>
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
          <td>{formateNumberToPrice(totalCartAmount)}</td>
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