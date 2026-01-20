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
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">Time Tracking</h1>
        <p className="text-sm sm:text-base text-gray-400">Log time spent on projects (used for payout performance).</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="p-2 rounded-lg bg-blue-400/10">
            <Clock className="text-blue-400" size={20} />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">Hours Worked</h2>
        </div>

        <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="text-4xl sm:text-5xl font-bold">{hours}h</div>
          <div className="text-xs sm:text-sm text-gray-400">Tracked so far (cap contribution at 160h).</div>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button
            className="px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 transition-colors flex items-center gap-2"
            onClick={() => {
              const next = Math.max(0, hours - 1);
              const updated = updateEmployeeStats({ totalHours: next });
              setHours(updated.stats.totalHours);
            }}
          >
            <Minus size={16} /> -1 hour
          </button>
          <button
            className="px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 transition-colors flex items-center gap-2"
            onClick={() => {
              const next = hours + 1;
              const updated = updateEmployeeStats({ totalHours: next });
              setHours(updated.stats.totalHours);
            }}
          >
            <Plus size={16} /> +1 hour
          </button>
        </div>

        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10 text-xs sm:text-sm text-gray-400">
          Payout updates automatically based on hours + submissions. (Current earnings may differ after any
          changes.)
          <div className="mt-2">Last known earnings snapshot: ${projectedEarnings.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

