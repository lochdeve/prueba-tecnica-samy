import { ImageType } from '@/types';
import CardImage from './components/CardImage';
import useGrid from './hooks/useGrid';
import './index.css';

const ImageGrid = () => {
  const { images, loading, error, notFound } = useGrid();

  if (notFound)
    return (
      <div className='image-grid'>
        <p
          style={{
            textAlign: 'center',
            fontSize: '24px',
            width: '100%',
          }}
        >
          No images found
        </p>
      </div>
    );

  if (loading && images.length === 0)
    return (
      <div className='image-grid'>
        <p>Loading...</p>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='image-grid'>
      {images.map((image: ImageType) => (
        <CardImage key={'card-' + image.id} image={image} />
      ))}
    </div>
  );
};

export default ImageGrid;
