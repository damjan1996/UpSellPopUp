import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { products } from '../data/mockProducts';

const ProductDetailPage = () => {
    const [selectedProduct, setSelectedProduct] = useState(products[0]);
    const [selectedVariant, setSelectedVariant] = useState(selectedProduct.variants[0]);
    const [quantity, setQuantity] = useState(1);

    const { addToCart, setIsPopupOpen, setCurrentComplementaryOffer } = useCart();

    const handleProductChange = (e) => {
        const productId = parseInt(e.target.value, 10);
        const product = products.find((p) => p.id === productId);
        setSelectedProduct(product);
        setSelectedVariant(product.variants[0]);
    };

    const handleVariantChange = (e) => {
        const variantId = parseInt(e.target.value, 10);
        const variant = selectedProduct.variants.find((v) => v.id === variantId);
        setSelectedVariant(variant);
    };

    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value, 10));
    };

    const handleAddToCart = () => {
        addToCart(selectedVariant, quantity);

        // Prüfen, ob eine komplementäre Variante existiert
        if (selectedVariant.metafields && selectedVariant.metafields.complementary_variant) {
            const complementaryInfo = selectedVariant.metafields.complementary_variant;

            setCurrentComplementaryOffer({
                mainProduct: selectedProduct,
                mainVariant: selectedVariant,
                complementaryInfo,
                quantity: quantity,
            });

            setIsPopupOpen(true);
        }
    };

    return (
        <div className="product-detail-page">
            <h2>Produktdetails</h2>

            <div className="product-selection">
                <div className="form-group">
                    <label htmlFor="product-select">Produkt auswählen:</label>
                    <select
                        id="product-select"
                        value={selectedProduct.id}
                        onChange={handleProductChange}
                    >
                        {products.map(product => (
                            <option key={product.id} value={product.id}>
                                {product.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="variant-select">Variante auswählen:</label>
                    <select
                        id="variant-select"
                        value={selectedVariant.id}
                        onChange={handleVariantChange}
                    >
                        {selectedProduct.variants.map(variant => (
                            <option key={variant.id} value={variant.id}>
                                {variant.name} - {variant.price.toFixed(2)}€
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="quantity-input">Menge:</label>
                    <input
                        id="quantity-input"
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={handleQuantityChange}
                    />
                </div>
            </div>

            <div className="product-display">
                <div className="product-image-container">
                    <img
                        src={selectedVariant.image}
                        alt={selectedVariant.name}
                        className="product-image"
                    />
                </div>

                <div className="product-details">
                    <h2>{selectedProduct.name}</h2>
                    <h3>{selectedVariant.name}</h3>
                    <p className="product-description">{selectedProduct.description}</p>
                    <p className="product-price">{selectedVariant.price.toFixed(2)}€</p>

                    <button
                        className="add-to-cart-button"
                        onClick={handleAddToCart}
                    >
                        {quantity}x In den Warenkorb legen
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;