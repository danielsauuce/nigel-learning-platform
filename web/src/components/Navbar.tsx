import { Logo } from './ui/Logo'
import { Link } from 'react-router-dom'

export const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <Logo />

      <div className="hidden md:flex items-center gap-10">
        {[
          { name: 'Home', path: '/' },
          { name: 'Features', path: '/features' },
          { name: 'About Us', path: '/about' },
        ].map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="text-edulite-navy font-semibold hover:text-edulite-purple transition-colors text-sm"
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/login"
          className="text-edulite-navy font-bold px-4 py-2 text-sm"
        >
          Login
        </Link>

        <button className="bg-edulite-purple/10 text-edulite-purple font-bold px-6 py-2.5 rounded-full border border-edulite-purple/20 text-sm">
          Download App
        </button>
      </div>
    </div>
  </nav>
)
