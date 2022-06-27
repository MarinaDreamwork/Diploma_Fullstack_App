import { useQuotes } from '../../hooks/useQuotes';
const QuotesSection = () => {
  const { quotes } = useQuotes();
 
  return ( 
    <aside className='container__left Quotes style d-flex flex-column justify-content-center align-items-center'>
      {
        quotes.map(quote => (
          <div
            key={quote.id}
            className='p-2'>
              <q
                className='m-2 quote-content'>
                  {quote.content}
                  {quote.id}
              </q>
              <p>
                <i>{quote.author}</i>
              </p>
          </div>))
      }
     </aside>
  );
};
 
export default QuotesSection;