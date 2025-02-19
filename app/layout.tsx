import Apollo from '@/components/ApolloProvider';
import Navbar from '@/components/Navbar';
import { GlobalContextProvider } from '@/context/useGlobalContext';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Samy Gallery',
  description: 'Samy Gallery',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Apollo>
      <GlobalContextProvider>
        <html lang='en'>
          <body className={`${geistSans.variable} ${geistMono.variable}`}>
            <Navbar />
            {children}
          </body>
        </html>
      </GlobalContextProvider>
    </Apollo>
  );
}
