const Order = () => {
  return ( 
    <div className='border shadow rounded border-light w-50 mb-4 m-auto'>
        <div className='d-flex bg-light justify-content-between p-3'>
            <div>
              <div>
                <p className='fw-bold fs-4'>Заказ от ... дата</p>
              </div>
              <div>
                <span>order number</span>
              </div>
            </div>
            <div>
              <div>
                <span className='fw-bold'>сумма заказа</span>
              </div>
            </div>
        </div>
        <div className='d-flex justify-content-between p-2'>
            <div>
              <p>Доставка Почтой России по адресу: ... </p>
              <span style={{color: 'grey'}}>дата доставки</span>
            </div>
            <div>
              image
              <img />
            </div>
        </div>
      </div>
   );
}
 
export default Order;