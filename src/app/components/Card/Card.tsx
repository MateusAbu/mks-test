import Image from 'next/image'
import styles from './card.module.css'
import { FaShoppingBag } from 'react-icons/fa'

interface CardProps {
    product: Product
    onAddToCart: () => void;
}

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

export default function Card({ product, onAddToCart } : CardProps) {

  const formatPrice = (price: string): string => {
    const formattedPrice = parseFloat(price).toFixed(2);
    return formattedPrice.replace(/\.00$/, ''); // Remove ".00" se existir
  }

  return (
    <div className={styles.card}>
        <div className={styles.photo}>
        <Image
          src={product.photo}
          alt={product.name}
          width={150}
          height={138}
        />
        </div>
        <div className={styles.content}>
          <div className={styles.name}>
            {product.name}
          </div>
          <div className={styles.price}>
            R${formatPrice(product.price)}
          </div>
        </div>
        <div className={styles.description}>
          {product.description}
        </div>
        <button className={styles.button} onClick={onAddToCart}>
          <FaShoppingBag /> COMPRAR
        </button>
    </div>
  )
}
