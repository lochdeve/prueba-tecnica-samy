export interface ImageType {
  id: string;
  picture: string;
  title: string;
  author: string;
  liked: boolean;
  price: number;
  likesCount: number;
}

export interface ImageGridProps {
  images: { nodes: ImageType[] };
}

export interface ImageQueryResponse {
  images: {
    nodes: ImageType[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}
