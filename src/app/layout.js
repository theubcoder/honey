import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import "./globals.css";

const nunito = localFont({
  src: "../../public/fonts/Nunito/Nunito-VariableFont_wght.ttf",
  variable: "--font-nunito",
});

const greatVibes = localFont({
  src: "../../public/fonts/Great_Vibes/GreatVibes-Regular.ttf",
  variable: "--font-great-vibes",
});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          unsafe_disableDevelopmentModeWarnings: true,
        },
        variables: {
          colorPrimary: "#c17d10",
          colorText: "#3e2723",
          colorTextOnPrimaryBackground: "#ffffff",
          colorTextSecondary: "#6d4c41",
          colorBackground: "#ffffff",
          colorInputBackground: "#ffffff",
          colorInputText: "#3e2723",
          colorNeutral: "#3e2723",
          borderRadius: "0.75rem",
          fontFamily: "var(--font-nunito), sans-serif",
        },
        elements: {
          footer: { display: "none" },
          footerAction: { display: "none" },
          footerPages: { display: "none" },
          userButtonPopoverFooter: { display: "none" },
          formButtonPrimary: {
            backgroundColor: "#c17d10",
            color: "#ffffff",
            fontWeight: "700",
            borderRadius: "9999px",
            "&:hover": { backgroundColor: "#a86a0b" },
          },
          formFieldInput: {
            borderColor: "#e0d5c5",
            borderRadius: "0.75rem",
            "&:focus": {
              borderColor: "#c17d10",
              boxShadow: "0 0 0 3px rgba(193,125,16,0.2)",
            },
          },
          formFieldLabel: { color: "#3e2723", fontWeight: "600" },
          socialButtonsBlockButton: {
            borderColor: "#e0d5c5",
            borderRadius: "0.75rem",
            color: "#3e2723",
            "&:hover": { backgroundColor: "#fff7e6" },
          },
          dividerLine: { backgroundColor: "#e0d5c5" },
          dividerText: { color: "#6d4c41" },
          userButtonAvatarBox: { width: "34px", height: "34px" },
          userButtonPopoverActionButton: {
            "&:hover": { backgroundColor: "#fff7e6" },
          },
        },
      }}
    >
      <html lang="en">
        <body className={`${nunito.variable} ${greatVibes.variable}`}>
          <WishlistProvider>
            <CartProvider>
              <Header/>
              {children}
              <Footer/>
            </CartProvider>
          </WishlistProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
