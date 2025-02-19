'use client';

import { GET_IMAGES } from '@/api/imagesQuery';
import { ImageType } from '@/types';
import { useLazyQuery } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';

const NUMBER_OF_IMAGES = 6;

const useGrid = () => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [endCursor, setEndCursor] = useState<string | undefined>(undefined);
  const isFetching = useRef(false);

  const [getImages, { loading, error }] = useLazyQuery(GET_IMAGES, {
    variables: { first: NUMBER_OF_IMAGES, after: endCursor, title: '' },
    fetchPolicy: 'cache-and-network',
  });

  const loadMoreImages = async () => {
    if (isFetching.current || !hasMore) return;

    isFetching.current = true;

    const result = await getImages({
      variables: { first: NUMBER_OF_IMAGES, before: endCursor, title: '' },
    });
    const data = result.data;

    setImages((prevImages) => {
      return [...prevImages, ...data.images.nodes];
    });
    setHasMore(data.images.pageInfo.hasNextPage);
    setEndCursor(data.images.pageInfo.endCursor);

    isFetching.current = false;
  };

  useEffect(() => {
    if (images.length === 0 && !isFetching.current) {
      loadMoreImages();
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !isFetching.current &&
        hasMore
      ) {
        loadMoreImages();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasMore, isFetching.current, endCursor]);

  return {
    images,
    hasMore,
    loading,
    error,
  };
};

export default useGrid;
