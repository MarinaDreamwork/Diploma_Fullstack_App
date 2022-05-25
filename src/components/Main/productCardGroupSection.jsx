import { useState } from "react";
import CaretDown from "./carets/caretDown";
import CaretUp from "./carets/caretUp";
import CaretDownFill from "./carets/caretDownFill";
import CaretUpFill from "./carets/caretUpFill";
import ProductCard from "./productCard";

const ProductCardGroupSection = () => {
  const [caretDown, setCaretDown] = useState(false);
  const [caretUp, setCaretUp] = useState(false);
  const handleDownSelect = () => {
    setCaretDown(prevState => !prevState);
  }
   const handleUpSelect = () => {
    setCaretUp(prevState => !prevState);
  }
  return ( 
    <div className='m-3 w-100'>
      <p className='d-flex justify-content-center sort p-2'>Отсортировать по стоимости 
        {
          caretDown ? 
            <CaretDownFill onSelect={handleDownSelect}/> : 
            <CaretDown onSelect={handleDownSelect}/>
        } 
        {
          caretUp ? 
            <CaretUpFill onSelect={handleUpSelect}/> : 
            <CaretUp onSelect={handleUpSelect}/>
        }
      </p>
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
}
 
export default ProductCardGroupSection;