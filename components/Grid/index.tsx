import { ImageType } from '@/types';
import CardImage from './components/cardImage';

import useGrid from './hooks/useGrid';
import './index.css';

const ImageGrid = () => {
  const { images, loading, error } = useGrid();

  if (loading && images.length === 0)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <p>Loading...</p>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

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
      {images.map((image: ImageType) => (
        <CardImage key={'card-' + image.id} image={image} />
      ))}
    </div>
  );
};

export default ImageGrid;
