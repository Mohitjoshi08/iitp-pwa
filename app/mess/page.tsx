import { getSheetData } from '../../lib/google-sheets';
import { Coffee, Sun, Sunset, Moon } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function MessPage() {
  // Fetch data from the "Mess" tab, columns A to E
  const rows = await getSheetData('Mess!A2:E'); 

  // Figure out what day it is right now in India
  const now = new Date();
  const istTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = days[istTime.getDay()];

  // Find the row in the Google Sheet that matches today's day
  const todayMenu = rows.find(row => row[0]?.trim().toLowerCase() === currentDay.toLowerCase());

  const meals = [
    { name: 'Breakfast', time: '7:30 AM - 9:30 AM', icon: Coffee, items: todayMenu?.[1] || 'Menu not updated' },
    { name: 'Lunch', time: '12:30 PM - 2:30 PM', icon: Sun, items: todayMenu?.[2] || 'Menu not updated' },
    { name: 'Snacks', time: '5:00 PM - 6:00 PM', icon: Sunset, items: todayMenu?.[3] || 'Menu not updated' },
    { name: 'Dinner', time: '7:30 PM - 9:30 PM', icon: Moon, items: todayMenu?.[4] || 'Menu not updated' },
  ];

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-3xl mx-auto pb-32">
      <header className="mb-10 mt-4 md:mt-0">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold tracking-tight">Mess Menu</h1>
          <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-bold tracking-wider">
            {currentDay.toUpperCase()}
          </span>
        </div>
        <p className="text-text-secondary">Today's food schedule.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {meals.map((meal, index) => {
          const Icon = meal.icon;
          return (
            <div key={index} className="group bg-surface border border-border-subtle p-6 rounded-3xl hover:border-accent/50 hover:bg-surface-hover transition-all duration-300 shadow-lg flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 w-10 h-10 rounded-full flex items-center justify-center">
                    <Icon className="text-accent" size={20} />
                  </div>
                  <h2 className="text-xl font-semibold text-white">{meal.name}</h2>
                </div>
                <span className="text-xs font-medium text-text-secondary bg-surface-hover px-2 py-1 rounded-md border border-border-subtle">
                  {meal.time}
                </span>
              </div>
              
              <div className="bg-bg-main/50 p-4 rounded-2xl border border-border-subtle flex-grow">
                <p className="text-text-primary leading-relaxed whitespace-pre-wrap">
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
