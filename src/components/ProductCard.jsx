"use client"
import { useCart } from "../contexts/CartContext"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

const ProductCard = ({ variant, product }) => {
    const { addToCart, setIsPopupOpen, setCurrentComplementaryOffer } = useCart()

    const handleAddToCart = () => {
        addToCart(variant)

        // Überprüfen, ob dieser Artikel eine komplementäre Variante hat
        if (variant.metafields && variant.metafields.complementary_variant) {
            const complementaryInfo = variant.metafields.complementary_variant

            setCurrentComplementaryOffer({
                mainProduct: product,
                mainVariant: variant,
                complementaryInfo,
                quantity: 1, // Standardmäßig 1, kann später angepasst werden
            })

            setIsPopupOpen(true)
        }
    }

    return (
        <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
            <div className="relative aspect-square overflow-hidden">
                <img
                    src={variant.image || "/placeholder.svg"}
                    alt={variant.name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>
            <CardContent className="p-4">
                <h3 className="text-lg font-medium">{product.name}</h3>
                <h4 className="text-sm text-muted-foreground">{variant.name}</h4>
                <p className="mt-2 font-semibold">{variant.price.toFixed(2)}€</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button onClick={handleAddToCart} className="w-full" variant="default">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    In den Warenkorb
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ProductCard
