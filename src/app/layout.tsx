import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";



export const metadata: Metadata = {
  title: "IA Image",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen flex flex-col`}
      >
        <Header/>
        <main className="flex-grow p-4 bg-gray-200" >{children}</main>
      </body>
    </html>
  );
}
