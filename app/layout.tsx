import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import Script from "next/script";
import ClientLayout from "./ClientLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <Script id="theme-switcher" strategy="beforeInteractive">
          {`
 if (
  localStorage.getItem('theme') === 'dark' ||
  (!('theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}
  `}
        </Script>
        <ClientLayout>
          {children}
        </ClientLayout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
