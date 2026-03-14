import './globals.css'
import Navigation from '../components/Navigation'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* --- Campaign Fixed Badge --- */}
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
          <div className="bg-accent/90 text-white shadow-lg px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold border border-accent/50 animate-in fade-in duration-300 pointer-events-auto">
            <span>
              Made for IITP Students by <span className="underline decoration-white/60 underline-offset-4">Mohit Joshi</span>
            </span>
            <span className="ml-2 bg-white/20 rounded px-2 py-0.5 text-xs font-bold tracking-wide">SWB Candidate</span>
          </div>
        </div>
        {/* --- End Campaign Badge --- */}

        <Navigation />
      </body>
    </html>
  );
}