"use client"
import { useCart } from "../contexts/CartContext"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { Separator } from "./ui/separator"
import { X, ShoppingBag, CreditCard } from "lucide-react"

const Cart = () => {
    const { cart, removeFromCart, getTotalItems, getTotalPrice } = useCart()

    return (
        <Card className="w-full">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">
                        <div className="flex items-center gap-2">
                            <ShoppingBag className="h-5 w-5" />
                            Warenkorb
                            {getTotalItems() > 0 && (
                                <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                  {getTotalItems()}
                </span>
                            )}
                        </div>
                    </CardTitle>
                </div>
            </CardHeader>

            <Separator />

            {cart.length === 0 ? (
                <CardContent className="pt-6">
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                        <ShoppingBag className="mb-4 h-12 w-12 text-muted-foreground" />
                        <p className="mb-2 text-lg font-medium">Dein Warenkorb ist leer</p>
                        <p className="text-sm text-muted-foreground">Füge Produkte hinzu, um mit dem Einkauf zu beginnen</p>
                    </div>
                </CardContent>
            ) : (
                <>
                    <CardContent className="p-0">
                        <ScrollArea className="max-h-[300px] px-6 py-4">
                            <div className="space-y-4">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4">
                                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                                            <img
                                                src={item.image || "/placeholder.svg"}
                                                alt={item.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col">
                                            <h3 className="font-medium">{item.name}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {item.quantity} x {item.price.toFixed(2)}€
                                            </p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 rounded-full"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            <X className="h-4 w-4" />
                                            <span className="sr-only">Entfernen</span>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>

                    <Separator />

                    <CardFooter className="flex flex-col space-y-4 p-6">
                        <div className="flex w-full items-center justify-between">
                            <span className="text-lg font-medium">Gesamtsumme:</span>
                            <span className="text-lg font-bold">{getTotalPrice()}€</span>
                        </div>
                        <Button className="w-full" size="lg">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Zur Kasse
                        </Button>
                    </CardFooter>
                </>
            )}
        </Card>
    )
}

export default Cart
