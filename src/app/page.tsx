"use client";

import styles from './page.module.css'
import { useProductsQuery } from './Querys/Products'
import Card from './components/Card/Card'
import { FaShoppingCart } from 'react-icons/fa'
import Shimmer from './components/Shimmer/Shimmer';
import { useCart } from './Querys/CartContext';
import { useState } from 'react';
import CartDrawer from './components/CartDrawer/CartDrawer';

export default function Home() {

  const { data, isLoading, isError } = useProductsQuery(1, 8, 'id', 'DESC');

  const { addToCart, getTotalItems } = useCart();

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false)

  const openCartDrawer = () => {
    setIsCartDrawerOpen(true);
  };
  
  const closeCartDrawer = () => {
    setIsCartDrawerOpen(false);
  };

  if (isLoading) {
    return <Shimmer />;
  }

  if (isError) {
    return <p>Error fetching data</p>;
  }
  return (
    <main>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <div className={styles.title}>MKS</div> Sistemas
        </div>
        <button className={styles.cart} onClick={openCartDrawer}><FaShoppingCart /> {getTotalItems()}</button>
      </div>

      <div className={styles.cardContainer}>
        {data?.map((product) => (
          <Card 
            key={product.id} 
            product={product} 
            onAddToCart={() => addToCart({ id: product.id, name: product.name, price: parseFloat(product.price), photo: product.photo, quantity: 1 })} />
        ))}
      </div>

      <div className={styles.footer}>
        MKS sistemas © Todos os direitos reservados
      </div>

      {isCartDrawerOpen && <CartDrawer onClose={closeCartDrawer} />}
    </main>
  )
}
