import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'blue' | 'gold' | 'subtle' | 'green'
  className?: string
}

export default function Badge({
  children,
  variant = 'blue',
  className = '',
}: BadgeProps) {
  const variants = {
    blue: 'bg-accent-blue/15 text-accent-blue border border-accent-blue/20',
    gold: 'bg-accent-gold/15 text-accent-gold border border-accent-gold/20',
    subtle: 'bg-white/5 text-text-secondary border border-white/[0.06]',
    green: 'bg-green-500/15 text-green-400 border border-green-500/20',
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
