import { ReactNode } from 'react'
import Link from 'next/link'

interface ButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  target?: string
  download?: boolean | string
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  target,
  download,
  type = 'button',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 focus:ring-offset-bg-primary'

  const variants = {
    primary:
      'bg-accent-blue text-white hover:bg-blue-500 shadow-lg hover:shadow-accent-blue/25',
    ghost: 'text-accent-blue hover:bg-white/5 border border-transparent',
    outline:
      'border border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-white',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-2',
  }

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('//')
    if (isExternal || target === '_blank') {
      return (
        <a
          href={href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          download={download}
          className={classes}
        >
          {children}
        </a>
      )
    }
    return (
      <Link href={href} download={download} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
