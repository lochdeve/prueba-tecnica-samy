import { gql } from '@apollo/client';

export const LIKE_IMAGE = gql`
  mutation likeImage($input: LikeImageInput!) {
    likeImage(input: $input) {
      clientMutationId
      image {
        id
        likesCount
        liked
        author
        title
      }
    }
  }
`;
