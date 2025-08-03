import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  // Titre principal pour les résultats de recherche et l'onglet du navigateur
  title: "Elisabeth Verschueren Moreau - Artiste peintre | Linogravure et pastels",
  
  // Méta-description optimisée pour le référencement
  description:
    "Découvrez les œuvres d'Elisabeth Verschueren Moreau, artiste peintre à Paris. Portfolio de créations uniques en linogravure et pastels, explorant la réalité et la répétition. Expositions passées et à venir.",
  
  // Mots-clés pour aider les moteurs de recherche à catégoriser le site
  keywords: [
    "Elisabeth Verschueren Moreau",
    "artiste peintre",
    "linogravure",
    "pastels secs",
    "pastels gras",
    "art contemporain",
    "artiste Paris",
    "ENSAA Duperré",
    "portfolio d'artiste",
    "exposition d'art",
    "création artistique",
  ],

  // Informations pour le partage sur les réseaux sociaux (Open Graph)
  openGraph: {
    title: "Elisabeth Verschueren Moreau - Portfolio officiel",
    description: "Découvrez les créations en linogravure et pastels de l'artiste Elisabeth Verschueren Moreau.",
    url: "URL_DE_TON_SITE", // TODO: Remplacer par l'URL réelle du site
    siteName: "Elisabeth Verschueren Moreau",
    images: [
      {
        url: "/images/og-image.jpg", // TODO: Remplacer par une image de couverture adaptée
        width: 800,
        height: 600,
        alt: "Œuvre d'art d'Elisabeth Verschueren Moreau",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  
  // Informations pour Twitter
  twitter: {
    card: "summary_large_image",
    title: "Elisabeth Verschueren Moreau - Portfolio officiel",
    description: "Découvrez les créations en linogravure et pastels de l'artiste Elisabeth Verschueren Moreau.",
    // image: "/images/twitter-image.jpg", // TODO: Remplacer si tu as une image spécifique pour Twitter
  },

  // Autres métadonnées utiles
  authors: [{ name: "Elisabeth Verschueren Moreau", url: "URL_DE_TON_SITE" }],
  creator: "Elisabeth Verschueren Moreau",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}