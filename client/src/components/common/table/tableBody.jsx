import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCartItem } from '../../../app/store/orders';
import CloseButton from '../../Header/modal/closeButton';
import PropTypes from 'prop-types';
import EditButton from '../editButton';
import { NavLink } from 'react-router-dom';
import { deleteItem } from '../../../app/store/books';

const TableBody = ({ cartContent, isCart, isAdmin }) => {
  const dispatch = useDispatch();

  return (
    <tbody>
      {
        cartContent.map((cartItem, index) => <tr key={cartItem.id}>
          <th scope="row">{index + 1}</th>
          <td>{cartItem.author}</td>
          <td>{cartItem.book_title}</td>
          <td>{cartItem.price}</td>
          {
            isAdmin ? (
              <td>{cartItem.id}</td>
            ) : (<>
              <td>{cartItem.quantity}</td>
              <td>{cartItem.price * cartItem.quantity}</td>
            </>)
          }
          <td>
            {(isCart || isAdmin) && (
              <CloseButton
                style={{ fill: 'white', fontSize: '20px' }}
                onDelete={isAdmin ?
                  () => dispatch(deleteItem(cartItem.id)) :
                  () => dispatch(deleteCartItem(cartItem.id))}
              />
            )}
            {
              isAdmin && (
                <NavLink to={`/admin/${cartItem.id}/edit`}>
                  <EditButton />
                </NavLink>
              )
            }
          </td>
        </tr>)
      }
    </tbody>
  );
};

TableBody.propTypes = {
  cartContent: PropTypes.array.isRequired,
  isCart: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
};

export default TableBody;