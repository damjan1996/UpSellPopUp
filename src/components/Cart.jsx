import React from 'react';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
    const { cart, removeFromCart, getTotalItems, getTotalPrice } = useCart();

    if (cart.length === 0) {
        return (
            <div className="cart">
                <h2>Warenkorb</h2>
                <p>Dein Warenkorb ist leer</p>
            </div>
        );
    }

    return (
        <div className="cart">
            <h2>Warenkorb ({getTotalItems()} Artikel)</h2>

            <div className="cart-items">
                {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} className="cart-item-image" />
                        <div className="cart-item-details">
                            <h3>{item.name}</h3>
                            <p className="cart-item-price">
                                {item.quantity} x {item.price.toFixed(2)}€
                            </p>
                        </div>
                        <button
                            className="remove-button"
                            onClick={() => removeFromCart(item.id)}
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>

            <div className="cart-summary">
                <p className="cart-total">Gesamtsumme: {getTotalPrice()}€</p>
                <button className="checkout-button">Zur Kasse</button>
            </div>
        </div>
    );
};

export default Cart;