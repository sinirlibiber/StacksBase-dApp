'use client'

import { useState, useEffect, useCallback } from 'react'
import { showConnect } from '@stacks/connect'
import { AppConfig, UserSession } from '@stacks/connect'
import { StacksMainnet } from '@stacks/network'
import { toast } from 'sonner'

interface StacksAccount {
  address: string | null
  isConnected: boolean
  connect: () => void
  disconnect: () => void
}

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

export function useStacksAccount(): StacksAccount {
  const [address, setAddress] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState<boolean>(false)

  // Check existing session on mount
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const userSession = getUserSession()
      
      if (userSession.isUserSignedIn()) {
        const userData = userSession.loadUserData()
        const mainnetAddress = userData.profile.stxAddress.mainnet
        setAddress(mainnetAddress)
        setIsConnected(true)
        console.log('✅ Existing Stacks wallet connected:', mainnetAddress)
      }
    } catch (error) {
      console.error('Error checking wallet session:', error)
    }
  }, [])

  const connect = useCallback((): void => {
    if (typeof window === 'undefined') {
      toast.error('Wallet connection only available in browser')
      return
    }

    try {
      const userSession = getUserSession()
      
      console.log('🔌 Opening Stacks wallet connection...')
      
      showConnect({
        appDetails: {
          name: 'StacksBase',
          icon: typeof window !== 'undefined' ? `${window.location.origin}/favicon.ico` : '/favicon.ico',
        },
        redirectTo: '/',
        onFinish: () => {
          console.log('✅ Wallet connection finished')
          
          // Wait a bit for session to be ready
          setTimeout(() => {
            try {
              if (userSession.isUserSignedIn()) {
                const userData = userSession.loadUserData()
                const mainnetAddress = userData.profile.stxAddress.mainnet
                setAddress(mainnetAddress)
                setIsConnected(true)
                toast.success('Wallet connected successfully!')
                console.log('✅ Connected address:', mainnetAddress)
              } else {
                console.warn('⚠️ Session not signed in after connection')
              }
            } catch (error) {
              console.error('Error loading user data:', error)
              toast.error('Failed to load wallet data')
            }
          }, 500)
        },
        onCancel: () => {
          console.log('❌ Wallet connection cancelled')
          toast.info('Connection cancelled')
        },
        userSession,
      })
    } catch (error) {
      console.error('❌ Error opening wallet connection:', error)
      toast.error('Failed to open wallet connection')
    }
  }, [])

  const disconnect = useCallback((): void => {
    try {
      const userSession = getUserSession()
      userSession.signUserOut()
      setAddress(null)
      setIsConnected(false)
      toast.success('Wallet disconnected')
      console.log('✅ Wallet disconnected')
    } catch (error) {
      console.error('Error disconnecting wallet:', error)
      toast.error('Failed to disconnect wallet')
    }
  }, [])

  return {
    address,
    isConnected,
    connect,
    disconnect,
  }
}
