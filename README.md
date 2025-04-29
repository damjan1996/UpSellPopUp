# Complementary Product Popup

Ein React-basiertes Popup-System für Produktempfehlungen, das die Bioverfügbarkeit von Nahrungsergänzungsmitteln verbessert.

## Funktionalität

Diese Anwendung implementiert eine intelligente Produktempfehlungsfunktion:

1. Beim Hinzufügen eines Produkts zum Warenkorb wird geprüft, ob eine komplementäre Variante existiert
2. Falls vorhanden, öffnet sich ein Popup mit einer personalisierten Empfehlung
3. Der Kunde kann das komplementäre Produkt mit Rabatt hinzufügen oder ablehnen
4. Ein Countdown-Timer erzeugt Dringlichkeit für die Entscheidung

## Technische Details

- **Frontend**: React 18
- **Styling**: CSS (keine externen Bibliotheken)
- **Daten**: JSON-basierte Produktinformationen (simuliert Shopify-Metafelder)
- **Deployment**: Vercel-optimiert

## Projektstruktur

```
/
├── public/                 # Statische Assets
├── src/                    # Quellcode
│   ├── components/         # React-Komponenten
│   │   ├── Cart.jsx        # Warenkorb-Komponente
│   │   ├── ComplementaryPopup.jsx  # Popup für komplementäre Produkte
│   │   ├── CountdownTimer.jsx  # Timer-Komponente
│   │   ├── ProductCard.jsx  # Produktkarten-Komponente
│   │   └── ProductDetailPage.jsx  # Produktdetailseite
│   ├── contexts/
│   │   └── CartContext.jsx  # Context für den Warenkorb
│   ├── data/
│   │   └── mockProducts.js  # Simulierte Produktdaten
│   ├── styles/
│   │   └── styles.css       # Zentrale CSS-Datei
│   ├── App.jsx             # Hauptkomponente
│   └── index.jsx           # Einstiegspunkt
└── package.json            # Projekt-Konfiguration
```

## Installation

```bash
# Repository klonen
git clone https://github.com/yourusername/complementary-product-popup.git

# In das Projektverzeichnis wechseln
cd complementary-product-popup

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm start
```

## Deployment

Die Anwendung ist für das Deployment auf Vercel optimiert. Folge diesen Schritten:

1. Repository auf GitHub veröffentlichen
2. Mit Vercel verbinden: https://vercel.com/import
3. Repository auswählen und Deploy starten

## Shopify-Integration

Für die Integration in Shopify:

1. Erstelle die entsprechenden Metafelder im Shopify-Admin
2. Passe den Code an, um die Shopify-API zu nutzen
3. Binde das Script in dein Shopify-Theme ein

## Beispielszenario

Bei der Anwendung wird Kunden, die Methylenblau in den Warenkorb legen, automatisch Vitamin C als komplementäres Produkt vorgeschlagen. Die Menge des Vorschlags entspricht der Menge des Hauptprodukts.

## Lizenz

MIT