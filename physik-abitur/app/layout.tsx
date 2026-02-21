import type { Metadata } from 'next';
import { Syne, DM_Mono, DM_Sans } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/layout/Sidebar';
import { Providers } from '@/components/Providers';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Physik Abitur | Lernplattform eA',
  description: 'Interaktive Lernplattform für das Physik-Abitur (erhöhtes Anforderungsniveau)',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark">
      <body className={`${syne.variable} ${dmMono.variable} ${dmSans.variable} font-body antialiased min-h-screen bg-[#0a0a0f] text-[#f0f0f8]`}>
        <div className="flex min-h-screen overflow-x-hidden">
          <Sidebar />
          <Providers>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-elektrizitaet focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            >
              Zum Inhalt springen
            </a>
            <main
              id="main-content"
              className="flex-1 min-h-screen w-full md:ml-[280px] pt-16 md:pt-0 print:pt-0 relative z-0"
              role="main"
              tabIndex={-1}
            >
              {children}
            </main>
          </Providers>
        </div>
      </body>
    </html>
  );
}
