import CloseButton from "../Header/modal/closeButton";

const Navigation = ({ onCloseBtn, navStatus}) => {
   const categories = ['category1', 'category2', 'category3', 'category4', 'category5', 'category6'];
  return ( 
    <>
      { 
        categories.map((category, index) => {
          return <div key={index} className='p-2'>
            <button className='btn btn-secondary w-100'>{ category }</button>
          </div>
        })
      }
      <CloseButton onCloseBtn={onCloseBtn} navStatus={navStatus}/>
    </>
   );
}
 
export default Navigation;