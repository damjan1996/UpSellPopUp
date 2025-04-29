"use client"
import CountdownTimer from "./CountdownTimer"
import { useCart } from "../contexts/CartContext"
import { findVariantById } from "../data/mockProducts"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { X, CheckCircle, ShoppingCart } from "lucide-react"

const ComplementaryPopup = () => {
    const { isPopupOpen, setIsPopupOpen, currentComplementaryOffer, addToCart } = useCart()

    if (!isPopupOpen || !currentComplementaryOffer) return null

    const { mainProduct, complementaryInfo, quantity } = currentComplementaryOffer

    const { product: compProduct, variant: compVariant } = findVariantById(complementaryInfo.variant_id)

    const discountedPrice = (compVariant.price * (1 - complementaryInfo.discount_percentage / 100)).toFixed(2)
    const originalPrice = compVariant.price.toFixed(2)

    const handleAddComplementary = () => {
        addToCart(compVariant, quantity)
        setIsPopupOpen(false)
    }

    const handleDecline = () => {
        setIsPopupOpen(false)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <Card className="relative max-h-[90vh] w-full max-w-md overflow-auto">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center gap-2">
                        <CountdownTimer initialMinutes={5} onComplete={handleDecline} />
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 h-8 w-8 rounded-full"
                        onClick={handleDecline}
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Schließen</span>
                    </Button>
                </CardHeader>

                <CardContent className="space-y-4 pt-0">
                    <CardTitle className="text-center text-xl">
                        Sorge dafür, dass dein Körper {mainProduct.name} besser aufnimmt!
                    </CardTitle>

                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative aspect-square w-40 overflow-hidden rounded-lg">
                            <img
                                src={compVariant.image || "/placeholder.svg"}
                                alt={compVariant.name}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <h3 className="text-center text-lg font-medium">
                            Füge jetzt {compProduct.name} hinzu und steigere die Bioverfügbarkeit um 55%!
                        </h3>

                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold">{discountedPrice}€</span>
                            <span className="text-sm text-muted-foreground line-through">{originalPrice}€</span>
                        </div>
                    </div>

                    <ul className="space-y-2">
                        {complementaryInfo.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>

                <CardFooter className="flex flex-col space-y-2">
                    <Button className="w-full" size="lg" onClick={handleAddComplementary}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Hinzufügen: {quantity}x für je {discountedPrice}€
                    </Button>
                    <Button variant="outline" className="w-full" onClick={handleDecline}>
                        Angebot ablehnen
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ComplementaryPopup
