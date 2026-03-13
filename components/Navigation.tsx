'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Train, Utensils, AlertTriangle, Car } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Trains', href: '/trains', icon: Train },
    { name: 'Mess', href: '/mess', icon: Utensils },
    { name: 'Cabs', href: '/transport', icon: Car },
    { name: 'Reports', href: '/complaints', icon: AlertTriangle },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col w-64 h-screen bg-surface/50 backdrop-blur-xl border-r border-border-subtle p-6 fixed left-0 top-0 z-50">
        <div className="text-xl font-bold tracking-tight mb-10 text-white">IITP<span className="text-accent">Hub</span></div>
        <div className="flex flex-col gap-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link key={link.name} href={link.href} className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-accent/10 text-accent font-medium' : 'text-text-secondary hover:text-white hover:bg-surface-hover'}`}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Floating Dock */}
      <nav className="md:hidden fixed bottom-6 left-4 right-4 bg-surface/80 backdrop-blur-xl border border-border-subtle rounded-2xl flex justify-around p-3 z-50 shadow-2xl shadow-black/50">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link key={link.name} href={link.href} className="flex flex-col items-center gap-1 w-16">
              <div className={`p-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-accent/10 text-accent' : 'text-text-secondary'}`}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] ${isActive ? 'text-accent font-medium' : 'text-text-secondary'}`}>{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}