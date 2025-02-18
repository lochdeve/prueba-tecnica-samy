import Image from 'next/image';

interface Image {
  id: string;
  picture: string;
  title: string;
  author: string;
  liked: boolean;
  price: number;
  likesCount: number;
}

interface ImageGridProps {
  images: { nodes: Image[] };
}

const ImageGrid = ({ images }: ImageGridProps) => {
  if (images.nodes.length === 0) {
    return <div>No images found</div>;
  }
  console.log({ images });

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '30px',
        padding: '40px',
        paddingInline: '80px',
        background: '#F6F6F6',
      }}
    >
      {images.nodes.map((image: Image) => (
        <div
          key={image.id}
          style={{
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
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
              width={300}
              height={300}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div className='heart-icon'>
              <Image src={'/like.png'} alt='like' width={30} height={30} />
              <span>{image.likesCount}</span>
              <Image src={'/share.png'} alt='share' width={30} height={30} />
              <span>1</span>
            </div>
            <style jsx>{`
              .heart-icon {
                position: absolute;
                bottom: 10px;
                right: 10px;
                opacity: 0;
                transition: opacity 0.3s ease;
                display: flex;
                flex-direction: column;
                align-items: center;
              }
              .image-container:hover .heart-icon {
                opacity: 1;
              }
            `}</style>
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
      ))}
    </div>
  );
};

export default ImageGrid;
