'use client'

import { useState, useEffect, useCallback } from 'react'
import { connectWallet, disconnectWallet, getInstalledWallets } from '@/lib/wallet-providers'
import type { WalletConnection, WalletType } from '@/types/wallets'
import { toast } from 'sonner'

interface StacksWallet {
  address: string | null
  publicKey: string | null
  walletType: WalletType | null
  isConnected: boolean
  isLoading: boolean
  hasWallets: boolean
  isCheckingWallets: boolean
  refreshWallets: () => void
  connect: (walletType: WalletType) => Promise<void>
  disconnect: () => Promise<void>
}

const STORAGE_KEY = 'stacksbase_wallet'

export function useStacksWallet(): StacksWallet {
  const [address, setAddress] = useState<string | null>(null)
  const [publicKey, setPublicKey] = useState<string | null>(null)
  const [walletType, setWalletType] = useState<WalletType | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasWallets, setHasWallets] = useState<boolean>(false)
  const [isCheckingWallets, setIsCheckingWallets] = useState<boolean>(true)

  // Check for installed wallets with retry mechanism
  useEffect(() => {
    if (typeof window === 'undefined') return

    let attempts = 0
    const maxAttempts = 10 // 10 attempts × 200ms = 2 seconds
    const checkInterval = 200 // Check every 200ms

    console.log('🔍 Starting wallet detection...')

    const checkWallets = (): void => {
      attempts++
      const installed = getInstalledWallets()
      
      console.log(`🔍 Wallet check attempt ${attempts}/${maxAttempts}:`, {
        xverse: !!window.XverseProviders?.StacksProvider,
        leather: !!window.LeatherProvider,
        okx: !!window.okxwallet?.stacks,
        hiro: !!window.HiroWalletProvider,
        installedCount: installed.length
      })

      if (installed.length > 0) {
        setHasWallets(true)
        setIsCheckingWallets(false)
        console.log('✅ Wallets found:', installed.map(w => w.name).join(', '))
      } else if (attempts >= maxAttempts) {
        setHasWallets(false)
        setIsCheckingWallets(false)
        console.log('⚠️ No wallets detected after', maxAttempts, 'attempts')
      }
    }

    // Immediate first check
    checkWallets()

    // Set up polling if no wallets found yet
    const intervalId = setInterval(() => {
      if (attempts < maxAttempts && !hasWallets) {
        checkWallets()
      } else {
        clearInterval(intervalId)
      }
    }, checkInterval)

    return () => clearInterval(intervalId)
  }, [])

  // Restore previous session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const data = JSON.parse(stored) as WalletConnection
          setAddress(data.address)
          setPublicKey(data.publicKey)
          setWalletType(data.walletType)
          console.log('✅ Restored wallet session:', data.walletType, data.address)
        }
      } catch (error) {
        console.error('Error restoring wallet session:', error)
      }
    }
  }, [])

  const connect = useCallback(async (selectedWalletType: WalletType): Promise<void> => {
    if (typeof window === 'undefined') {
      toast.error('Wallet connection only available in browser')
      return
    }

    setIsLoading(true)

    try {
      console.log(`🔌 Connecting to ${selectedWalletType}...`)

      const connection = await connectWallet(selectedWalletType)

      // Save to state
      setAddress(connection.address)
      setPublicKey(connection.publicKey)
      setWalletType(connection.walletType)

      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(connection))

      toast.success(`${selectedWalletType.toUpperCase()} wallet connected!`)
      console.log('✅ Wallet connected:', connection)
    } catch (error) {
      console.error('❌ Wallet connection error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to connect wallet'
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const disconnect = useCallback(async (): Promise<void> => {
    if (!walletType) return

    try {
      await disconnectWallet(walletType)

      // Clear state
      setAddress(null)
      setPublicKey(null)
      setWalletType(null)

      // Clear localStorage
      localStorage.removeItem(STORAGE_KEY)

      toast.success('Wallet disconnected')
      console.log('✅ Wallet disconnected')
    } catch (error) {
      console.error('Error disconnecting wallet:', error)
      toast.error('Failed to disconnect wallet')
    }
  }, [walletType])

  const refreshWallets = useCallback((): void => {
    if (typeof window === 'undefined') return

    console.log('🔄 Manually refreshing wallet detection...')
    const installed = getInstalledWallets()
    
    console.log('🔍 Manual check:', {
      xverse: !!window.XverseProviders?.StacksProvider,
      leather: !!window.LeatherProvider,
      okx: !!window.okxwallet?.stacks,
      hiro: !!window.HiroWalletProvider,
      installedCount: installed.length
    })

    setHasWallets(installed.length > 0)
    setIsCheckingWallets(false)

    if (installed.length > 0) {
      toast.success(`Found ${installed.length} wallet(s): ${installed.map(w => w.name).join(', ')}`)
    } else {
      toast.error('No wallets detected. Please install a Stacks wallet.')
    }
  }, [])

  return {
    address,
    publicKey,
    walletType,
    isConnected: !!address,
    isLoading,
    hasWallets,
    isCheckingWallets,
    refreshWallets,
    connect,
    disconnect,
  }
}
