import type { Metadata } from 'next'
import WorkPageClient from './WorkPageClient'

export const metadata: Metadata = {
  title: 'Work — Vinay Krishnan',
  description:
    'Case studies and product work by Vinay Krishnan — PokerBoss, Loco Studio, Cricket.com and more.',
}

export default function WorkPage() {
  return <WorkPageClient />
}
