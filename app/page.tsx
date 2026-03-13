import { Train, Utensils } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen p-6 md:p-12 max-w-4xl mx-auto">
      <header className="mb-12 mt-4 md:mt-0">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">Welcome to IITP.</h1>
        <p className="text-text-secondary text-lg">Your campus life, simplified.</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/mess" className="group relative overflow-hidden bg-surface border border-border-subtle p-6 rounded-3xl hover:border-accent/50 transition-all duration-300 shadow-lg">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Utensils size={80} />
          </div>
          <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mb-6">
            <Utensils className="text-accent" size={24} />
          </div>
          <h2 className="text-2xl font-semibold mb-1">Mess Menu</h2>
          <p className="text-text-secondary">Check today's breakfast, lunch, and dinner.</p>
        </Link>

        <Link href="/trains" className="group relative overflow-hidden bg-surface border border-border-subtle p-6 rounded-3xl hover:border-accent/50 transition-all duration-300 shadow-lg">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Train size={80} />
          </div>
          <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mb-6">
            <Train className="text-accent" size={24} />
          </div>
          <h2 className="text-2xl font-semibold mb-1">Train Schedule</h2>
          <p className="text-text-secondary">Live timings from Bihta to Patna.</p>
        </Link>
      </div>
    </div>
  );
}