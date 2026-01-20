'use client';
import React, { useEffect, useState } from 'react';
import { User, Save } from 'lucide-react';
import { getOrCreateEmployee, upsertEmployee } from '@/lib/employeeStore';

export default function EmployeeSettingsPage() {
  const [name, setName] = useState('Employee');
  const [role, setRole] = useState('Team Member');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const employee = getOrCreateEmployee();
    setName(employee.name);
    setRole(employee.role);
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">Settings</h1>
        <p className="text-sm sm:text-base text-gray-400">Basic profile info (used in admin view).</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="p-2 rounded-lg bg-white/10">
            <User size={20} />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">Profile</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors"
              placeholder="Full name"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">Role</label>
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors"
              placeholder="Role"
            />
          </div>
        </div>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <button
            className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            onClick={() => {
              const employee = getOrCreateEmployee();
              upsertEmployee({ ...employee, name: name.trim() || 'Employee', role: role.trim() || 'Team Member' });
              setSaved(true);
              setTimeout(() => setSaved(false), 2500);
            }}
          >
            <Save size={18} />
            Save
          </button>
          {saved && <span className="text-green-400 text-xs sm:text-sm text-center sm:text-left">Saved!</span>}
        </div>
      </div>
    </div>
  );
}

