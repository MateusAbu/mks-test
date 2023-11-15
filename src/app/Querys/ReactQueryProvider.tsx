"use client"

import { QueryClient, QueryClientProvider } from 'react-query';
import { CartProvider } from './CartContext';

const queryClient = new QueryClient();

export const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>{children}</CartProvider>
    </QueryClientProvider>
  );
};
