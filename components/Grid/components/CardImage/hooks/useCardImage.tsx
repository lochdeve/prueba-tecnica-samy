'use client';

import { LIKE_IMAGE } from '@/api/mutations/likeimage';
import { ImageType } from '@/types';
import { useMutation } from '@apollo/client';
import { useState } from 'react';

const useCardImage = ({ image }: { image: ImageType }) => {
  const [likeImage, { error }] = useMutation(LIKE_IMAGE);
  const [liked, setLiked] = useState(image.liked);
  const [likesCount, setLikesCount] = useState(image.likesCount);

  const handleLike = async () => {
    const res = await likeImage({
      variables: { input: { clientMutationId: image.id, imageId: image.id } },
    });
    if (error) {
      console.log(error);
    }
    setLiked(res.data.likeImage.image.liked);
    setLikesCount(res.data.likeImage.image.likesCount);
  };

  return { handleLike, liked, likesCount };
};

export default useCardImage;
