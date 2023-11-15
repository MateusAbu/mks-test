import { render, screen, fireEvent } from '@testing-library/react';
import Card from './Card';

const mockProduct = {
  id: 1,
  name: 'Test Product',
  brand: 'Test Brand',
  description: 'Test Description',
  photo: 'https://mks-sistemas.nyc3.digitaloceanspaces.com/products/hyperxcloudstinger.webp',
  price: '10.99',
  createdAt: '2023-01-01',
  updatedAt: '2023-01-01',
};

describe('Card Component', () => {
  it('renders Card component correctly', () => {
    render(<Card product={mockProduct} onAddToCart={() => {}} />);

    // Check if product name, price, and description are rendered
    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/R\$10\.99/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Description/i)).toBeInTheDocument();
  });

  it('calls onAddToCart when the buy button is clicked', () => {
    const mockOnAddToCart = jest.fn();
    render(<Card product={mockProduct} onAddToCart={mockOnAddToCart} />);

    // Click the buy button
    fireEvent.click(screen.getByText(/COMPRAR/i));

    // Verify that the onAddToCart function is called
    expect(mockOnAddToCart).toHaveBeenCalled();
  });
});
