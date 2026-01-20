'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Users, Wallet, Clock, FolderKanban, CheckCircle2 } from 'lucide-react';
import { getEmployees, getOrCreateEmployee, type EmployeeRecord } from '@/lib/employeeStore';

function formatMethod(method: EmployeeRecord['payout']['method']) {
  switch (method) {
    case 'wise':
      return 'Wise';
    case 'paypal':
      return 'PayPal';
    case 'binance':
      return 'Binance';
    case 'local':
      return 'Local Bank';
    default:
      return 'Not set';
  }
}

export default function AdminPage() {
  const [employees, setEmployees] = useState<EmployeeRecord[]>([]);

  useEffect(() => {
    // Ensure at least one local employee exists for demo
    getOrCreateEmployee();
    setEmployees(getEmployees());
  }, []);

  const totals = useMemo(() => {
    return employees.reduce(
      (acc, e) => {
        acc.totalHours += e.stats.totalHours;
        acc.assigned += e.stats.projectsAssigned;
        acc.submitted += e.stats.projectsSubmitted;
        acc.earnings += e.stats.totalEarnings;
        return acc;
      },
      { totalHours: 0, assigned: 0, submitted: 0, earnings: 0 }
    );
  }, [employees]);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 space-y-10">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Employees, payout methods, and monitored performance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users size={18} className="text-white/80" />
              <span className="text-sm text-gray-400">Employees</span>
            </div>
            <div className="text-3xl font-bold">{employees.length}</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock size={18} className="text-white/80" />
              <span className="text-sm text-gray-400">Total Hours</span>
            </div>
            <div className="text-3xl font-bold">{totals.totalHours}h</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <FolderKanban size={18} className="text-white/80" />
              <span className="text-sm text-gray-400">Assigned</span>
            </div>
            <div className="text-3xl font-bold">{totals.assigned}</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Wallet size={18} className="text-white/80" />
              <span className="text-sm text-gray-400">Total Earnings</span>
            </div>
            <div className="text-3xl font-bold">${totals.earnings.toFixed(2)}</div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-xl font-bold">Employees</h2>
            <button
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 transition-colors text-sm"
              onClick={() => setEmployees(getEmployees())}
            >
              Refresh
            </button>
          </div>

          <div className="divide-y divide-white/10">
            {employees.map((e) => (
              <div key={e.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div>
                    <div className="text-2xl font-bold">{e.name}</div>
                    <div className="text-sm text-gray-400">{e.role}</div>
                    <div className="mt-3 text-sm text-gray-500">Employee ID: {e.id}</div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full md:max-w-3xl">
                    <div className="bg-white/5 rounded-xl border border-white/10 p-4">
                      <div className="text-xs text-gray-400 mb-1 flex items-center gap-2">
                        <Wallet size={14} /> Payout method
                      </div>
                      <div className="font-bold">{formatMethod(e.payout.method)}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {e.payout.method === 'wise' && e.payout.wiseEmail ? e.payout.wiseEmail : null}
                        {e.payout.method === 'paypal' && e.payout.paypalEmail ? e.payout.paypalEmail : null}
                        {e.payout.method === 'binance' && e.payout.binanceWallet ? e.payout.binanceWallet : null}
                        {e.payout.method === 'local' && e.payout.localBankName ? e.payout.localBankName : null}
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl border border-white/10 p-4">
                      <div className="text-xs text-gray-400 mb-1 flex items-center gap-2">
                        <Clock size={14} /> Hours
                      </div>
                      <div className="font-bold">{e.stats.totalHours}h</div>
                    </div>

                    <div className="bg-white/5 rounded-xl border border-white/10 p-4">
                      <div className="text-xs text-gray-400 mb-1 flex items-center gap-2">
                        <FolderKanban size={14} /> Assigned
                      </div>
                      <div className="font-bold">{e.stats.projectsAssigned}</div>
                    </div>

                    <div className="bg-white/5 rounded-xl border border-white/10 p-4">
                      <div className="text-xs text-gray-400 mb-1 flex items-center gap-2">
                        <CheckCircle2 size={14} /> Submitted
                      </div>
                      <div className="font-bold">{e.stats.projectsSubmitted}</div>
                      <div className="text-xs text-gray-500 mt-1">${e.stats.totalEarnings.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {employees.length === 0 && (
              <div className="p-10 text-center text-gray-400">No employees found.</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

