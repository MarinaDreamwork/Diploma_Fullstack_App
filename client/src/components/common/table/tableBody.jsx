import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseButton from '../../Header/modal/closeButton';
import PropTypes from 'prop-types';
import EditButton from '../editButton';
import { NavLink, useParams } from 'react-router-dom';
//import { formateNumberToPrice } from '../../../app/utils/formateNumbers';
import { removeUser } from '../../../app/store/users';
import { getOrders, getTotalSalesAmount } from '../../../app/store/orders';
import { calculatePercentage, getQuantityDataById, getSalesDataById } from '../../../app/utils/calculate';
import { removeItemFromCart } from '../../../app/store/cart';

const TableBody = ({ content, isCart, isAdmin }) => {

  const dispatch = useDispatch();
  const orders = useSelector(getOrders());
  const totalSalesAmount = useSelector(getTotalSalesAmount());
  //const totalQuantity = useSelector(getTotalSoldQuantity());
  const params = useParams();
  const { essence } = params;

  if (essence === 'users_page') {
    return (
      <tbody>
        {
          content.map((user, index) => <tr key={user._id}>
            <th scope="row">{index + 1}</th>
            <td>{user.email}</td>
            <td>{user.name}</td>
            <td>{user.sex}</td>
            <td>{user.address.zip}</td>
            <td>{user.address.street}</td>
            <td className='text-center'>{user.address.appartment}</td>
            <td>
              {isAdmin &&
                <>
                  <CloseButton
                    style={{ fill: 'white', fontSize: '20px' }}
                    onDelete={() => dispatch(removeUser(user._id))}
                  />
                  <NavLink to={`/admin/${essence}/${user._id}/edit`}>
                    <EditButton />
                  </NavLink>
                </>
              }
            </td>
          </tr>)
        }
      </tbody>
    )
  } else if (essence === 'quotes_page') {
    return (
      <tbody>
        {
          content.map((quote, index) => <tr key={quote._id}>
            <th scope="row">{index + 1}</th>
            <td>{quote.author}</td>
            <td>{quote.content}</td>
            <td><NavLink to={`/admin/${essence}/${quote._id}/edit`}>
              <EditButton />
            </NavLink></td>
          </tr>)
        }
      </tbody>
    )
  } else if (essence === 'report_remains_page') {
    return (
      <tbody>
        {
          content.map((cartItem, index) => <tr key={cartItem._id}>
            <th scope="row">{index + 1}</th>
            <td>{cartItem.articleNumber}</td>
            <td>{cartItem.book_title}</td>
            <td className='text-center'>шт.</td>
            <td className='text-center'>{cartItem.inStock}</td>
          </tr>)
        }
      </tbody>
    )
  } else if (essence === 'report_sales_page') {
    return (
      <tbody>
        {
          content.map((cartItem, index) => <tr key={cartItem._id}>
            <th scope="row">{index + 1}</th>
            <td>{cartItem.articleNumber}</td>
            <td>{cartItem.book_title}</td>
            <td className='text-center'>{getQuantityDataById(cartItem._id, orders)}</td>
            <td className='text-center'>{getSalesDataById(cartItem._id, orders)}</td>
            <td className='text-center'>{calculatePercentage(getSalesDataById(cartItem._id, orders), totalSalesAmount)}</td>
          </tr>
          )}
        {

        }
      </tbody>
    )
  } else {
    return (
      <tbody>
        {
          content.map((cartItem, index) => <tr key={cartItem._id}>
            <th scope="row">{index + 1}</th>
            <td>{cartItem.author}</td>
            <td>{cartItem.book_title}</td>
            <td className='text-center'>{cartItem.price}</td>
            {
              isAdmin ? (
                <>
                  <td className='text-center'>{cartItem.inStock}</td>
                  <td className='text-center'>{cartItem.articleNumber}</td>
                </>
              ) : (<>
                <td className='text-center'>{cartItem.quantity}</td>
                <td className='text-center'>{cartItem.price * cartItem.quantity}</td>
              </>)
            }
            <td>
              {(isCart || isAdmin) && (
                <CloseButton
                  style={{ fill: 'white', fontSize: '20px' }}
                  onDelete={() => dispatch(removeItemFromCart(cartItem._id))}
                />
              )}
              {
                isAdmin && (
                  <NavLink to={`/admin/${essence}/${cartItem._id}/edit`}>
                    <EditButton />
                  </NavLink>
                )
              }
            </td>
          </tr>)
        }
      </tbody>
    );
  }
};

TableBody.propTypes = {
  content: PropTypes.array.isRequired,
  isCart: PropTypes.bool,
  isAdmin: PropTypes.bool
};

export default TableBody;