import BooksImage from '../../images/books.png';

const ProductCard = () => {
  return ( 
    <div className='card-wrapper d-flex m-2 mb-3 w-100'>
      <div className='col-2 d-flex justify-content-center me-2'>
        <img src={BooksImage} alt='book' className='books-image card-style' />
      </div>
      <div className='product-card-info card-style col-5'>
        <h4>Наименование товара</h4>
        <p>id товара</p>
        <p>Стоимость</p>
      </div>
      <div className='col-4'>
        <button className='btn btn-dark card-style'>Открыть карточку</button>
        <p>id товара</p>
      </div>
    </div>
  );
}
 
export default ProductCard;