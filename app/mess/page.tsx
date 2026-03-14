import { getSheetData } from '../../lib/google-sheets';
import { Coffee, Sun, Cookie, Moon } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function MessPage() {
  const rows = await getSheetData('Mess!A2:E'); 
  const date = new Date();
  const options = { timeZone: 'Asia/Kolkata', weekday: 'long' as const };
  const todayName = new Intl.DateTimeFormat('en-US', options).format(date);
  const todaysMenu = rows.find(row => row[0]?.trim().toLowerCase() === todayName.toLowerCase());

  const meals = [
    { name: 'Breakfast', items: todaysMenu?.[1] || 'Menu not updated yet.', icon: Coffee, time: '07:30 AM' },
    { name: 'Lunch', items: todaysMenu?.[2] || 'Menu not updated yet.', icon: Sun, time: '12:30 PM' },
    { name: 'Snacks', items: todaysMenu?.[3] || 'Menu not updated yet.', icon: Cookie, time: '05:00 PM' },
    { name: 'Dinner', items: todaysMenu?.[4] || 'Menu not updated yet.', icon: Moon, time: '07:30 PM' },
  ];

  return (
    <div className="min-h-screen px-4 py-6 md:p-12 max-w-md mx-auto pb-28">
      <header className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Mess Menu</h1>
          <p className="text-sm text-text-secondary mt-1">Today's schedule</p>
        </div>
        <div className="bg-surface-hover border border-border-subtle px-3 py-1.5 rounded-lg">
          <span className="text-[11px] font-bold text-accent tracking-wider uppercase">{todayName}</span>
        </div>
      </header>

      <div className="flex flex-col gap-3">
        {meals.map((meal, index) => {
          const Icon = meal.icon;
          return (
            <div key={index} className="bg-surface border border-border-subtle p-4 rounded-2xl flex gap-3.5">
              <div className="w-10 h-10 bg-surface-hover rounded-xl flex items-center justify-center shrink-0 border border-border-subtle">
                <Icon className="text-accent" size={18} />
              </div>
              <div className="flex-1 pt-0.5">
                <div className="flex justify-between items-center mb-1.5">
                  <h2 className="text-[15px] font-semibold text-white leading-none">{meal.name}</h2>
                  <span className="text-[10px] font-medium text-text-secondary bg-bg-main px-2 py-0.5 rounded-md">{meal.time}</span>
                </div>
                <p className="text-[13px] text-text-secondary leading-relaxed pr-2">
                  {meal.items}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}