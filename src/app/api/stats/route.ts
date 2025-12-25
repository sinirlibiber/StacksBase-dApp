import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

interface Stats {
  totalUsers: number
  totalClaims: number
  totalTokensDistributed: string
  averageClaimsPerUser: number
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Mock stats - in production, fetch from contract or database
    const stats: Stats = {
      totalUsers: 247,
      totalClaims: 1834,
      totalTokensDistributed: '1,834,000',
      averageClaimsPerUser: 7.4,
    }

    return NextResponse.json({
      success: true,
      stats,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
