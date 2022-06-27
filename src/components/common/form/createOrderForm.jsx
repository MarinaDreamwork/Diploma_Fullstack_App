import { useState } from "react";
import  Table  from "../../table/table";
import { NavLink, useHistory } from "react-router-dom";
import { useBooks } from "../../../hooks/useBooks";
import TextField from "./textField";
import TableHeader from "../../table/tableHeader";
import TableBody from "../../table/tableBody";
import OrderCardWrapper from "../orderCardWrapper";

const CreateOrderForm = () => {
  const history = useHistory();
  const { clearCartContent, cartContent } = useBooks();
  const [data, setData] = useState({});
  const handleChange = ({ target }) => {
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // здесь данные будут переданы в БД
    console.log('data', data);
    setData(prevState=> ({
      ...prevState,
      orders: []
    }))
    
    clearCartContent();
    history.push('/my_orders/orders');
  };

  return (
    <div className='d-flex flex-column justify-content-center m-auto'>
      <form onSubmit={handleSubmit} className='m-3'>
        <TextField
          label='Ваше имя:'
          type='text'
          name='name'
          value={data.name}
          onHandleChange={handleChange}
          error={data.error}
        />
         <TextField
          label='Ваш email:'
          type='text'
          name='email'
          value={data.email}
          onHandleChange={handleChange}
          error={data.error}
        />
        <TextField
          label='Адрес доставки:'
          type='text'
          name='address'
          value={data.address}
          onHandleChange={handleChange}
          error={data.error}
        />
        {/* подумать над формой... в data не добавляется */}
        {/* <OrderCardWrapper 
          name='order'
          value={data.order} 
        /> */}
        {
          cartContent.map(i => <TextField />)
        }
        <button className='btn btn-secondary d-flex justify-content-center'>
          Отправить заказ на обработку
        </button>
      </form>
    </div>
  );
};
 
export default CreateOrderForm;