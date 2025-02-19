'use client';
import { ImageType } from '@/types';
import Image from 'next/image';
import useCardImage from './hooks/useCardImage';

const CardImage = ({ image }: { image: ImageType }) => {
  const { handleLike, liked, likesCount } = useCardImage({ image });

  return (
    <>
      <div
        key={'image-card-' + image.id}
        style={{
          overflow: 'hidden',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
        }}
      >
        <div
          style={{ position: 'relative', cursor: 'pointer' }}
          className='image-container'
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '110px',
              height: '90px',
              backgroundColor: 'white',
              clipPath: 'polygon(0 0, 100% 0, 0 100%)',
              zIndex: 1,
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '25px',
                left: '15px',
                transform: 'translate(-20%, -20%)',
                color: 'black',
                fontSize: '16px',
              }}
            >
              {image.price}
              <span style={{ fontSize: '12px' }}> €</span>
            </span>
          </div>
          <Image
            src={image.picture}
            alt={image.title}
            priority
            width={300}
            height={300}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div className='heart-icon' onClick={handleLike}>
            {liked ? (
              <Image src={'/liked.png'} alt='like' width={30} height={30} />
            ) : (
              <Image
                src={'/without-like.png'}
                alt='like'
                width={30}
                height={30}
              />
            )}
            <span
              style={{
                color: 'white',
              }}
            >
              {likesCount}
            </span>
            <Image src={'/share.png'} alt='share' width={30} height={30} />
            <span
              style={{
                color: 'white',
              }}
            >
              1
            </span>
          </div>
        </div>
        <div
          style={{
            padding: '25px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '5px',
          }}
        >
          <span
            style={{
              textAlign: 'center',
              fontFamily: 'Inter',
              fontSize: '28px',
            }}
          >
            {image.title.toLocaleUpperCase()}
          </span>
          <p style={{ color: 'black', margin: 0, textAlign: 'center' }}>
            <span style={{ color: '#BFBFBE' }}>by</span> {image.author}
          </p>
        </div>
      </div>
    </>
  );
};

export default CardImage;
