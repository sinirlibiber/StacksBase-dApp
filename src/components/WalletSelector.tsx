'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Download, RefreshCw } from 'lucide-react'
import { detectInstalledWallets } from '@/lib/wallet-providers'
import type { WalletInfo, WalletType } from '@/types/wallets'

interface WalletSelectorProps {
  open: boolean
  onClose: () => void
  onSelectWallet: (walletType: WalletType) => void
  onRefresh?: () => void
}

export function WalletSelector({ open, onClose, onSelectWallet, onRefresh }: WalletSelectorProps): JSX.Element {
  const [wallets, setWallets] = useState<WalletInfo[]>([])

  useEffect(() => {
    if (open) {
      const detected = detectInstalledWallets()
      setWallets(detected)
    }
  }, [open])

  const installedWallets = wallets.filter((w: WalletInfo) => w.isInstalled)
  const notInstalledWallets = wallets.filter((w: WalletInfo) => !w.isInstalled)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>Connect Wallet</DialogTitle>
              <DialogDescription>
                Choose a wallet to connect to StacksBase
              </DialogDescription>
            </div>
            {onRefresh && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRefresh}
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Installed Wallets */}
          {installedWallets.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Installed Wallets</p>
              {installedWallets.map((wallet: WalletInfo) => (
                <Button
                  key={wallet.id}
                  variant="outline"
                  className="w-full justify-start gap-3 h-auto py-3"
                  onClick={() => {
                    onSelectWallet(wallet.id)
                    onClose()
                  }}
                >
                  <span className="text-2xl">{wallet.icon}</span>
                  <div className="text-left flex-1">
                    <div className="font-semibold">{wallet.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {wallet.description}
                    </div>
                  </div>
                  <Badge variant="secondary" className="ml-auto">
                    Ready
                  </Badge>
                </Button>
              ))}
            </div>
          )}

          {/* Not Installed Wallets */}
          {notInstalledWallets.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                {installedWallets.length > 0 ? 'Other Wallets' : 'No Wallet Detected - Please Install'}
              </p>
              {notInstalledWallets.map((wallet: WalletInfo) => (
                <div
                  key={wallet.id}
                  className="flex items-center gap-3 p-3 border rounded-lg opacity-60"
                >
                  <span className="text-2xl">{wallet.icon}</span>
                  <div className="text-left flex-1">
                    <div className="font-semibold text-sm">{wallet.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {wallet.description}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    asChild
                    className="ml-auto"
                  >
                    <a
                      href={wallet.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gap-1"
                    >
                      <Download className="h-3 w-3" />
                      Install
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Help Text */}
          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground text-center">
              New to Stacks?{' '}
              <a
                href="https://www.stacks.co/learn/wallets"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                Learn about wallets
                <ExternalLink className="h-3 w-3" />
              </a>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
