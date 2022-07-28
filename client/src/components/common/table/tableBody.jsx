import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCartItem } from '../../../app/store/orders';
import CloseButton from '../../Header/modal/closeButton';
import PropTypes from 'prop-types';
import EditButton from '../editButton';
import { NavLink, useParams } from 'react-router-dom';
import { deleteItem } from '../../../app/store/books';
import { formateNumberToPrice } from '../../../app/utils/formateNumbers';
import { removeUser } from '../../../app/store/users';

const TableBody = ({ cartContent, isCart, isAdmin }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const { essence } = params;

  if (essence === 'users_page') {
    return (
      <tbody>
        {
          cartContent.map((user, index) => <tr key={user._id}>
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
          cartContent.map((cartItem, index) => <tr key={cartItem._id}>
            <th scope="row">{index + 1}</th>
            <td>{cartItem.author}</td>
            <td>{cartItem._id}</td>
            <td>{cartItem.content}</td>
            <td><NavLink to={`/admin/${essence}/${cartItem._id}/edit`}>
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
          cartContent.map((cartItem, index) => <tr key={cartItem._id}>
            <th scope="row">{index + 1}</th>
            <td>{cartItem._id}</td>
            <td>{cartItem.book_title}</td>
            <td>шт.</td>
            <td>{cartItem.inStock}</td>
          </tr>)
        }
      </tbody>
    )
  } else {
    return (
      <tbody>
        {
          cartContent.map((cartItem, index) => <tr key={cartItem._id}>
            <th scope="row">{index + 1}</th>
            <td>{cartItem.author}</td>
            <td>{cartItem.book_title}</td>
            <td>{formateNumberToPrice(cartItem.price)}</td>
            {
              isAdmin ? (
                <td>{cartItem.articleNumber}</td>
              ) : (<>
                <td>{cartItem.quantity}</td>
                <td>{formateNumberToPrice(cartItem.price * cartItem.quantity)}</td>
              </>)
            }
            <td>
              {(isCart || isAdmin) && (
                <CloseButton
                  style={{ fill: 'white', fontSize: '20px' }}
                  onDelete={isAdmin ?
                    () => dispatch(deleteItem(cartItem._id)) :
                    () => dispatch(deleteCartItem(cartItem._id))}
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
  cartContent: PropTypes.array.isRequired,
  isCart: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool
};

export default TableBody;