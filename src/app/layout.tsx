import { Metadata } from 'next';
import { FC, PropsWithChildren } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mineder',
  description:
    "Experience love differently. Mineder is the dating app where every swipe is a yes - because every profile is your partner's.",
  authors: { name: 'Sherlock Doyle', url: 'https://github.com/sherlockdoyle' },
  creator: 'Sherlock Doyle',
  publisher: 'Sherlock Doyle',
  metadataBase: new URL('https://mineder.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mineder.vercel.app',
    title: 'Mineder',
    description: 'Discover your perfect match, again. No real matches, no secret chats, just your partner.',
    siteName: 'Mineder',
    images: {
      url: '/og.png',
      width: 1200,
      height: 630,
      alt: 'Mineder - Your own Tinder',
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mineder',
    description: 'Join your partner, again. No real matches, no secret chats, just your partner.',
    creator: '@SherlockDoyle4',
    images: '/og.png',
  },
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang='en'>
    <head>
      <meta name='theme-color' content='#ec4899' />
      <meta name='apple-mobile-web-app-title' content='Mineder' />
    </head>
    <body>{children}</body>
  </html>
);
export default RootLayout;
