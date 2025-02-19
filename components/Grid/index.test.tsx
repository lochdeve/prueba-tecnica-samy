import '@testing-library/jest-dom';

import { GET_IMAGES } from '@/api/queries/imagesQuery';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { TestWrapper } from '../../test-utils';
import ImageGrid from './index';

// Mock de la query
const mocks = [
  {
    request: {
      query: GET_IMAGES,
      variables: {
        first: 6,
      },
    },
    result: {
      data: {
        images: {
          __typename: 'ImagesResponse',
          nodes: [
            {
              __typename: 'Image',
              id: '1',
              title: 'Test Image',
              picture: 'https://loremflickr.com/300/300?random=0',
              author: 'Test Author',
              price: 100,
              likesCount: 50,
              liked: false,
              createdAt: '2024-01-01',
              updatedAt: '2024-01-01',
            },
          ],
        },
      },
    },
    delay: 50,
  },
];

describe('ImageGrid Component', () => {
  test('Muestra loading inicial', async () => {
    render(
      <TestWrapper mocks={mocks}>
        <ImageGrid />
      </TestWrapper>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('Muestra imágenes después de cargar', async () => {
    render(
      <TestWrapper mocks={mocks}>
        <ImageGrid />
      </TestWrapper>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    // Esperar a que desaparezca el loading con timeout extendido
    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'), {
      timeout: 3000,
    });

    // Verificar la imagen con timeout extendido
    const image = await screen.findByAltText(
      'Test Image',
      {},
      { timeout: 3000 }
    );
    expect(image).toBeInTheDocument();

    // Verificar el título usando una expresión regular insensible a mayúsculas
    const titleElement = await screen.findByText(/test image/i);
    expect(titleElement).toBeInTheDocument();
  });
});
