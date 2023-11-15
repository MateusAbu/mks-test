import React, { useState } from 'react';
import styles from './cartDrawer.module.css';
import { FaMinus, FaPlus, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import { useCart } from 'src/app/Querys/CartContext';

interface CartDrawerProps {
  onClose: () => void;
}

export default function CartDrawer ({ onClose }: CartDrawerProps) {
    const { getCartItems, getTotal, removeFromCart, editQuantity } = useCart();

    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const cartItems = getCartItems();

    const handleFinishPurchase = () => {
        window.alert(`Compra finalizada com sucesso!\nTotal: R$${getTotal()}`);
        cartItems.forEach((item) => removeFromCart(item.id));
        onClose();
  };

  return (
    <div className={styles.drawer}>
        <div>
            <div className={styles.header}>
                <div>
                    Carrinho de Compras
                </div>
                <div className={styles.closeButton} onClick={onClose}>
                    <FaTimes />
                </div>
            </div>

            <div className={styles.miniCard}>
                {cartItems.map(item => (
                <div key={item.id} className={styles.product}>
                    <div>
                        <Image
                        src={item.photo}
                        alt={item.name}
                        width={60}
                        height={60}
                        />
                    </div>
                    <div className={styles.name}>
                        {item.name} 
                    </div>
                    <div className={styles.quantityGrid}>
                        Qtd:
                        <div className={styles.quantity}>
                            <button className={styles.buttons} disabled={item.quantity <= 1} onClick={() => editQuantity(item.id, item.quantity - 1)}><FaMinus /></button>
                                {item.quantity}
                            <button className={styles.buttons} onClick={() => editQuantity(item.id, item.quantity + 1)}><FaPlus /></button>
                        </div>
                    </div>
                    <div className={styles.price}>R${item.price}</div>
                        <div className={styles.remover} onClick={() => removeFromCart(item.id)}>
                            <FaTimes />
                        </div>
                </div>
                ))}
            </div>
        </div>

        <div>
            <div className={styles.total}>
                <div>Total:</div> 
                <div>R${getTotal()}</div>
            </div>

            <button 
                className={styles.finishButton} 
                onClick={handleFinishPurchase}>
                    Finalizar Compra
            </button>
        </div>

        {showSuccessPopup && (
        <div className={styles.successPopup}>
          <p>Compra finalizada com sucesso!</p>
          <p>Total: R${getTotal()}</p>
          <button onClick={() => setShowSuccessPopup(false)}>Fechar</button>
        </div>
      )}

    </div>
  );
};

