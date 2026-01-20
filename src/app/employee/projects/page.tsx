'use client';
import React, { useEffect, useState } from 'react';
import { FolderKanban, Plus, CheckCircle2 } from 'lucide-react';
import { getOrCreateEmployee, updateEmployeeStats } from '@/lib/employeeStore';

export default function EmployeeProjectsPage() {
  const [assigned, setAssigned] = useState(0);
  const [submitted, setSubmitted] = useState(0);

  useEffect(() => {
    const employee = getOrCreateEmployee();
    setAssigned(employee.stats.projectsAssigned);
    setSubmitted(employee.stats.projectsSubmitted);
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">Projects</h1>
        <p className="text-sm sm:text-base text-gray-400">Monitor your project workload and submissions (used for payout).</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-400/10">
              <FolderKanban className="text-purple-400" size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">Assigned</h2>
          </div>
          <div className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6">{assigned}</div>
          <button
            className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 transition-colors flex items-center justify-center gap-2"
            onClick={() => {
              const next = assigned + 1;
              const updated = updateEmployeeStats({ projectsAssigned: next });
              setAssigned(updated.stats.projectsAssigned);
            }}
          >
            <Plus size={16} /> Add assigned project
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green-400/10">
              <CheckCircle2 className="text-green-400" size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">Submitted</h2>
          </div>
          <div className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6">{submitted}</div>
          <button
            className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 transition-colors flex items-center justify-center gap-2"
            onClick={() => {
              const next = submitted + 1;
              const updated = updateEmployeeStats({ projectsSubmitted: next });
              setSubmitted(updated.stats.projectsSubmitted);
            }}
          >
            <Plus size={16} /> Add submission
          </button>
          <p className="mt-4 text-xs sm:text-sm text-gray-400">
            Submission rate = submitted / assigned. Higher submission rate increases payout performance.
          </p>
        </div>
      </div>
    </div>
  );
}

