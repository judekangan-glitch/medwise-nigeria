import { Link, useLocation } from 'react-router-dom'
import { Menu, X, GraduationCap, Shield, Clock, Bell, Moon, Sun, User, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useMedwise } from '../context/MedwiseContext'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  
  // Consume Context deeply directly! No more polling localStorage
  const { user, theme, setTheme } = useMedwise()

  const navItems = [
    { path: '/learn', label: 'Learn', icon: GraduationCap },
    { path: '/verify', label: 'Verify', icon: Shield },
    { path: '/track', label: 'Track', icon: Clock },
    { path: '/reminders', label: 'Reminders', icon: Bell },
  ]

  const isActive = (path) => location.pathname.startsWith(path)

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <nav className={`glass-nav sticky top-0 z-50`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className={`font-display font-bold text-xl ${theme === 'dark' ? 'text-blue-400' : 'text-primary'}`}>
              MedWise
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    isActive(item.path)
                      ? 'bg-primary text-white shadow-md'
                      : theme === 'dark'
                      ? 'text-gray-300 hover:bg-white/10'
                      : 'text-gray-700 hover:bg-primary/5'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Theme & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Profile Widget - Inline */}
            {user && (
              <div className="hidden sm:flex items-center space-x-2 px-3 py-2 rounded-lg backdrop-blur-sm" style={{
                backgroundColor: theme === 'dark' ? 'rgba(13, 40, 24, 0.6)' : 'rgba(243, 244, 246, 0.8)'
              }}>
                <User size={16} className="text-primary" />
                <div className="text-left text-sm">
                  <p style={{color: theme === 'dark' ? '#e5e7eb' : '#111827'}} className="font-semibold leading-tight">
                    {user.username}
                  </p>
                  <p style={{color: theme === 'dark' ? '#9ca3af' : '#6b7280'}} className="text-xs leading-tight">
                    Lv {user.level} • ⭐ {user.points}
                  </p>
                </div>
              </div>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all ${
                theme === 'dark'
                  ? 'bg-white/10 text-yellow-400 hover:bg-white/20'
                  : 'bg-primary/10 text-primary hover:bg-primary/20'
              }`}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-full transition-all ${
                theme === 'dark' ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-primary/10 text-gray-700'
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className={`md:hidden py-4 space-y-2 backdrop-blur-xl border-t ${theme === 'dark' ? 'bg-deep-surface/95 border-deep-border' : 'bg-white/95 border-gray-100'}`}>
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActive(item.path)
                      ? 'bg-primary text-white shadow-md'
                      : theme === 'dark'
                      ? 'text-gray-300 hover:bg-white/10'
                      : 'text-gray-700 hover:bg-primary/5'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}
