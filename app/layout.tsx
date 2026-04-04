import type { Metadata } from 'next'
import './globals.css'
import Header from '@/src/components/layout/Header/Header'
import Footer from '@/src/components/layout/Footer/Footer'
import { Maintenance } from '@/src/components/common/Maintenance/Maintenance'
import { SiteSettingsProvider } from '@/src/contexts/SiteSettingsContext'
import { getSiteSettings } from '@/lib/cosmic'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import { seoDefaults } from '@/src/config/seo-defaults'

export const metadata: Metadata = seoDefaults.home

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const siteSettings = await getSiteSettings();

  if (!siteSettings || !siteSettings.metadata) {
    return (
      <html lang="en">
        <body>
          <Maintenance />
        </body>
      </html>
    );
  }

  return (
    <html lang="en" data-theme="dark">
      <SiteSettingsProvider value={siteSettings.metadata}>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" />
          <script src="/dashboard-console-capture.js" />
        </head>
        <body>
          <Header />
          <main style={{ marginTop: 'var(--nav-height)' }}>
            {children}
          </main>
          <Footer />
          <SpeedInsights />
          <Analytics />
        </body>
      </SiteSettingsProvider>
    </html>
  )
}
