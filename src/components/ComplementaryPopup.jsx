import React from 'react';
import CountdownTimer from './CountdownTimer';
import { useCart } from '../contexts/CartContext';
import { findVariantById } from '../data/mockProducts';

const ComplementaryPopup = () => {
    const {
        isPopupOpen,
        setIsPopupOpen,
        currentComplementaryOffer,
        addToCart
    } = useCart();

    if (!isPopupOpen || !currentComplementaryOffer) return null;

    const {
        mainProduct,
        complementaryInfo,
        quantity
    } = currentComplementaryOffer;

    const { product: compProduct, variant: compVariant } = findVariantById(complementaryInfo.variant_id);

    const discountedPrice = (compVariant.price * (1 - complementaryInfo.discount_percentage / 100)).toFixed(2);

    const handleAddComplementary = () => {
        addToCart(compVariant, quantity);
        setIsPopupOpen(false);
    };

    const handleDecline = () => {
        setIsPopupOpen(false);
    };

    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <div className="popup-header">
                    <CountdownTimer initialMinutes={5} onComplete={handleDecline} />
                    <button className="close-button" onClick={handleDecline}>×</button>
                </div>

                <div className="popup-content">
                    <h2>Sorge dafür, dass dein Körper {mainProduct.name} besser aufnimmt!</h2>

                    <div className="popup-product">
                        <img src={compVariant.image} alt={compVariant.name} className="product-image" />
                        <h3>Füge jetzt {compProduct.name} hinzu und steigere die Bioverfügbarkeit um 55%!</h3>
                    </div>

                    <ul className="benefits-list">
                        {complementaryInfo.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                        ))}
                    </ul>

                    <div className="popup-actions">
                        <button
                            className="add-complementary-button"
                            onClick={handleAddComplementary}
                        >
                            Hinzufügen: {quantity}x {compVariant.name} für je {discountedPrice}€
                        </button>
                        <button
                            className="decline-button"
                            onClick={handleDecline}
                        >
                            Angebot ablehnen
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComplementaryPopup;