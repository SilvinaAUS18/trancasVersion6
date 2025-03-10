
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AuthProvider from "./AuthProvider";

export default function PanelLayout({
    children, // will be a page or nested layout
  }) {
    return (
      <section>
        <AuthProvider>
        <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </section>
    )
  }

/*import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "./AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}*/
