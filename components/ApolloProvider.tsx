'use client';

import client from '@/lib/apolloClient';
import { ApolloProvider } from '@apollo/client';

const Apollo = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Apollo;
