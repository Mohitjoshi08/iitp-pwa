import { getSheetData } from '../../lib/google-sheets';
import { Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function TrainsPage() {
  const rows = await getSheetData('Trains!A2:E'); 
  const now = new Date();
  const istTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const currentMinutes = istTime.getHours() * 60 + istTime.getMinutes();

  const processedTrains = rows.map((train) => {
    const name = train[0]; const number = train[1]; const timeString = train[4]; 
    if (!timeString || !name) return null;
    const [hours, minutes] = timeString.split(':').map(Number);
    const trainMinutes = hours * 60 + minutes;
    let day = "Today"; let sortValue = trainMinutes;
    if (trainMinutes < currentMinutes) { day = "Tomorrow"; sortValue += 24 * 60; }
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    return { name, number, displayTime, day, sortValue };
  }).filter(Boolean).sort((a, b) => a!.sortValue - b!.sortValue);

  return (
    <div className="min-h-screen px-4 py-6 md:p-12 max-w-md mx-auto pb-28">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">Train Schedule</h1>
        <p className="text-sm text-text-secondary mt-1">Bihta ➔ Patna Jn.</p>
      </header>

      <div className="flex flex-col gap-3">
        {processedTrains.map((train, index) => (
          <div key={index} className={`bg-surface border border-border-subtle p-3.5 rounded-2xl flex justify-between items-center ${train!.day === 'Tomorrow' ? 'opacity-50' : ''}`}>
            <div className="flex flex-col">
              <h3 className="text-[15px] font-semibold text-white">{train!.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-mono font-bold text-accent bg-accent/10 px-1.5 py-0.5 rounded uppercase">{train!.number}</span>
                {train!.day === 'Tomorrow' && <span className="text-[10px] text-text-secondary">Tomorrow</span>}
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-surface-hover px-3 py-1.5 rounded-xl border border-border-subtle">
              <Clock size={14} className={train!.day === 'Today' ? 'text-accent' : 'text-text-secondary'} />
              <span className={`text-[13px] font-bold ${train!.day === 'Today' ? 'text-white' : 'text-text-secondary'}`}>{train!.displayTime}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}