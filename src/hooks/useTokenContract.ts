'use client'

import { useState, useEffect } from 'react'
import { openContractCall } from '@stacks/connect'
import {
  uintCV,
  principalCV,
  PostConditionMode,
  FungibleConditionCode,
  makeStandardSTXPostCondition,
  makeContractSTXPostCondition,
  createAssetInfo,
  makeStandardFungiblePostCondition,
} from '@stacks/transactions'
import { 
  NETWORK, 
  CONTRACT_ADDRESS, 
  CONTRACT_NAME, 
  CLAIM_AMOUNT, 
  formatTokenAmount,
  STACKS_API_URL 
} from '@/lib/stacks-config'
import { toast } from 'sonner'

interface TokenBalance {
  balance: number
  formatted: string
}

interface UseTokenContract {
  balance: TokenBalance
  isLoading: boolean
  claimTokens: () => Promise<void>
  transferTokens: (recipient: string, amount: number) => Promise<void>
  refreshBalance: () => Promise<void>
}

export function useTokenContract(address: string | null): UseTokenContract {
  const [balance, setBalance] = useState<TokenBalance>({ balance: 0, formatted: '0.00' })
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchBalance = async (): Promise<void> => {
    if (!address) {
      setBalance({ balance: 0, formatted: '0.00' })
      return
    }

    try {
      // Fetch balance from Stacks API
      const response = await fetch(
        `${STACKS_API_URL}/extended/v1/address/${address}/balances`
      )
      const data = await response.json()
      
      // Look for fungible tokens
      const tokenBalance = data.fungible_tokens?.[`${CONTRACT_ADDRESS}.${CONTRACT_NAME}::stacksbase-token`]?.balance || 0
      
      setBalance({
        balance: parseInt(tokenBalance),
        formatted: formatTokenAmount(parseInt(tokenBalance))
      })
    } catch (error) {
      console.error('Error fetching balance:', error)
      setBalance({ balance: 0, formatted: '0.00' })
    }
  }

  useEffect(() => {
    fetchBalance()
    // Refresh balance every 30 seconds
    const interval = setInterval(fetchBalance, 30000)
    return () => clearInterval(interval)
  }, [address])

  const claimTokens = async (): Promise<void> => {
    if (!address) {
      toast.error('Please connect your wallet first')
      return
    }

    setIsLoading(true)
    try {
      await openContractCall({
        network: NETWORK,
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'claim-tokens',
        functionArgs: [],
        postConditionMode: PostConditionMode.Deny,
        postConditions: [],
        onFinish: (data) => {
          toast.success(`Claim successful! Transaction: ${data.txId.slice(0, 8)}...`)
          // Refresh balance after a delay
          setTimeout(fetchBalance, 5000)
        },
        onCancel: () => {
          toast.error('Transaction cancelled')
        },
      })
    } catch (error) {
      console.error('Error claiming tokens:', error)
      toast.error('Failed to claim tokens. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const transferTokens = async (recipient: string, amount: number): Promise<void> => {
    if (!address) {
      toast.error('Please connect your wallet first')
      return
    }

    setIsLoading(true)
    try {
      const amountInMicroTokens = amount * Math.pow(10, 6) // Convert to micro units

      await openContractCall({
        network: NETWORK,
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'transfer',
        functionArgs: [
          uintCV(amountInMicroTokens),
          principalCV(address),
          principalCV(recipient),
        ],
        postConditionMode: PostConditionMode.Deny,
        postConditions: [],
        onFinish: (data) => {
          toast.success(`Transfer successful! Transaction: ${data.txId.slice(0, 8)}...`)
          setTimeout(fetchBalance, 5000)
        },
        onCancel: () => {
          toast.error('Transaction cancelled')
        },
      })
    } catch (error) {
      console.error('Error transferring tokens:', error)
      toast.error('Failed to transfer tokens. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    balance,
    isLoading,
    claimTokens,
    transferTokens,
    refreshBalance: fetchBalance,
  }
}
