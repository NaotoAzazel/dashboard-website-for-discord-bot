import type { Metadata } from "next";

import { cn } from "@/lib/utils";
import { fontSans, fontHeading } from "@/lib/fonts";

import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Dashboard app",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "relative h-full font-sans antialiased",
          fontHeading.variable,
          fontSans.variable,
        )}
      >
        <main className="relative flex flex-col min-h-screen">
          <div className="flex-grow flex-1">{children}</div>
        </main>
      </body>
    </html>
  );
}
