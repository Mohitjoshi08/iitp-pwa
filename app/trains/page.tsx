'use client';

import { useState, useEffect } from 'react';
import { Clock, Calendar, ArrowRightLeft, Loader2, Train } from 'lucide-react';

interface TrainData {
  number: string;
  name: string;
  src: string;
  dst: string;
  time: string;
  displayTime?: string;
  day?: string;
  sortValue?: number;
}

export default function TrainsPage() {
  const [direction, setDirection] = useState<'BTA_PNBE' | 'PNBE_BTA'>('BTA_PNBE');
  const [trains, setTrains] = useState<TrainData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrains() {
      setLoading(true);
      try {
        const res = await fetch(`/api/trains?direction=${direction}`);
        const json = await res.json();
        
        if (json.success) {
          processAndSetTrains(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch trains API", error);
      }
      setLoading(false);
    }
    
    fetchTrains();
  }, [direction]);

  function processAndSetTrains(rawTrains: TrainData[]) {
    const now = new Date();
    const istTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    const currentMinutes = istTime.getHours() * 60 + istTime.getMinutes();

    const processed = rawTrains.map((train) => {
      const [hours, minutes] = train.time.split(':').map(Number);
      const trainMinutes = hours * 60 + minutes;

      let day = "Today";
      let sortValue = trainMinutes;

      if (trainMinutes < currentMinutes) {
        day = "Tomorrow";
        sortValue += 24 * 60; // push to bottom
      }

      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHour = hours % 12 || 12;
      const displayTime = `${displayHour}:${minutes.toString().padStart(2, '0')} ${ampm}`;

      return { ...train, displayTime, day, sortValue };
    });

    processed.sort((a, b) => (a.sortValue || 0) - (b.sortValue || 0));
    setTrains(processed);
  }

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-3xl mx-auto pb-32">
      <header className="mb-8 mt-4 md:mt-0 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Live Train Schedule</h1>
          <p className="text-text-secondary">Official local timings via API.</p>
        </div>
        
        {/* Direction Toggle */}
        <div className="flex bg-surface-hover p-1 rounded-xl border border-border-subtle shrink-0">
          <button 
            onClick={() => setDirection('BTA_PNBE')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${direction === 'BTA_PNBE' ? 'bg-accent text-white shadow-md' : 'text-text-secondary hover:text-white'}`}
          >
            Bihta <ArrowRightLeft size={14} /> Patna
          </button>
          <button 
            onClick={() => setDirection('PNBE_BTA')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${direction === 'PNBE_BTA' ? 'bg-accent text-white shadow-md' : 'text-text-secondary hover:text-white'}`}
          >
            Patna <ArrowRightLeft size={14} /> Bihta
          </button>
        </div>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-text-secondary">
          <Loader2 className="animate-spin mb-4" size={32} />
          <p>Fetching live schedule...</p>
        </div>
      ) : trains.length === 0 ? (
        <div className="bg-surface/50 border border-border-subtle p-8 rounded-3xl text-center">
          <p className="text-text-secondary">No trains found for this route.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {trains.map((train, index) => (
            <div key={index} className={`group bg-surface border border-border-subtle p-5 rounded-2xl flex justify-between items-center hover:bg-surface-hover transition-colors shadow-lg ${train.day === 'Tomorrow' ? 'opacity-60' : ''}`}>  
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="bg-accent/10 text-accent text-xs px-2.5 py-1 rounded-md font-mono font-bold tracking-wider border border-accent/20">
                    {train.number}
                  </span>
                  <h3 className="font-semibold text-white text-lg tracking-tight flex items-center gap-2">
                    <Train size={18} className="text-text-secondary hidden md:block" />
                    {train.name}
                  </h3>
                </div>
                
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className={train.day === 'Today' ? 'text-green-400' : 'text-text-secondary'} />
                    <span className={`text-sm font-medium ${train.day === 'Today' ? 'text-green-400' : 'text-text-secondary'}`}>  
                      {train.day}
                    </span>
                  </div>
                  <div className="text-xs text-text-secondary font-medium bg-bg-main px-2 py-0.5 rounded border border-border-subtle">
                    {train.src} ➔ {train.dst}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2 bg-bg-main border border-border-subtle px-4 py-2.5 rounded-xl shadow-inner">
                  <Clock size={16} className={train.day === 'Today' ? 'text-white' : 'text-text-secondary'} />
                  <span className={`text-xl font-bold tracking-tight ${train.day === 'Today' ? 'text-white' : 'text-text-secondary'}`}>  
                    {train.displayTime}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}