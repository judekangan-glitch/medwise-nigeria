import { Link, useLocation } from 'react-router-dom'
import { Menu, X, GraduationCap, Shield, Clock, Bell, Moon, Sun, User, LogOut, Globe, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useMedwise } from '../context/MedwiseContext'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  
  // Consume Context deeply directly! No more polling localStorage
  const { user, theme, setTheme, language, setLanguage } = useMedwise()
  const [isLangOpen, setIsLangOpen] = useState(false)
  const langDropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setIsLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const lang = (map) => map[language] ?? map['en']

  const LANG_LABELS = { en: 'English', pidgin: 'Pidgin', ha: 'Hausa', yo: 'Yoruba', ig: 'Igbo' }

  const navItems = [
    { path: '/learn', label: lang({en:'Learn',pidgin:'Learn',ha:'Koyo',yo:'Kọ́',ig:'Mụta'}), icon: GraduationCap },
    { path: '/verify', label: lang({en:'Verify',pidgin:'Check Am',ha:'Tabbatar',yo:'Ṣàyẹ̀wò',ig:'Nwalee'}), icon: Shield },
    { path: '/track', label: lang({en:'Track',pidgin:'Follow Am',ha:'Bibiye',yo:'Tọpinpin',ig:'Soro ya'}), icon: Clock },
    { path: '/reminders', label: lang({en:'Reminders',pidgin:'Reminders',ha:'Tunatarwa',yo:'Olùránnilétí',ig:'Ihe ncheta'}), icon: Bell },
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

            {/* Language Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={`flex items-center space-x-1 px-3 py-1.5 text-sm font-semibold rounded-lg transition-all border ${
                  theme === 'dark' 
                    ? 'border-white/10 text-white hover:bg-white/10 bg-deep-surface' 
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50 bg-white'
                }`}
              >
                <Globe size={16} className={theme === 'dark' ? 'text-blue-400' : 'text-primary'} />
                <span>{LANG_LABELS[language] || 'English'}</span>
                <ChevronDown size={14} className={`transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isLangOpen && (
                <div className={`absolute top-full right-0 mt-2 w-36 rounded-xl shadow-lg border overflow-hidden z-50 ${
                  theme === 'dark' ? 'bg-[#0d2818] border-white/10' : 'bg-white border-gray-100'
                }`}>
                  {Object.entries(LANG_LABELS).map(([code, label]) => (
                    <button
                      key={code}
                      onClick={() => {
                        setLanguage(code)
                        setIsLangOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        language === code
                          ? (theme === 'dark' ? 'bg-primary/20 text-white font-bold' : 'bg-blue-50 text-primary font-bold')
                          : (theme === 'dark' ? 'text-gray-300 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-50')
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

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
