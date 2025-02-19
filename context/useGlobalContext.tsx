'use client';

import { createContext, useContext } from 'react';
import useGlobal from './useGlobal';

const GlobalContext = createContext<{
  search: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}>(
  {} as {
    search: string;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
);

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { search, handleSearch } = useGlobal();

  return (
    <GlobalContext.Provider value={{ search, handleSearch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
