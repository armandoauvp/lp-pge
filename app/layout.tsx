import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Família única do manual
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PGE, Programa de Governança Empresarial por XR Advisor",
  description:
    "Doze meses para tirar as decisões da cabeça do fundador e levá-las para um conselho. Programa conduzido pela XR Advisor.",
};

export const viewport: Viewport = {
  themeColor: "#0d1626",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={jakarta.variable}>
      <body>{children}</body>
    </html>
  );
}
