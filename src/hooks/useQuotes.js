import React, { useContext, useEffect, useState } from 'react';
import Preloader from '../components/common/preloader';
import quotesService from '../components/services/quotes.service';

const QuoteContext = React.createContext();

export const useQuotes = () => {
  return useContext(QuoteContext);
};

export const QuotesProvider = ({ children }) => {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getQuotes = async () => {
    setLoading(true);
    try {
      const { content } = await quotesService.get();
      setQuotes(content);
      setLoading(false);
    } catch(error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuotes();
  }, []);

  return (
    <QuoteContext.Provider value={{ 
      quotes
    }}>
      { !isLoading ? children : <Preloader />}
  </QuoteContext.Provider>
  );
};