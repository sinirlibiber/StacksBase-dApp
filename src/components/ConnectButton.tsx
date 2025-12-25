'use client'

import { useState } from 'react'
import { useStacksWallet } from '@/hooks/useStacksWallet'
import { Button } from '@/components/ui/button'
import { Wallet, LogOut, AlertCircle, Loader2, RefreshCw } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { WalletSelector } from '@/components/WalletSelector'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function ConnectButton(): JSX.Element {
  const { 
    address, 
    isConnected, 
    isLoading, 
    hasWallets, 
    isCheckingWallets,
    refreshWallets,
    walletType, 
    connect, 
    disconnect 
  } = useStacksWallet()
  const [showWalletSelector, setShowWalletSelector] = useState<boolean>(false)

  const formatAddress = (addr: string): string => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const getWalletIcon = (type: string | null): string => {
    switch (type) {
      case 'xverse': return '🔵'
      case 'leather': return '🟤'
      case 'okx': return '🟠'
      case 'hiro': return '🟢'
      default: return '💼'
    }
  }

  // Checking wallets - show loading state
  if (isCheckingWallets && !isConnected) {
    return (
      <Button disabled className="gap-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        Detecting Wallets...
      </Button>
    )
  }

  // No wallets installed
  if (!hasWallets && !isConnected) {
    return (
      <div className="space-y-3">
        <Alert variant="default" className="border-orange-200 bg-orange-50">
          <AlertCircle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-sm text-orange-800">
            No Stacks wallet detected. Please install one to continue.
          </AlertDescription>
        </Alert>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={refreshWallets}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
          >
            <a href="https://www.xverse.app/" target="_blank" rel="noopener noreferrer">
              🔵 Get Xverse
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
          >
            <a href="https://leather.io/install-extension" target="_blank" rel="noopener noreferrer">
              🟤 Get Leather
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
          >
            <a href="https://www.okx.com/web3" target="_blank" rel="noopener noreferrer">
              🟠 Get OKX
            </a>
          </Button>
        </div>
      </div>
    )
  }

  // Connected state
  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="px-3 py-1.5 text-sm gap-2">
          <span>{getWalletIcon(walletType)}</span>
          <span>{formatAddress(address)}</span>
        </Badge>
        <Button
          variant="outline"
          size="sm"
          onClick={() => void disconnect()}
          className="gap-2"
          disabled={isLoading}
        >
          <LogOut className="h-4 w-4" />
          Disconnect
        </Button>
      </div>
    )
  }

  // Connect button
  return (
    <>
      <Button
        onClick={() => setShowWalletSelector(true)}
        size="lg"
        className="gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Connecting...
          </>
        ) : (
          <>
            <Wallet className="h-5 w-5" />
            Connect Wallet
          </>
        )}
      </Button>

      <WalletSelector
        open={showWalletSelector}
        onClose={() => setShowWalletSelector(false)}
        onSelectWallet={(walletType) => void connect(walletType)}
        onRefresh={refreshWallets}
      />
    </>
  )
}
