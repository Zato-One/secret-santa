import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-snow-50 via-christmas-red-50 to-christmas-green-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(220,38,38,0.03)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(22,163,74,0.03)_0%,transparent_50%)]" />
      <div className="relative">
        {children}
      </div>
    </div>
  )
}

export default Layout
