import React from 'react';
import { CartProvider } from "./contexts/CartContext";
import ProductDetailPage from "./components/ProductDetailPage";
import ComplementaryPopup from "./components/ComplementaryPopup";
import Cart from "./components/Cart";
// No CSS imports here - all styles come from index.css

const App = () => {
    return (
        <CartProvider>
            <div className="app-container">
                <header className="app-header">
                    <h1 className="text-xl font-semibold">Testshop für Vitabay</h1>
                </header>

                <main className="main-content">
                    <div className="md:col-span-2">
                        <ProductDetailPage />
                    </div>
                    <div>
                        <Cart />
                    </div>
                </main>

                <ComplementaryPopup />
            </div>
        </CartProvider>
    );
};

export default App;