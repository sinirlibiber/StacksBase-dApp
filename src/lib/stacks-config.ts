import { STACKS_MAINNET } from '@stacks/network'

// Network configuration
export const NETWORK = STACKS_MAINNET
export const IS_MAINNET = true

// Contract details - UPDATE THESE AFTER DEPLOYING YOUR CONTRACT
export const CONTRACT_ADDRESS = 'SP000000000000000000002Q6VF78' // Placeholder - update with your deployed contract address
export const CONTRACT_NAME = 'stacksbase-token'

// Token details
export const TOKEN_NAME = 'StacksBase Token'
export const TOKEN_SYMBOL = 'SBASE'
export const TOKEN_DECIMALS = 6

// Claim limits
export const CLAIM_AMOUNT = 1000 // 1000 tokens per claim
export const CLAIM_COOLDOWN_BLOCKS = 144 // ~24 hours (10 min blocks)

// Stacks explorer
export const EXPLORER_URL = IS_MAINNET 
  ? 'https://explorer.stacks.co' 
  : 'https://explorer.hiro.so'

// API endpoints
export const STACKS_API_URL = IS_MAINNET
  ? 'https://api.mainnet.hiro.so'
  : 'https://api.testnet.hiro.so'

// Helper functions
export function formatTokenAmount(amount: number): string {
  return (amount / Math.pow(10, TOKEN_DECIMALS)).toFixed(2)
}

export function getExplorerTxUrl(txId: string): string {
  return `${EXPLORER_URL}/txid/${txId}`
}

export function getExplorerAddressUrl(address: string): string {
  return `${EXPLORER_URL}/address/${address}`
}
