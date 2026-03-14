'use client';

import { useState } from 'react';
import { submitComplaint } from './actions';
import { CheckCircle2, Loader2, Send } from 'lucide-react';

export default function ComplaintsPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  async function handleSubmit(formData: FormData) {
    setStatus('loading');
    await submitComplaint(formData);
    setStatus('success');
  }

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-2xl mx-auto pb-32">
      <header className="mb-10 mt-4 md:mt-0">
        <h1 className="text-3xl font-bold tracking-tight mb-2">File a Complaint</h1>
        <p className="text-text-secondary">Report hostel or campus issues securely.</p>
      </header>

      {status === 'success' ? (
        <div className="bg-surface border border-emerald-500/30 p-8 rounded-3xl text-center shadow-[0_0_30px_rgba(16,185,129,0.15)]">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-emerald-500" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2">Complaint Registered</h2>
          <p className="text-text-secondary mb-8">Authorities have been notified and it will be recorded in the database.</p>
          <button onClick={() => setStatus('idle')} className="bg-surface-hover text-white px-8 py-3 rounded-xl font-bold border border-border-subtle hover:bg-border-subtle transition-colors">
            Submit Another Issue
          </button>
        </div>
      ) : (
        <form action={handleSubmit} className="bg-surface border border-border-subtle p-6 md:p-8 rounded-3xl shadow-lg flex flex-col gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-secondary">Full Name</label>
              <input required name="name" type="text" placeholder="e.g. Rahul Kumar" className="bg-bg-main border border-border-subtle rounded-xl p-3.5 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-secondary">Hostel & Room</label>
              <input required name="room" type="text" placeholder="e.g. Brahmaputra, 214" className="bg-bg-main border border-border-subtle rounded-xl p-3.5 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-secondary">Issue Category</label>
            <select required name="category" className="bg-bg-main border border-border-subtle rounded-xl p-3.5 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all appearance-none cursor-pointer">
              <option value="Electricity">Electricity & Power</option>
              <option value="Plumbing">Plumbing & Water</option>
              <option value="Wi-Fi">Wi-Fi & Network</option>
              <option value="Cleaning">Cleaning & Hygiene</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-secondary">Describe the Issue</label>
            <textarea required name="issue" rows={4} placeholder="Please provide details about the problem..." className="bg-bg-main border border-border-subtle rounded-xl p-3.5 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"></textarea>
          </div>

          <button disabled={status === 'loading'} type="submit" className="bg-white text-black font-bold text-lg rounded-xl p-4 flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed">
            {status === 'loading' ? (
              <><Loader2 className="animate-spin" size={20} /> Submitting...</>
            ) : (
              <><Send size={20} /> Submit Complaint</>
            )}
          </button>
        </form>
      )}
    </div>
  );
}