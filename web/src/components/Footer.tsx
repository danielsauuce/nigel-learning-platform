import { Instagram, Facebook, Twitter } from 'lucide-react'
import { Logo } from './ui/Logo'
import { Link } from 'react-router-dom'

const socialIcons = [
  { icon: Instagram, href: '#' },
  { icon: Facebook, href: '#' },
  { icon: Twitter, href: '#' },
]

const sections = [
  {
    title: 'Home',
    links: [
      { label: 'App', href: '#' },
      { label: 'About', href: '/about' },
      { label: 'People', href: '#' },
    ],
  },
  {
    title: 'For school',
    links: [
      { label: 'Brain training', href: '#' },
      { label: 'E-learning', href: '#' },
      { label: 'Online modules', href: '#' },
    ],
  },
  {
    title: 'Media',
    links: [
      { label: 'Support Us', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Places', href: '#' },
    ],
  },
]

export const Footer = () => (
  <footer className="bg-white pt-24 pb-12 px-6">
    <div className="max-w-7xl mx-auto space-y-20">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12">
        {/* Logo + social */}
        <div className="col-span-2 space-y-8">
          <Logo />
          <div className="flex gap-4">
            {socialIcons.map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-edulite-navy hover:bg-edulite-purple hover:text-white transition-all"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {sections.map((section) => (
          <div key={section.title}>
            <h5 className="font-bold text-lg mb-8 text-edulite-navy">
              {section.title}
            </h5>
            <ul className="space-y-4 text-edulite-gray text-sm font-medium">
              {section.links.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/') ? (
                    <Link
                      to={link.href}
                      className="hover:text-edulite-purple transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="hover:text-edulite-purple transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-edulite-gray text-xs font-bold">
          Copyright 2026 Nigel Junior — Powered by Beyond Encryption
        </p>
        <div className="flex gap-10 text-edulite-gray text-xs font-bold">
          <a href="#" className="hover:text-edulite-purple transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-edulite-purple transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  </footer>
)
