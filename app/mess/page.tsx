import { getSheetData } from '../../lib/google-sheets';
import { Coffee, UtensilsCrossed, Moon, Sun } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function MessPage() {
  // Fetch from a tab named "Mess"
  const rows = await getSheetData('Mess!A2:C'); 

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-3xl mx-auto pb-32">
      <header className="mb-10 mt-4 md:mt-0">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Mess Menu</h1>
        <p className="text-text-secondary">Today's food schedule.</p>
      </header>

      {(!rows || rows.length === 0) ? (
        <div className="bg-surface/50 border border-border-subtle p-8 rounded-3xl text-center">
          <p className="text-text-secondary">Menu not updated. Please check the Google Sheet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {rows.map((meal, index) => {
            const mealName = meal[0] || "Meal"; // e.g., Breakfast, Lunch
            const items = meal[1] || "Items not listed";
            const time = meal[2] || "";

            // Pick icon based on meal name
            let Icon = UtensilsCrossed;
            if (mealName.toLowerCase().includes('break')) Icon = Coffee;
            if (mealName.toLowerCase().includes('lunch')) Icon = Sun;
            if (mealName.toLowerCase().includes('dinner')) Icon = Moon;

            return (
              <div key={index} className="bg-surface border border-border-subtle p-6 rounded-3xl shadow-lg flex flex-col md:flex-row md:items-center gap-4">
                <div className="w-14 h-14 bg-surface-hover rounded-2xl flex items-center justify-center border border-border-subtle shrink-0">
                  <Icon className="text-accent" size={28} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h2 className="text-xl font-bold text-white tracking-tight">{mealName}</h2>
                    <span className="text-xs font-bold bg-accent/10 text-accent px-3 py-1 rounded-full">{time}</span>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed">{items}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}