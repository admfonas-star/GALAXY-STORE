import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Galaxy Store | Personagens Rubinot",
  description: "Encontre seu próximo personagem no Rubinot."
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
