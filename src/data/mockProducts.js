// Beispieldaten für Produkte und Varianten
export const products = [
    {
        id: 1,
        name: "Vitamin D3",
        description:
            "Vitamin D3 unterstützt die Knochengesundheit und das Immunsystem. Es wird auch als Sonnenvitamin bezeichnet, da es hauptsächlich durch Sonneneinstrahlung auf die Haut gebildet wird.",
        variants: [
            {
                id: 101,
                name: "1000 IE - 120 Kapseln",
                price: 19.99,
                image: "/vitamin-d3-capsules.png",
                metafields: {
                    complementary_variant: {
                        variant_id: 201,
                        discount_percentage: 20,
                        benefits: [
                            "Verbesserte Aufnahme von Vitamin D3",
                            "Unterstützung des Immunsystems",
                            "Optimale Wirkstoffkombination",
                        ],
                    },
                },
            },
            {
                id: 102,
                name: "2000 IE - 120 Kapseln",
                price: 24.99,
                image: "/sunshine-d3-boost.png",
            },
            {
                id: 103,
                name: "5000 IE - 120 Kapseln",
                price: 29.99,
                image: "/strong-vitamin-d3.png",
            },
        ],
    },
    {
        id: 2,
        name: "Vitamin K2",
        description:
            "Vitamin K2 (MK-7) ist wichtig für die Knochengesundheit und unterstützt die Blutgerinnung. Es hilft dabei, Calcium in die Knochen einzulagern und verhindert Ablagerungen in den Gefäßen.",
        variants: [
            {
                id: 201,
                name: "100 mcg - 60 Kapseln",
                price: 17.99,
                image: "/vitamin-k2-capsules.png",
            },
            {
                id: 202,
                name: "200 mcg - 60 Kapseln",
                price: 22.99,
                image: "/high-dose-vitamin-k2.png",
            },
        ],
    },
    {
        id: 3,
        name: "Magnesium",
        description:
            "Magnesium ist ein essentieller Mineralstoff, der für über 300 biochemische Reaktionen im Körper benötigt wird. Es unterstützt die Muskelfunktion, das Nervensystem und den Energiestoffwechsel.",
        variants: [
            {
                id: 301,
                name: "400 mg - 120 Kapseln",
                price: 15.99,
                image: "/magnesium-capsules-close-up.png",
                metafields: {
                    complementary_variant: {
                        variant_id: 101,
                        discount_percentage: 15,
                        benefits: [
                            "Optimale Ergänzung zu Magnesium",
                            "Unterstützung der Knochengesundheit",
                            "Bessere Bioverfügbarkeit",
                        ],
                    },
                },
            },
            {
                id: 302,
                name: "600 mg - 120 Kapseln",
                price: 19.99,
                image: "/magnesium-capsules-close-up.png",
            },
        ],
    },
]

// Hilfsfunktion zum Finden einer Variante anhand ihrer ID
export const findVariantById = (variantId) => {
    for (const product of products) {
        for (const variant of product.variants) {
            if (variant.id === variantId) {
                return { product, variant }
            }
        }
    }
    return null
}
