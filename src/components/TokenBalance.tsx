'use client'

import { useTokenContract } from '@/hooks/useTokenContract'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Wallet, RefreshCw } from 'lucide-react'
import { TOKEN_SYMBOL } from '@/lib/stacks-config'

interface TokenBalanceProps {
  address: string | null
}

export function TokenBalance({ address }: TokenBalanceProps): JSX.Element {
  const { balance, refreshBalance } = useTokenContract(address)

  if (!address) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Your Balance
          </CardTitle>
          <CardDescription>Connect wallet to see balance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-gray-400">
            -.-- {TOKEN_SYMBOL}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Your Balance
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshBalance}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>Total {TOKEN_SYMBOL} tokens</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          {balance.formatted} {TOKEN_SYMBOL}
        </div>
        <div className="text-sm text-gray-500 mt-2">
          {balance.balance.toLocaleString()} micro-units
        </div>
      </CardContent>
    </Card>
  )
}
