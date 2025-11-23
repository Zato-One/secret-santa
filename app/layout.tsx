import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Secret Santa",
  description: "Generate encrypted Secret Santa assignments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
