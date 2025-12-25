'use client'

import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet } from 'wagmi/chains'
import { QueryClient } from '@tanstack/react-query'

// WalletConnect project ID
export const projectId: string = '9a2c496a30d21c9db69d1bc71a7d1ff3'

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Query client for React Query
export const queryClient: QueryClient = new QueryClient()

// Wagmi configuration
export const wagmiAdapter: WagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [mainnet],
})

// AppKit metadata
const metadata = {
  name: 'StacksBase',
  description: 'Claim free SBASE tokens on Stacks blockchain',
  url: 'https://stacksbase.vercel.app',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create AppKit instance
export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet],
  metadata,
  features: {
    analytics: true,
    email: true,
    socials: ['google', 'x', 'github', 'discord'],
    onramp: true,
    swaps: true,
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#FF6B35',
    '--w3m-border-radius-master': '8px',
  }
})
