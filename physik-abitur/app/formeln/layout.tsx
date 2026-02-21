import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Formelsammlung | Physik Abitur',
  description: 'Alle wichtigen Formeln der Physik-Abitur-Lernplattform: Elektrizität, Schwingungen, Quantenobjekte, Atomhülle, Messunsicherheiten.',
};

export default function FormelnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
