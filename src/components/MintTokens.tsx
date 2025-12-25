'use client'

import { useTokenContract } from '@/hooks/useTokenContract'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Coins, Loader2 } from 'lucide-react'
import { CLAIM_AMOUNT, TOKEN_SYMBOL } from '@/lib/stacks-config'

interface MintTokensProps {
  address: string | null
}

export function MintTokens({ address }: MintTokensProps): JSX.Element {
  const { claimTokens, isLoading } = useTokenContract(address)

  return (
    <Card className="border-2 border-orange-500/20 bg-gradient-to-br from-orange-50/50 to-red-50/50 dark:from-orange-950/20 dark:to-red-950/20">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          Claim Free Tokens
        </CardTitle>
        <CardDescription className="text-lg">
          Get {CLAIM_AMOUNT} {TOKEN_SYMBOL} tokens instantly!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-lg border border-orange-200 dark:border-orange-800">
          <div className="text-5xl font-bold text-orange-500 mb-2">
            {CLAIM_AMOUNT}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {TOKEN_SYMBOL} per claim
          </div>
        </div>

        <Button
          onClick={claimTokens}
          disabled={!address || isLoading}
          size="lg"
          className="w-full h-14 text-lg gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Coins className="h-5 w-5" />
              Claim Tokens
            </>
          )}
        </Button>

        {!address && (
          <p className="text-sm text-center text-gray-500">
            Connect your wallet to claim tokens
          </p>
        )}

        <div className="text-xs text-center text-gray-500 space-y-1">
          <p>• One claim per day per wallet</p>
          <p>• Tokens are immediately tradeable</p>
          <p>• Built on Stacks blockchain</p>
        </div>
      </CardContent>
    </Card>
  )
}
