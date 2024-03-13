import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/store/redux-provider";
const inter = Roboto_Condensed({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Time Tracker",
  description: "An Inhouse CRM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ReduxProvider>
  );
}
