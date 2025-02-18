'use client';

import ImageGrid from '@/components/imageGrid';
import { GET_IMAGES } from '@/queries/imagesQuery';
import { useQuery } from '@apollo/client';

export default function Home() {
  const { loading, error, data } = useQuery(GET_IMAGES, {
    variables: { first: 15, after: '', title: '' }, // Inicializamos con first = 5 y after = null
    skip: false, // Evitamos la consulta si no hay más páginas
    fetchPolicy: 'cache-and-network', // Siempre busca en caché pero también en red
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (data) {
    console.log(data);
  }

  return (
    <div>
      <main>
        <ImageGrid images={data.images} />
      </main>
    </div>
  );
}
