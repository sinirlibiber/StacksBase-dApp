import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import { Providers } from './providers'
import FarcasterWrapper from "@/components/FarcasterWrapper";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element {
  return (
        <html lang="en" suppressHydrationWarning>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <Providers>
              
      <FarcasterWrapper>
        {children}
      </FarcasterWrapper>
      
              <Toaster position="top-center" richColors />
            </Providers>
          </body>
        </html>
      );
}

export const metadata: Metadata = {
        title: "StacksBase dApp Creator",
        description: "Build a Stacks blockchain dApp using Reown AppKit for wallet connectivity and deploy on mainnet. Engage users in Clarity smart contract interactions while earning leaderboard points.",
        other: { "fc:frame": JSON.stringify({"version":"next","imageUrl":"https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/thumbnail_ba57be63-f844-46e5-8e1e-29ea536630f5-M3y0uRSJF4YwquM9R68N7eeN4bkFDA","button":{"title":"Open with Ohara","action":{"type":"launch_frame","name":"StacksBase dApp Creator","url":"https://known-race-932.app.ohara.ai","splashImageUrl":"https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/farcaster/splash_images/splash_image1.svg","splashBackgroundColor":"#ffffff"}}}
        ) }
    };
