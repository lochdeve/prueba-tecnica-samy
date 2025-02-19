'use client';

import { useGlobalContext } from '@/context/useGlobalContext';

const useNavbar = () => {
  const { search, handleSearch } = useGlobalContext();
  return {
    search,
    handleSearch,
  };
};

export default useNavbar;
