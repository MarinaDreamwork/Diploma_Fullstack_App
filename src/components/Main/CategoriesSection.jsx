import { useBooks } from '../../hooks/useBooks';
const CategoriesSection = () => {
   const { quotes } = useBooks();
 
  return ( 
    <aside className='container__left categories style d-flex flex-column justify-content-center align-items-center'>
      {
        quotes.map(quote => <div key={quote.id} className='p-2'>
          <q className='m-2 quote-content'>{quote.content}</q>
          <p><i>{quote.author}</i></p>
        </div>)
      }
     </aside>
  );
};
 
export default CategoriesSection;