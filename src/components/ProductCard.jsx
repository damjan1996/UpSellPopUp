import React from 'react';
import { useCart } from "../contexts/CartContext";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

const ProductCard = ({ variant, product }) => {
    const { addToCart, setIsPopupOpen, setCurrentComplementaryOffer } = useCart();

    const handleAddToCart = () => {
        addToCart(variant);

        // Überprüfen, ob dieser Artikel eine komplementäre Variante hat
        if (variant.metafields && variant.metafields.complementary_variant) {
            const complementaryInfo = variant.metafields.complementary_variant;

            setCurrentComplementaryOffer({
                mainProduct: product,
                mainVariant: variant,
                complementaryInfo,
                quantity: 1, // Standardmäßig 1, kann später angepasst werden
            });

            setIsPopupOpen(true);
        }
    };

    return (
        <Card className="overflow-hidden transition-all hover:shadow-md">
            <div className="relative aspect-square overflow-hidden">
                <img
                    src={variant.image || "/placeholder.svg"}
                    alt={variant.name}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                />
            </div>
            <CardContent className="p-4">
                <h3 className="font-medium">{product.name}</h3>
                <h4 className="text-sm text-muted-foreground">{variant.name}</h4>
                <p className="mt-2 font-bold">{variant.price.toFixed(2)}€</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button className="w-full" onClick={handleAddToCart}>
                    In den Warenkorb
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;