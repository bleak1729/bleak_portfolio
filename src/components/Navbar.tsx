import { useState, useEffect } from 'react'
import { Menu, Moon, Sun } from 'lucide-react'

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import Logo from './Logo'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { label: 'Acerca', href: '#about' },
  { label: 'Servicios', href: '#services' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contacto', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-md shadow-sm border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-20">
        {/* ── Desktop ── */}
        <nav className="hidden h-full lg:flex items-center justify-between">
          {/* Left: logo */}
          <a href="#top" className="flex items-center">
            <Logo className="h-14 w-auto" typeClassName="text-base" />
          </a>

          {/* Center: navigation links */}
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              {navLinks.map((link) => (
                <NavigationMenuLink key={link.href} asChild>
                  <a
                    href={link.href}
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground focus:outline-none"
                  >
                    {link.label}
                  </a>
                </NavigationMenuLink>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right: theme toggle + CTA */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggle}
              aria-label="Cambiar tema"
              className="rounded-full"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <Button asChild size="sm" className="rounded-full px-5">
              <a href="#contact">Agendar llamada</a>
            </Button>
          </div>
        </nav>

        {/* ── Mobile ── */}
        <div className="flex h-full items-center justify-between lg:hidden">
          <a href="#top" className="flex items-center">
            <Logo className="h-12 w-auto" typeClassName="text-base" />
          </a>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggle}
              aria-label="Cambiar tema"
              className="rounded-full"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href="#top" className="flex items-center">
                      <Logo className="h-10 w-auto" typeClassName="text-base" />
                    </a>
                  </SheetTitle>
                </SheetHeader>

                <div className="my-6 flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="flex h-10 items-center rounded-md px-4 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <Button asChild className="w-full rounded-full">
                    <a href="#contact">Agendar llamada</a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
