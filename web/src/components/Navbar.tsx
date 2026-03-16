import { useState } from 'react'
import { Logo } from './ui/Logo'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Features', path: '/features' },
  { name: 'About Us', path: '/about' },
]

export const Navbar = () => {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Logo />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`font-semibold text-sm transition-colors ${
                location.pathname === item.path
                  ? 'text-edulite-purple'
                  : 'text-edulite-navy hover:text-edulite-purple'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="text-edulite-navy font-bold px-4 py-2 text-sm hover:text-edulite-purple transition-colors"
          >
            Login
          </Link>
          <button className="bg-edulite-purple/10 text-edulite-purple font-bold px-6 py-2.5 rounded-full border border-edulite-purple/20 text-sm hover:bg-edulite-purple hover:text-white transition-all">
            Download App
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <X className="w-5 h-5 text-edulite-navy" />
          ) : (
            <Menu className="w-5 h-5 text-edulite-navy" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 pb-6 pt-4 space-y-4">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block font-semibold text-sm py-2 ${
                location.pathname === item.path
                  ? 'text-edulite-purple'
                  : 'text-edulite-navy'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-3">
            <Link
              to="/login"
              className="text-edulite-navy font-bold text-sm"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
            <button className="bg-edulite-purple text-white font-bold px-6 py-3 rounded-full text-sm w-full">
              Download App
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
