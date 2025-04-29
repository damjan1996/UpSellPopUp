import React, { createContext, useContext, useState } from 'react';

// Erstelle den Kontext mit einem Standardwert
const CartContext = createContext({
    cart: [],
    addToCart: () => {},
    removeFromCart: () => {},
    getTotalItems: () => 0,
    getTotalPrice: () => "0.00",
    isPopupOpen: false,
    setIsPopupOpen: () => {},
    currentComplementaryOffer: null,
    setCurrentComplementaryOffer: () => {},
});

// Hook für den einfachen Zugriff auf den Kontext
export const useCart = () => useContext(CartContext);

// Provider-Komponente
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentComplementaryOffer, setCurrentComplementaryOffer] = useState(null);

    // Artikel zum Warenkorb hinzufügen
    const addToCart = (item, quantity = 1) => {
        setCart((prevCart) => {
            // Prüfen, ob der Artikel bereits im Warenkorb ist
            const existingItemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);

            if (existingItemIndex >= 0) {
                // Wenn ja, Menge erhöhen
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex] = {
                    ...updatedCart[existingItemIndex],
                    quantity: updatedCart[existingItemIndex].quantity + quantity,
                };
                return updatedCart;
            } else {
                // Wenn nicht, neuen Artikel hinzufügen
                return [...prevCart, { ...item, quantity }];
            }
        });
    };

    // Artikel aus dem Warenkorb entfernen
    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    // Gesamtanzahl der Artikel im Warenkorb berechnen
    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    // Gesamtpreis berechnen
    const getTotalPrice = () => {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return total.toFixed(2);
    };

    // Werte, die über den Kontext bereitgestellt werden
    const value = {
        cart,
        addToCart,
        removeFromCart,
        getTotalItems,
        getTotalPrice,
        isPopupOpen,
        setIsPopupOpen,
        currentComplementaryOffer,
        setCurrentComplementaryOffer,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
