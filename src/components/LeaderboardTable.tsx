'use client'

import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy, Medal, Award } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface LeaderboardEntry {
  rank: number
  address: string
  claims: number
  totalTokens: string
}

export function LeaderboardTable(): JSX.Element {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async (): Promise<void> => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/leaderboard')
      const data = await response.json()
      setLeaderboard(data.leaderboard || [])
    } catch (error) {
      console.error('Error fetching leaderboard:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatAddress = (addr: string): string => {
    return `${addr.slice(0, 8)}...${addr.slice(-6)}`
  }

  const getRankIcon = (rank: number): JSX.Element | null => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-orange-600" />
      default:
        return null
    }
  }

  const getRankBadge = (rank: number): string => {
    if (rank <= 3) return 'default'
    if (rank <= 10) return 'secondary'
    return 'outline'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-orange-500" />
          Leaderboard
        </CardTitle>
        <CardDescription>
          Top claimers in the StacksBase community
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">
            Loading leaderboard...
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No data yet. Be the first to claim!
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">Rank</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead className="text-right">Claims</TableHead>
                  <TableHead className="text-right">Total Tokens</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard.map((entry: LeaderboardEntry) => (
                  <TableRow key={entry.address}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getRankIcon(entry.rank)}
                        <Badge variant={getRankBadge(entry.rank) as "default" | "secondary" | "outline"}>
                          #{entry.rank}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono">
                      {formatAddress(entry.address)}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {entry.claims}
                    </TableCell>
                    <TableCell className="text-right text-orange-500 font-bold">
                      {entry.totalTokens}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
