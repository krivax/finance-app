import type { Metadata } from "next";
import { Providers } from "./Providers/providers";
import "./global.css";

export const metadata: Metadata = {
  title: 'Sistema Financeiro',
  description: 'Sistema de controle financeiro',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
