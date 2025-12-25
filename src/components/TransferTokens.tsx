'use client'

import { useState } from 'react'
import { useTokenContract } from '@/hooks/useTokenContract'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Send, Loader2 } from 'lucide-react'
import { TOKEN_SYMBOL } from '@/lib/stacks-config'
import { toast } from 'sonner'

interface TransferTokensProps {
  address: string | null
}

export function TransferTokens({ address }: TransferTokensProps): JSX.Element {
  const { transferTokens, isLoading, balance } = useTokenContract(address)
  const [recipient, setRecipient] = useState<string>('')
  const [amount, setAmount] = useState<string>('')

  const handleTransfer = async (): Promise<void> => {
    if (!recipient || !amount) {
      toast.error('Please fill in all fields')
      return
    }

    const amountNum = parseFloat(amount)
    if (isNaN(amountNum) || amountNum <= 0) {
      toast.error('Please enter a valid amount')
      return
    }

    if (amountNum > parseFloat(balance.formatted)) {
      toast.error('Insufficient balance')
      return
    }

    await transferTokens(recipient, amountNum)
    setRecipient('')
    setAmount('')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5" />
          Transfer Tokens
        </CardTitle>
        <CardDescription>
          Send {TOKEN_SYMBOL} to another address
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="recipient">Recipient Address</Label>
          <Input
            id="recipient"
            placeholder="SP..."
            value={recipient}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecipient(e.target.value)}
            disabled={!address || isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount ({TOKEN_SYMBOL})</Label>
          <Input
            id="amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
            disabled={!address || isLoading}
          />
          {address && (
            <p className="text-xs text-gray-500">
              Available: {balance.formatted} {TOKEN_SYMBOL}
            </p>
          )}
        </div>

        <Button
          onClick={handleTransfer}
          disabled={!address || isLoading || !recipient || !amount}
          className="w-full gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send Tokens
            </>
          )}
        </Button>

        {!address && (
          <p className="text-sm text-center text-gray-500">
            Connect your wallet to transfer tokens
          </p>
        )}
      </CardContent>
    </Card>
  )
}
