'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Clock, Plus, Minus } from 'lucide-react';
import { getOrCreateEmployee, updateEmployeeStats } from '@/lib/employeeStore';

export default function TimeTrackingPage() {
  const [hours, setHours] = useState(0);

  useEffect(() => {
    const employee = getOrCreateEmployee();
    setHours(employee.stats.totalHours);
  }, []);

  const projectedEarnings = useMemo(() => getOrCreateEmployee().stats.totalEarnings, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Time Tracking</h1>
        <p className="text-gray-400">Log time spent on projects (used for payout performance).</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-blue-400/10">
            <Clock className="text-blue-400" size={22} />
          </div>
          <h2 className="text-2xl font-bold">Hours Worked</h2>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="text-5xl font-bold">{hours}h</div>
          <div className="text-sm text-gray-400">Tracked so far (cap contribution at 160h).</div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 transition-colors flex items-center gap-2"
            onClick={() => {
              const next = Math.max(0, hours - 1);
              const updated = updateEmployeeStats({ totalHours: next });
              setHours(updated.stats.totalHours);
            }}
          >
            <Minus size={18} /> -1 hour
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 transition-colors flex items-center gap-2"
            onClick={() => {
              const next = hours + 1;
              const updated = updateEmployeeStats({ totalHours: next });
              setHours(updated.stats.totalHours);
            }}
          >
            <Plus size={18} /> +1 hour
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-sm text-gray-400">
          Payout updates automatically based on hours + submissions. (Current earnings may differ after any
          changes.)
          <div className="mt-2">Last known earnings snapshot: ${projectedEarnings.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

