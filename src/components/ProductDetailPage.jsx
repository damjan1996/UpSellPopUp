"use client"

import { useState } from "react"
import { useCart } from "../contexts/CartContext"
import { products } from "../data/mockProducts"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { ShoppingCart } from "lucide-react"
import { Separator } from "./ui/separator"

const ProductDetailPage = () => {
    const [selectedProduct, setSelectedProduct] = useState(products[0])
    const [selectedVariant, setSelectedVariant] = useState(selectedProduct.variants[0])
    const [quantity, setQuantity] = useState(1)

    const { addToCart, setIsPopupOpen, setCurrentComplementaryOffer } = useCart()

    const handleProductChange = (value) => {
        const productId = Number.parseInt(value, 10)
        const product = products.find((p) => p.id === productId)
        setSelectedProduct(product)
        setSelectedVariant(product.variants[0])
    }

    const handleVariantChange = (value) => {
        const variantId = Number.parseInt(value, 10)
        const variant = selectedProduct.variants.find((v) => v.id === variantId)
        setSelectedVariant(variant)
    }

    const handleQuantityChange = (e) => {
        setQuantity(Number.parseInt(e.target.value, 10))
    }

    const handleAddToCart = () => {
        addToCart(selectedVariant, quantity)

        // Prüfen, ob eine komplementäre Variante existiert
        if (selectedVariant.metafields && selectedVariant.metafields.complementary_variant) {
            const complementaryInfo = selectedVariant.metafields.complementary_variant

            setCurrentComplementaryOffer({
                mainProduct: selectedProduct,
                mainVariant: selectedVariant,
                complementaryInfo,
                quantity: quantity,
            })

            setIsPopupOpen(true)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="mb-6 text-2xl font-bold">Produktdetails</h2>

            <div className="grid gap-8 md:grid-cols-2">
                <div className="order-2 md:order-1">
                    <Card className="overflow-hidden">
                        <div className="aspect-square w-full overflow-hidden bg-muted">
                            <img
                                src={selectedVariant.image || "/placeholder.svg"}
                                alt={selectedVariant.name}
                                className="h-full w-full object-contain"
                            />
                        </div>
                    </Card>
                </div>

                <div className="order-1 flex flex-col md:order-2">
                    <div className="mb-6 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="product-select">Produkt auswählen</Label>
                            <Select value={selectedProduct.id.toString()} onValueChange={handleProductChange}>
                                <SelectTrigger id="product-select">
                                    <SelectValue placeholder="Produkt wählen" />
                                </SelectTrigger>
                                <SelectContent>
                                    {products.map((product) => (
                                        <SelectItem key={product.id} value={product.id.toString()}>
                                            {product.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="variant-select">Variante auswählen</Label>
                            <Select value={selectedVariant.id.toString()} onValueChange={handleVariantChange}>
                                <SelectTrigger id="variant-select">
                                    <SelectValue placeholder="Variante wählen" />
                                </SelectTrigger>
                                <SelectContent>
                                    {selectedProduct.variants.map((variant) => (
                                        <SelectItem key={variant.id} value={variant.id.toString()}>
                                            {variant.name} - {variant.price.toFixed(2)}€
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="quantity-input">Menge</Label>
                            <Input
                                id="quantity-input"
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={handleQuantityChange}
                                className="w-24"
                            />
                        </div>
                    </div>

                    <CardContent className="flex flex-col space-y-4 p-0">
                        <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                        <h3 className="text-lg text-muted-foreground">{selectedVariant.name}</h3>

                        <Separator />

                        <p className="text-sm">{selectedProduct.description}</p>

                        <div className="mt-auto">
                            <p className="mb-4 text-2xl font-bold">{selectedVariant.price.toFixed(2)}€</p>

                            <Button size="lg" className="w-full" onClick={handleAddToCart}>
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                {quantity}x In den Warenkorb legen
                            </Button>
                        </div>
                    </CardContent>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailPage
