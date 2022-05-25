import { useState } from "react";
import Header from "./components/Header/header";
import CategoriesSection from "./components/Main/CategoriesSection";
import InputSearch from "./components/inputSearch";
import ProductCardGroupSection from "./components/Main/productCardGroupSection";

const App = () => {

   return (
    <div className='container-'>    
      <Header />
      <InputSearch />
      <main className='container container__main p-0'>
        <CategoriesSection />
        <ProductCardGroupSection />
      </main>
    </div>
   )
}

export default App;