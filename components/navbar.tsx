import Image from 'next/image';
import './navbar.css';

const Navbar = () => {
  return (
    <div
      style={{
        padding: '50px 80px 50px 80px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          width: '50%',
        }}
      >
        <Image
          src='/logo.png'
          alt='logo'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          width={138.53}
          height={24}
        />
      </div>
      <div
        style={{
          width: '50%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignContent: 'center',
        }}
      >
        <button
          style={{
            display: 'flex',
            background: '#F2F2F2',
            alignItems: 'center',
            gap: '5px',
            border: 'none',
            borderRadius: '15px',
            padding: '5px 10px',
            width: '270px',
          }}
        >
          <Image src='/search.png' alt='search' width={16} height={16} />
          <input
            type='text'
            placeholder="You're looking for something?"
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: '15px',
              fontWeight: '400',
              outline: 'none',
              lineHeight: '19.36px',
              flexGrow: 1,
              minWidth: 0,
              color: '#A1A1A1',
              fontFamily: 'Inter',
              letterSpacing: '0%',
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
