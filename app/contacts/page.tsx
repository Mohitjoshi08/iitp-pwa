import { getSheetData } from '../../lib/google-sheets';
import { Phone, User, BadgeInfo, Users } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ContactsPage() {
  const rows = await getSheetData('Contacts!A2:D');

  return (
    <div className="min-h-screen px-4 py-6 md:p-12 max-w-md mx-auto pb-28">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">Contacts</h1>
        <p className="text-sm text-text-secondary mt-1">Essential support numbers</p>
      </header>

      {(!rows || rows.length === 0) ? (
        <div className="bg-surface border border-border-subtle p-6 rounded-2xl text-center">
          <p className="text-sm text-text-secondary">No contacts listed yet. Add them in your Google Sheet!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {rows.map((row, i) => {
            const name = row[0] || 'Contact';
            const person = row[1] || '';
            const phone = row[2] || '';
            const info = row[3] || '';

            return (
              <div key={i} className="bg-surface border border-border-subtle p-4 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 bg-surface-hover rounded-xl flex items-center justify-center border border-border-subtle shrink-0">
                  {name.toLowerCase().includes('electric') ? <BadgeInfo size={20} className="text-accent" /> :
                   name.toLowerCase().includes('plumb') ? <Users size={20} className="text-accent" /> :
                   <User size={20} className="text-accent" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-[15px]">{name}</span>
                    {person && <span className="text-[12px] text-text-secondary">{person}</span>}
                  </div>
                  {info && <div className="text-[11px] text-text-secondary/80 mt-0.5">{info}</div>}
                  {phone && (
                    <a href={`tel:${phone}`} className="inline-flex items-center gap-1 mt-1 text-accent text-[13px] font-bold select-all hover:underline active:scale-[0.97]">
                      <Phone size={15} /> {phone}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* --- Creator Credit Section --- */}
      <div className="bg-accent/10 border border-accent/30 p-3.5 rounded-2xl text-center mt-8">
        <span className="font-bold text-accent">Website by Mohit Joshi</span>
        <span className="block text-xs text-text-secondary mt-1">
          Nominee for SWB (Student Welfare Board)
        </span>
      </div>
    </div>
  );
}