'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Share2, Twitter } from 'lucide-react'
import { TOKEN_SYMBOL } from '@/lib/stacks-config'

export function SocialShare(): JSX.Element {
  const shareText = `Just claimed free ${TOKEN_SYMBOL} tokens on StacksBase! 🎉\n\nBuilt on @Stacks - Bitcoin L2\n\nClaim yours now 👇`
  const shareUrl = 'https://stacksbase.vercel.app'

  const handleTwitterShare = (): void => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(twitterUrl, '_blank', 'width=550,height=420')
  }

  const handleGenericShare = async (): Promise<void> => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'StacksBase - Free Tokens',
          text: shareText,
          url: shareUrl,
        })
      } catch (error) {
        console.log('Share cancelled or failed:', error)
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5" />
          Share & Earn
        </CardTitle>
        <CardDescription>
          Share StacksBase on social media and help grow the community!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          onClick={handleTwitterShare}
          className="w-full gap-2 bg-[#1DA1F2] hover:bg-[#1a8cd8]"
        >
          <Twitter className="h-4 w-4" />
          Share on Twitter
        </Button>

        <Button
          onClick={handleGenericShare}
          variant="outline"
          className="w-full gap-2"
        >
          <Share2 className="h-4 w-4" />
          Share via...
        </Button>

        <div className="text-xs text-center text-gray-500 mt-4 space-y-1">
          <p>🎯 Help us reach 1000 users to unlock bonus rewards!</p>
          <p>📊 More users = Higher leaderboard points</p>
        </div>
      </CardContent>
    </Card>
  )
}
