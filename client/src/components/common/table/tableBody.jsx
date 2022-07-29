import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseButton from '../../Header/modal/closeButton';
import PropTypes from 'prop-types';
import EditButton from '../editButton';
import { NavLink, useParams } from 'react-router-dom';
import { deleteItem } from '../../../app/store/books';
import { formateNumberToPrice } from '../../../app/utils/formateNumbers';
import { removeUser } from '../../../app/store/users';
import { getOrders } from '../../../app/store/orders';

const TableBody = ({ content, isCart, isAdmin }) => {
  const orders = useSelector(getOrders());
  console.log('orders', orders);

  const dispatch = useDispatch();
  const params = useParams();
  const { essence } = params;

  const getSalesDataById = (id, data) => {
    const filteredItem = data.filter(item => item.goodsId === id);
    console.log('filtered', filteredItem);
    if (filteredItem) {
      const salesData = filteredItem.reduce((sum, item) => sum + item.totalAmount, 0);
      return salesData;
    } else {
      return 0;
    }
  };

  const getQuantityDataById = (id, data) => {
    const fileredItem = data.filter(item => item.goodsId === id);
    if (fileredItem) {
      const salesData = fileredItem.reduce((sum, item) => sum + item.quantity, 0);
      return salesData;
    } else {
      return 0;
    }
  };




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
            <td>{user.address.appartment}</td>
            <td>
              {isAdmin &&
                <CloseButton
                  style={{ fill: 'white', fontSize: '20px' }}
                  onDelete={() => dispatch(removeUser(user._id))}
                />
              }
              {
                isAdmin && (
                  <NavLink to={`/admin/${essence}/${user._id}/edit`}>
                    <EditButton />
                  </NavLink>
                )
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
            <td>шт.</td>
            <td>{cartItem.inStock}</td>
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
            <td>{getQuantityDataById(cartItem._id, orders)}</td>
            <td>{getSalesDataById(cartItem._id, orders)}</td>
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
            <td className='text-center'>{formateNumberToPrice(cartItem.price)}</td>
            {
              isAdmin ? (
                <>
                  <td className='text-center'>{cartItem.inStock}</td>
                  <td>{cartItem.articleNumber}</td>
                </>
              ) : (<>
                <td>{cartItem.quantity}</td>
                <td className='text-center'>{formateNumberToPrice(cartItem.price * cartItem.quantity)}</td>
              </>)
            }
            <td>
              {(isCart || isAdmin) && (
                <CloseButton
                  style={{ fill: 'white', fontSize: '20px' }}
                  onDelete={() => dispatch(deleteItem(cartItem._id))}
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