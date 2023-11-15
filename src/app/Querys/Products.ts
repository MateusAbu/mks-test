import { useQuery, UseQueryResult } from 'react-query';

interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  photo: string;
  price: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  products: Product[];
  count: number;
}

const fetchProducts = async (
  page: number,
  rows: number,
  sortBy: string,
  orderBy: string
): Promise<Product[]> => {
  const url = `https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=${page}&rows=${rows}&sortBy=${sortBy}&orderBy=${orderBy}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Erro ao buscar dados da API');
  }

  const data: ApiResponse = await response.json();

  return data.products;
};

export const useProductsQuery = (
  page: number,
  rows: number,
  sortBy: string,
  orderBy: string
): UseQueryResult<Product[], Error> => {
  return useQuery(['products', page, rows, sortBy, orderBy], () =>
    fetchProducts(page, rows, sortBy, orderBy)
  );
};
