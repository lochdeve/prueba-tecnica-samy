import { gql } from '@apollo/client';

export const GET_IMAGES = gql`
  query GetImages($first: Int, $after: String, $title: String) {
    images(first: $first, after: $after, title: $title) {
      edges {
        cursor
        node {
          id
        }
      }
      nodes {
        author
        createdAt
        id
        liked
        likesCount
        picture
        price
        title
        updatedAt
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;
