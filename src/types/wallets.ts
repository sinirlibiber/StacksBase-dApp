export type WalletType = 'hiro' | 'leather' | 'xverse' | 'okx'

export interface WalletInfo {
  id: WalletType
  name: string
  icon: string
  description: string
  downloadUrl: string
  isInstalled: boolean
  isMobileSupported: boolean
}

export interface WalletConnection {
  address: string
  publicKey: string
  walletType: WalletType
}

export interface WalletProvider {
  connect: () => Promise<WalletConnection>
  disconnect: () => Promise<void>
  getAddress: () => Promise<string | null>
  signTransaction: (txHex: string) => Promise<string>
}

// Window extensions for wallet detection
declare global {
  interface Window {
    HiroWalletProvider?: {
      isHiro?: boolean
    }
    LeatherProvider?: {
      request: (method: string, params?: unknown) => Promise<unknown>
    }
    XverseProviders?: {
      StacksProvider?: {
        connect: () => Promise<{ addresses: Array<{ address: string; publicKey: string }> }>
        disconnect: () => Promise<void>
      }
    }
    okxwallet?: {
      stacks?: {
        connect: () => Promise<{ address: string; publicKey: string }>
        disconnect: () => Promise<void>
        signTransaction: (options: { hex: string }) => Promise<{ hex: string }>
      }
    }
  }
}
