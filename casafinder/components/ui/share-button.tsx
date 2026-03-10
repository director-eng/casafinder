'use client'

interface ShareButtonProps {
  title: string
}

export function ShareButton({ title }: ShareButtonProps) {
  return (
    <button
      onClick={() =>
        navigator.share?.({ title, url: window.location.href })
      }
      className="w-full py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
    >
      Share this listing
    </button>
  )
}
