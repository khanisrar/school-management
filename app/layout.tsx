import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/ui/Navbar";
import Footer from "@/ui/Footer";




export const metadata: Metadata = {
  title: "School Management",
  description: "A simple school management system to add and view schools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      
      >
        <Navbar />
        <main className="lg:pt-10 pt-6">
           {children}
        </main>
       <Footer/>
      </body>
    </html>
  );
}
