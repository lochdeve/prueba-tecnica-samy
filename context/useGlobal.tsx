'use client';

import { useState } from 'react';

const useGlobal = () => {
  const [search, setSearch] = useState<string>('');
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return { search, handleSearch };
};

export default useGlobal;
