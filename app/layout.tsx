import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next App Learning',
  description: 'Learning Next.js with a sample app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
