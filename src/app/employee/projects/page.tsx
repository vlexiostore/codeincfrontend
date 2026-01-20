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
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Projects</h1>
        <p className="text-gray-400">Monitor your project workload and submissions (used for payout).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-400/10">
              <FolderKanban className="text-purple-400" size={22} />
            </div>
            <h2 className="text-2xl font-bold">Assigned</h2>
          </div>
          <div className="text-5xl font-bold">{assigned}</div>
          <button
            className="mt-6 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 transition-colors flex items-center gap-2"
            onClick={() => {
              const next = assigned + 1;
              const updated = updateEmployeeStats({ projectsAssigned: next });
              setAssigned(updated.stats.projectsAssigned);
            }}
          >
            <Plus size={18} /> Add assigned project
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green-400/10">
              <CheckCircle2 className="text-green-400" size={22} />
            </div>
            <h2 className="text-2xl font-bold">Submitted</h2>
          </div>
          <div className="text-5xl font-bold">{submitted}</div>
          <button
            className="mt-6 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 transition-colors flex items-center gap-2"
            onClick={() => {
              const next = submitted + 1;
              const updated = updateEmployeeStats({ projectsSubmitted: next });
              setSubmitted(updated.stats.projectsSubmitted);
            }}
          >
            <Plus size={18} /> Add submission
          </button>
          <p className="mt-4 text-sm text-gray-400">
            Submission rate = submitted / assigned. Higher submission rate increases payout performance.
          </p>
        </div>
      </div>
    </div>
  );
}

