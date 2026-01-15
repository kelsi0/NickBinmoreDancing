import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Nick Binmore Dancing",
  description: 'The official website of Nick Binmore, IDTA qualified ballroom and latin dance instructor based in the Torbay area.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased bg-background`}
      >
        {children}
      </body>
    </html>
  );
}
