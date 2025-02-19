'use client';

import { GET_IMAGES } from '@/api/queries/imagesQuery';
import { useGlobalContext } from '@/context/useGlobalContext';
import { ImageType } from '@/types';
import { useLazyQuery } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';

const NUMBER_OF_IMAGES = 6;

const useGrid = () => {
  const { search } = useGlobalContext();
  const [images, setImages] = useState<ImageType[]>([]);
  const [notFound, setNotFound] = useState(false);

  // Usamos una referencia para el estado actual de paginación
  const paginationRef = useRef({
    hasMore: true,
    endCursor: undefined as string | undefined,
    isFetching: false,
  });

  const [getImages, { loading, error }] = useLazyQuery(GET_IMAGES, {
    fetchPolicy: 'no-cache',
  });

  const loadMoreImages = async (newSearch?: string, newAfter?: string) => {
    try {
      if (
        paginationRef.current.isFetching ||
        (!newAfter && !paginationRef.current.hasMore)
      )
        return;

      // Actualizamos referencia antes de la petición
      paginationRef.current.isFetching = true;

      const result = await getImages({
        variables: {
          first: NUMBER_OF_IMAGES,
          after:
            newAfter !== undefined ? newAfter : paginationRef.current.endCursor,
          title: newSearch !== undefined ? newSearch : search,
        },
      });

      const data = result.data;

      // Actualizamos estado y referencia de manera sincronizada
      setImages((prev) =>
        newAfter ? [...prev, ...data.images.nodes] : data.images.nodes
      );
      setNotFound(data.images.nodes.length === 0);

      // Actualizamos referencia después del estado
      paginationRef.current = {
        hasMore: data.images.pageInfo.hasNextPage,
        endCursor: data.images.pageInfo.endCursor,
        isFetching: false,
      };
    } catch (error) {
      console.error('Error:', error);
      paginationRef.current.isFetching = false;
    }
  };

  useEffect(() => {
    const resetAndLoad = async () => {
      // Reset sincronizado de estado y referencia
      setImages([]);
      setNotFound(false);

      paginationRef.current = {
        hasMore: true,
        endCursor: undefined,
        isFetching: false,
      };

      await loadMoreImages(search, undefined);
    };

    resetAndLoad();
  }, [search]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !paginationRef.current.isFetching &&
        paginationRef.current.hasMore
      ) {
        loadMoreImages(search, paginationRef.current.endCursor);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return {
    images,
    loading,
    error,
    notFound,
  };
};

export default useGrid;
