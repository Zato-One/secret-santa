import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  const snowflakes = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${10 + Math.random() * 15}s`,
    animationDelay: `${Math.random() * 10}s`,
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-snow-50 via-christmas-red-50 to-christmas-green-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(220,38,38,0.03)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(22,163,74,0.03)_0%,transparent_50%)]" />

      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: flake.left,
            animationDuration: flake.animationDuration,
            animationDelay: flake.animationDelay,
          }}
        >
          ❄
        </div>
      ))}

      <div className="absolute top-4 left-4 text-2xl star-decoration hidden sm:block">⭐</div>
      <div className="absolute top-8 right-8 text-2xl star-decoration hidden sm:block" style={{ animationDelay: '1s' }}>✨</div>
      <div className="absolute bottom-20 left-8 text-3xl star-decoration hidden md:block" style={{ animationDelay: '2s' }}>🎄</div>
      <div className="absolute bottom-32 right-12 text-2xl star-decoration hidden md:block" style={{ animationDelay: '1.5s' }}>⭐</div>

      <div className="relative">
        {children}
      </div>
    </div>
  )
}

export default Layout
