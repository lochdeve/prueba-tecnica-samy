import { ImageType } from '@/types';
import { fireEvent, render, screen } from '@testing-library/react';
import useCardImage from './hooks/useCardImage';
import CardImage from './index';

// Mock del hook y de next/image
jest.mock('./hooks/useCardImage');
jest.mock('next/image', () => {
  const MockedImage = ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  );
  MockedImage.displayName = 'NextImageMock';
  return MockedImage;
});

const mockImage: ImageType = {
  id: '1',
  picture: '/test-image.jpg',
  title: 'Test Art',
  price: 100,
  author: 'Test Artist',
  liked: false,
  likesCount: 10,
};

describe('CardImage Component', () => {
  const mockHandleLike = jest.fn();

  beforeEach(() => {
    (useCardImage as jest.Mock).mockReturnValue({
      handleLike: mockHandleLike,
      liked: false,
      likesCount: 10,
    });
  });

  test('renderiza correctamente la información básica', () => {
    render(<CardImage image={mockImage} />);

    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('TEST ART')).toBeInTheDocument();
    expect(screen.getByText(/Test Artist/i)).toBeInTheDocument();
    expect(screen.getByAltText('Test Art')).toHaveAttribute(
      'src',
      '/test-image.jpg'
    );
  });

  test('muestra el contador de likes correctamente', () => {
    render(<CardImage image={mockImage} />);
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  test('llama a handleLike al hacer clic en el corazón', () => {
    render(<CardImage image={mockImage} />);
    fireEvent.click(screen.getByAltText('like'));
    expect(mockHandleLike).toHaveBeenCalledTimes(1);
  });

  test('muestra el corazón lleno cuando está liked', () => {
    (useCardImage as jest.Mock).mockReturnValue({
      handleLike: mockHandleLike,
      liked: true,
      likesCount: 11,
    });

    render(<CardImage image={mockImage} />);
    expect(screen.getByAltText('like')).toHaveAttribute('src', '/liked.png');
    expect(screen.getByText('11')).toBeInTheDocument();
  });
});
