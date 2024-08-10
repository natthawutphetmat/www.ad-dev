"use client";

import { Inter } from "next/font/google";
import Navbar from './components/navbar';
import Footer from './components/Footer';
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css";
import "./app.css";
import { GoogleAnalytics } from '@next/third-parties/google';
import { GoogleTagManager } from '@next/third-parties/google';
import { CustomProviders } from "./components/provider";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <meta name="robots" content="index" />
      <link rel="canonical" href="https://www.ad-dev.net" />
        <link rel="icon" href="/img/favicon.ico" />
        <link rel="preload" href="/path/to/image.webp" as="image" />
        <meta name="twitter:image" content="https://www.ad-dev.net/img/ads.webp" />
        <meta name="author" content="ad-dev" />
        <GoogleTagManager gtmId="GTM-5HR83NGV" />
      </head>
      <body className={inter.className}>
        <CustomProviders>
          <Navbar />
          {children}
          <Footer />
        </CustomProviders>

        <GoogleAnalytics gaId="G-KBN8EYFP1H" />

     

        <Script
          async
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        />
      </body>
    </html>
  );
}
