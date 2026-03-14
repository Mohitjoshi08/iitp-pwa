'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Store, Train, Car, AlertTriangle } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Shops', href: '/', icon: Store },
    { name: 'Trains', href: '/trains', icon: Train },
    { name: 'Cabs', href: '/transport', icon: Car },
    { name: 'Reports', href: '/complaints', icon: AlertTriangle },
  ];

  return (
    <>
      {/* DESKTOP SIDEBAR (Hidden on mobile) */}
      <nav className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-64 bg-surface border-r border-border-subtle p-6 z-50">
        <h1 className="text-2xl font-bold text-white mb-10 tracking-tight">IITP Hub</h1>
        <div className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 active:scale-95 ${
                  isActive 
                    ? 'bg-accent/10 text-accent font-semibold' 
                    : 'text-text-secondary hover:bg-surface-hover hover:text-white'
                }`}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* MOBILE BOTTOM NAVIGATION (Premium Touch Setup) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface/95 backdrop-blur-xl border-t border-border-subtle z-50 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
        <div className="flex justify-between items-center h-20 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.name} 
                href={item.href}
                // flex-1 and h-full makes the ENTIRE block clickable, not just the icon!
                className="flex-1 h-full flex flex-col items-center justify-center group"
                style={{ WebkitTapHighlightColor: 'transparent' }} // Removes the ugly blue Android box
              >
                {/* The "Bubble" that squishes when tapped */}
                <div className={`flex flex-col items-center justify-center w-16 h-10 rounded-2xl transition-all duration-200 ease-out group-active:scale-75 group-active:bg-white/20 ${
                  isActive ? 'bg-accent/15 text-accent shadow-inner' : 'text-text-secondary bg-transparent'
                }`}>
                  <Icon 
                    size={22} 
                    className={`transition-transform duration-300 ${isActive ? 'scale-110 stroke-[2.5px]' : 'scale-100 stroke-2'}`} 
                  />
                </div>
                
                {/* The tiny text below the icon */}
                <span className={`text-[11px] font-medium mt-1.5 transition-colors duration-200 ${
                  isActive ? 'text-accent' : 'text-text-secondary'
                }`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}