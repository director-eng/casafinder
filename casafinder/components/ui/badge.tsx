import { type ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'green' | 'amber' | 'blue' | 'gray' | 'red'
  className?: string
}

const variantClasses = {
  green: 'bg-[#EAF2FF] text-[#0F5AE5]',
  amber: 'bg-amber-100 text-amber-800',
  blue: 'bg-blue-100 text-blue-800',
  gray: 'bg-gray-100 text-gray-700',
  red: 'bg-red-100 text-red-800',
}

export function Badge({ children, variant = 'gray', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
