import { useBooks } from "../../hooks/useBooks";
import OrderCard from "./orderCard";

const OrderCardWrapper = () => {
  const { cartContent } = useBooks();
  return ( 
    <>
      {
        cartContent.map((cartContentItem, index) => (
          <OrderCard
            cartContentItem={cartContentItem}
            number={index}
          />
        ))
      }
    </>
  );
}
 
export default OrderCardWrapper;