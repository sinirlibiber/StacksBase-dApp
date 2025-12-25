'use client'
import { ConnectButton } from '@/components/ConnectButton'
import { MintTokens } from '@/components/MintTokens'
import { TokenBalance } from '@/components/TokenBalance'
import { TransferTokens } from '@/components/TransferTokens'
import { SocialShare } from '@/components/SocialShare'
import { useStacksWallet } from '@/hooks/useStacksWallet'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Trophy, Coins, Zap, Shield, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import { useAddMiniApp } from "@/hooks/useAddMiniApp";
import { useQuickAuth } from "@/hooks/useQuickAuth";
import { useIsInFarcaster } from "@/hooks/useIsInFarcaster";

export default function Home(): JSX.Element {
    const { addMiniApp } = useAddMiniApp();
    const isInFarcaster = useIsInFarcaster()
    useQuickAuth(isInFarcaster)
    useEffect(() => {
      const tryAddMiniApp = async () => {
        try {
          await addMiniApp()
        } catch (error) {
          console.error('Failed to add mini app:', error)
        }

      }

    

      tryAddMiniApp()
    }, [addMiniApp])
    useEffect(() => {
      const initializeFarcaster = async () => {
        try {
          await new Promise(resolve => setTimeout(resolve, 100))
          
          if (document.readyState !== 'complete') {
            await new Promise<void>(resolve => {
              if (document.readyState === 'complete') {
                resolve()
              } else {
                window.addEventListener('load', () => resolve(), { once: true })
              }

            })
          }

    

          await sdk.actions.ready()
          console.log('Farcaster SDK initialized successfully - app fully loaded')
        } catch (error) {
          console.error('Failed to initialize Farcaster SDK:', error)
          
          setTimeout(async () => {
            try {
              await sdk.actions.ready()
              console.log('Farcaster SDK initialized on retry')
            } catch (retryError) {
              console.error('Farcaster SDK retry failed:', retryError)
            }

          }, 1000)
        }

      }

    

      initializeFarcaster()
    }, [])
  const { address } = useStacksWallet()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Coins className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                StacksBase
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">Bitcoin L2 Token Faucet</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/leaderboard">
              <Button variant="outline" size="sm" className="gap-2">
                <Trophy className="h-4 w-4" />
                Leaderboard
              </Button>
            </Link>
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-block">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-950/50 rounded-full text-sm font-medium text-orange-600 dark:text-orange-400">
              <Zap className="h-4 w-4" />
              Built on Stacks - Bitcoin Layer 2
            </div>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-purple-500 bg-clip-text text-transparent leading-tight">
            Claim Free SBASE Tokens
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get 1,000 SBASE tokens daily. No cost, no catch. Just connect your wallet and claim!
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            <Card className="border-orange-200 dark:border-orange-900">
              <CardContent className="pt-6 text-center">
                <Shield className="h-8 w-8 mx-auto mb-3 text-orange-500" />
                <h3 className="font-semibold mb-2">Secure on Bitcoin</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Built on Stacks, secured by Bitcoin&apos;s proof of work
                </p>
              </CardContent>
            </Card>

            <Card className="border-orange-200 dark:border-orange-900">
              <CardContent className="pt-6 text-center">
                <Coins className="h-8 w-8 mx-auto mb-3 text-orange-500" />
                <h3 className="font-semibold mb-2">Daily Claims</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Claim 1,000 tokens every 24 hours. Build your stack!
                </p>
              </CardContent>
            </Card>

            <Card className="border-orange-200 dark:border-orange-900">
              <CardContent className="pt-6 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-3 text-orange-500" />
                <h3 className="font-semibold mb-2">Tradeable</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Transfer tokens instantly to any Stacks address
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Left Column */}
          <div className="space-y-6">
            <MintTokens address={address} />
            <SocialShare />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <TokenBalance address={address} />
            <TransferTokens address={address} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-3">About StacksBase</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                A community token distribution platform built for Stacks Builder Challenges
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://www.stacks.co/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-orange-500">
                    Stacks Blockchain
                  </a>
                </li>
                <li>
                  <a href="https://docs.reown.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-orange-500">
                    Reown AppKit Docs
                  </a>
                </li>
                <li>
                  <Link href="/leaderboard" className="text-gray-600 dark:text-gray-400 hover:text-orange-500">
                    View Leaderboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Connect</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Built for Talent Protocol&apos;s Stacks Builder Challenges Week 3
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t text-center text-sm text-gray-600 dark:text-gray-400">
            © 2024 StacksBase. Built on Stacks, secured by Bitcoin.
          </div>
        </div>
      </footer>
    </div>
  )
}
