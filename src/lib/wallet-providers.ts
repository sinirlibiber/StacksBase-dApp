'use client'

import type { WalletInfo, WalletConnection, WalletType } from '@/types/wallets'
import { AddressPurpose, request as satsConnectRequest, type AddressesResponse } from 'sats-connect'
import { AppConfig, UserSession, showConnect } from '@stacks/connect'

// Wallet information database
export const WALLET_INFO: Record<WalletType, Omit<WalletInfo, 'isInstalled'>> = {
  xverse: {
    id: 'xverse',
    name: 'Xverse',
    icon: '🔵',
    description: 'Bitcoin & Stacks wallet for Web3',
    downloadUrl: 'https://www.xverse.app/',
    isMobileSupported: true,
  },
  leather: {
    id: 'leather',
    name: 'Leather',
    icon: '🟤',
    description: 'Open-source Stacks wallet',
    downloadUrl: 'https://leather.io/install-extension',
    isMobileSupported: false,
  },
  okx: {
    id: 'okx',
    name: 'OKX Wallet',
    icon: '🟠',
    description: 'Multi-chain crypto wallet',
    downloadUrl: 'https://www.okx.com/web3',
    isMobileSupported: true,
  },
  hiro: {
    id: 'hiro',
    name: 'Hiro Wallet',
    icon: '🟢',
    description: 'Developer-friendly Stacks wallet',
    downloadUrl: 'https://wallet.hiro.so/',
    isMobileSupported: false,
  },
}

// Detect installed wallets
export function detectInstalledWallets(): WalletInfo[] {
  if (typeof window === 'undefined') {
    return []
  }

  const wallets: WalletInfo[] = []

  // Check Xverse
  wallets.push({
    ...WALLET_INFO.xverse,
    isInstalled: !!window.XverseProviders?.StacksProvider,
  })

  // Check Leather
  wallets.push({
    ...WALLET_INFO.leather,
    isInstalled: !!window.LeatherProvider,
  })

  // Check OKX
  wallets.push({
    ...WALLET_INFO.okx,
    isInstalled: !!window.okxwallet?.stacks,
  })

  // Check Hiro
  wallets.push({
    ...WALLET_INFO.hiro,
    isInstalled: !!window.HiroWalletProvider,
  })

  return wallets
}

// Get installed wallets only
export function getInstalledWallets(): WalletInfo[] {
  return detectInstalledWallets().filter((w: WalletInfo) => w.isInstalled)
}

// Check if any wallet is installed
export function hasAnyWalletInstalled(): boolean {
  return getInstalledWallets().length > 0
}

// Xverse Wallet Connection
export async function connectXverse(): Promise<WalletConnection> {
  if (typeof window === 'undefined') {
    throw new Error('Window is not available')
  }

  if (!window.XverseProviders?.StacksProvider) {
    throw new Error('Xverse wallet is not installed')
  }

  try {
    console.log('🔵 Connecting to Xverse...')

    const response = await satsConnectRequest('stx_getAccounts', undefined) as AddressesResponse

    console.log('🔵 Xverse response:', response)

    // Check response structure
    if (!response || response.status !== 'success') {
      throw new Error('Failed to get response from Xverse')
    }

    // Check if addresses exist
    const addresses = response.result?.addresses || []
    if (addresses.length === 0) {
      throw new Error('No addresses returned from Xverse')
    }

    const stacksAddress = addresses.find(
      (addr: { purpose: string }) => addr.purpose === AddressPurpose.Stacks
    )

    if (!stacksAddress) {
      throw new Error('No Stacks address found in Xverse response')
    }

    console.log('✅ Xverse connected:', stacksAddress.address)

    return {
      address: stacksAddress.address,
      publicKey: stacksAddress.publicKey || '',
      walletType: 'xverse',
    }
  } catch (error) {
    console.error('❌ Xverse connection error:', error)
    throw error
  }
}

// Leather Wallet Connection
export async function connectLeather(): Promise<WalletConnection> {
  if (typeof window === 'undefined') {
    throw new Error('Window is not available')
  }

  if (!window.LeatherProvider) {
    throw new Error('Leather wallet is not installed')
  }

  try {
    console.log('🟤 Connecting to Leather...')

    const response = await window.LeatherProvider.request('getAddresses') as {
      addresses?: Array<{
        symbol: string
        type?: string
        address: string
        publicKey?: string
      }>
    }

    console.log('🟤 Leather response:', response)

    // Check if addresses exist
    if (!response || !response.addresses || response.addresses.length === 0) {
      throw new Error('No addresses returned from Leather')
    }

    const stacksAddress = response.addresses.find(
      (addr: { symbol: string; type?: string }) => addr.symbol === 'STX' && addr.type !== 'p2wpkh'
    )

    if (!stacksAddress) {
      throw new Error('No Stacks address found in Leather')
    }

    console.log('✅ Leather connected:', stacksAddress.address)

    return {
      address: stacksAddress.address,
      publicKey: stacksAddress.publicKey || '',
      walletType: 'leather',
    }
  } catch (error) {
    console.error('❌ Leather connection error:', error)
    throw error
  }
}

// OKX Wallet Connection
export async function connectOKX(): Promise<WalletConnection> {
  if (typeof window === 'undefined') {
    throw new Error('Window is not available')
  }

  if (!window.okxwallet?.stacks) {
    throw new Error('OKX wallet is not installed')
  }

  try {
    console.log('🟠 Connecting to OKX...')

    const result = await window.okxwallet.stacks.connect()

    console.log('✅ OKX connected:', result.address)

    return {
      address: result.address,
      publicKey: result.publicKey,
      walletType: 'okx',
    }
  } catch (error) {
    console.error('❌ OKX connection error:', error)
    throw error
  }
}

// Hiro Wallet Connection (using @stacks/connect)
let globalUserSession: UserSession | null = null

function getUserSession(): UserSession {
  if (typeof window === 'undefined') {
    throw new Error('UserSession can only be created on client side')
  }

  if (!globalUserSession) {
    const appConfig = new AppConfig(['store_write', 'publish_data'], window.location.origin)
    globalUserSession = new UserSession({ appConfig })
  }

  return globalUserSession
}

export async function connectHiro(): Promise<WalletConnection> {
  if (typeof window === 'undefined') {
    throw new Error('Window is not available')
  }

  try {
    console.log('🟢 Connecting to Hiro...')

    return new Promise((resolve, reject) => {
      const userSession = getUserSession()

      showConnect({
        appDetails: {
          name: 'StacksBase',
          icon: `${window.location.origin}/favicon.ico`,
        },
        redirectTo: '/',
        onFinish: () => {
          setTimeout(() => {
            try {
              if (userSession.isUserSignedIn()) {
                const userData = userSession.loadUserData()
                const mainnetAddress = userData.profile.stxAddress.mainnet

                console.log('✅ Hiro connected:', mainnetAddress)

                resolve({
                  address: mainnetAddress,
                  publicKey: '',
                  walletType: 'hiro',
                })
              } else {
                reject(new Error('Session not signed in after connection'))
              }
            } catch (error) {
              reject(error)
            }
          }, 500)
        },
        onCancel: () => {
          reject(new Error('User cancelled connection'))
        },
        userSession,
      })
    })
  } catch (error) {
    console.error('❌ Hiro connection error:', error)
    throw error
  }
}

// Unified connection function
export async function connectWallet(walletType: WalletType): Promise<WalletConnection> {
  switch (walletType) {
    case 'xverse':
      return connectXverse()
    case 'leather':
      return connectLeather()
    case 'okx':
      return connectOKX()
    case 'hiro':
      return connectHiro()
    default:
      throw new Error(`Unsupported wallet type: ${walletType}`)
  }
}

// Disconnect function
export async function disconnectWallet(walletType: WalletType): Promise<void> {
  try {
    if (walletType === 'hiro') {
      const userSession = getUserSession()
      userSession.signUserOut()
      console.log('✅ Hiro disconnected')
    } else if (walletType === 'okx' && window.okxwallet?.stacks) {
      await window.okxwallet.stacks.disconnect()
      console.log('✅ OKX disconnected')
    } else if (walletType === 'xverse' && window.XverseProviders?.StacksProvider) {
      await window.XverseProviders.StacksProvider.disconnect()
      console.log('✅ Xverse disconnected')
    }
    // Leather doesn't have explicit disconnect in current API
  } catch (error) {
    console.error('Error disconnecting wallet:', error)
  }
}
