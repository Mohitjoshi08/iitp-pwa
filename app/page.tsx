export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-surface p-8 rounded-2xl border border-gray-800 shadow-[0_0_15px_rgba(0,243,255,0.2)] text-center max-w-md w-full">
        <h1 className="text-4xl font-bold text-neonBlue mb-2">IITP Hub</h1>
        <p className="text-textMuted mb-8">Your ultimate campus companion.</p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background p-4 rounded-xl border border-gray-800 hover:border-neonPurple transition-colors cursor-pointer">
            <h2 className="text-neonPurple font-bold">Mess Menu</h2>
            <p className="text-sm text-textMuted">Check today's food</p>
          </div>
          <div className="bg-background p-4 rounded-xl border border-gray-800 hover:border-neonBlue transition-colors cursor-pointer">
            <h2 className="text-neonBlue font-bold">Train Times</h2>
            <p className="text-sm text-textMuted">Bihta to Patna</p>
          </div>
        </div>
      </div>
    </div>
  );
}