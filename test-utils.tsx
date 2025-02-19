import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { ReactNode } from 'react';

type WrapperProps = {
  children: ReactNode;
  mocks?: MockedResponse[];
};

export const TestWrapper = ({ children, mocks = [] }: WrapperProps) => (
  <MockedProvider mocks={mocks} addTypename={false}>
    {children}
  </MockedProvider>
);
