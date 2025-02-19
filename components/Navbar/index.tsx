'use client';

import Image from 'next/image';
import useNavbar from './hooks/useNavbar';
import './index.css';

const Navbar = () => {
  const { handleSearch } = useNavbar();

  return (
    <div className='navbar-container'>
      <div className='logo-container'>
        <Image
          src='/logo.png'
          alt='logo'
          priority
          width={138.53}
          height={24}
          className='navbar-logo'
        />
      </div>
      <div className='search-container'>
        <button className='search-button'>
          <Image src='/search.png' alt='search' width={16} height={16} />
          <input
            className='search-input'
            type='text'
            placeholder="You're looking for something?"
            onChange={handleSearch}
          />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
