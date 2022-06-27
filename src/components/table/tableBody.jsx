import CloseButton from '../Header/modal/closeButton';

const TableBody = ({ cartContent, onDelete }) => {
  
  return ( 
    <tbody>
        {
          cartContent.map((cartItem, index) => <tr key={cartItem.id}>
            <th scope="row">{index+1}</th>
            <td>{cartItem.author}</td>
            <td>{cartItem.book_title}</td>
            <td>{cartItem.price}</td>
            <td>{cartItem.quantity}</td>
            <td>{cartItem.price*cartItem.quantity}</td>
            <td>
              <CloseButton
                style={{fill: 'white', fontSize: '20px'}}
                onDelete={() => onDelete(cartItem.id)}
              />
            </td>
          </tr>)
        }
    </tbody>
  );
}
 
export default TableBody;