import { useHistory } from "react-router-dom";
import { useBooks } from "../../hooks/useBooks";
import Table from "../table/table";

const MyCart = () => {
  const history = useHistory();
  const { cartContent } = useBooks();
  const handleBackToMainPage = () => {
    history.push('/');
  };
  return (
    <>
      <div className='d-flex m-4 justify-content-center'>
        <button className='btn btn-success' onClick={handleBackToMainPage}>Выбрать товары</button>
      </div>
      { cartContent.length === 0
        ? <h3 className='m-auto p-3'>В корзине товаров нет</h3>
        : <Table /> 
      }
    </>
  );
};
 
export default MyCart;