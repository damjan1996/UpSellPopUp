import os
import pathlib

# Basisverzeichnis definieren
base_dir = r"C:\Development\Vitabay"

# Verzeichnisstruktur definieren
directory_structure = [
    # Root-Verzeichnis
    "",

    # Public-Verzeichnis (für CRA)
    "public",

    # Source-Verzeichnis und Unterverzeichnisse
    "src",
    "src/components",
    "src/contexts",
    "src/data",
    "src/styles",

    # Build-Verzeichnis (wird normalerweise automatisch erstellt, zur Vollständigkeit)
    "build",

    # Node-Module-Verzeichnis (wird normalerweise automatisch erstellt, zur Vollständigkeit)
    "node_modules"
]

# Dateien definieren (ohne Inhalt)
files_structure = [
    # Root-Dateien
    "package.json",
    "package-lock.json",
    "README.md",
    "vercel.json",
    ".gitignore",

    # Public-Dateien
    "public/index.html",
    "public/favicon.ico",
    "public/manifest.json",
    "public/robots.txt",

    # React-Komponenten
    "src/index.jsx",
    "src/App.jsx",

    # Komponenten-Dateien
    "src/components/ProductDetailPage.jsx",
    "src/components/ComplementaryPopup.jsx",
    "src/components/ProductCard.jsx",
    "src/components/Cart.jsx",
    "src/components/CountdownTimer.jsx",

    # Context-Dateien
    "src/contexts/CartContext.jsx",

    # Daten-Dateien
    "src/data/mockProducts.js",

    # Styling-Dateien
    "src/styles/styles.css"
]

def setup_project():
    print(f"Erstelle Projektstruktur in {base_dir}...")

    # Hauptverzeichnis erstellen, falls es nicht existiert
    if not os.path.exists(base_dir):
        os.makedirs(base_dir)
        print(f"Hauptverzeichnis {base_dir} erstellt")
    else:
        print(f"Hauptverzeichnis {base_dir} existiert bereits")

    # Alle Unterverzeichnisse erstellen
    for directory in directory_structure:
        full_path = os.path.join(base_dir, directory)
        if not os.path.exists(full_path):
            os.makedirs(full_path)
            print(f"Verzeichnis {full_path} erstellt")
        else:
            print(f"Verzeichnis {full_path} existiert bereits")

    # Alle Dateien erstellen (leer)
    for file_path in files_structure:
        full_path = os.path.join(base_dir, file_path)

        # Stellen Sie sicher, dass das übergeordnete Verzeichnis existiert
        parent_dir = os.path.dirname(full_path)
        if not os.path.exists(parent_dir):
            os.makedirs(parent_dir)
            print(f"Verzeichnis {parent_dir} erstellt")

        # Datei nur erstellen, wenn sie nicht bereits existiert
        if not os.path.exists(full_path):
            # Erstellen einer leeren Datei
            pathlib.Path(full_path).touch()
            print(f"Datei {full_path} erstellt")
        else:
            print(f"Datei {full_path} existiert bereits")

def count_items():
    num_dirs = len(directory_structure)
    num_files = len(files_structure)
    print(f"\nZusammenfassung:")
    print(f"- {num_dirs} Verzeichnisse erstellt/überprüft")
    print(f"- {num_files} Dateien erstellt/überprüft")

if __name__ == "__main__":
    setup_project()
    count_items()
    print("\nProjektstruktur erfolgreich erstellt!")
    print("\nUm das Projekt zu starten:")
    print("1. Navigiere zum Projektordner: cd C:\\Development\\Vitabay")
    print("2. Installiere die Abhängigkeiten: npm install")
    print("3. Starte die Entwicklungsumgebung: npm start")