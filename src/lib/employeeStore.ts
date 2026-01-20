export type PayoutMethod = 'wise' | 'paypal' | 'binance' | 'local';

export type EmployeeStats = {
  totalHours: number;
  projectsAssigned: number;
  projectsSubmitted: number;
  totalEarnings: number;
};

export type PayoutInfo = {
  method: PayoutMethod | null;
  wiseEmail?: string;
  paypalEmail?: string;
  binanceWallet?: string;
  localBankName?: string;
  localAccountNumber?: string;
  localRoutingNumber?: string;
  localAccountHolderName?: string;
};

export type EmployeeRecord = {
  id: string;
  name: string;
  role: string;
  createdAt: string;
  payout: PayoutInfo;
  stats: EmployeeStats;
};

const EMPLOYEES_KEY = 'employees';
const CURRENT_EMPLOYEE_ID_KEY = 'currentEmployeeId';

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function getOrCreateCurrentEmployeeId(): string {
  if (typeof window === 'undefined') return 'local-employee';
  const existing = window.localStorage.getItem(CURRENT_EMPLOYEE_ID_KEY);
  if (existing) return existing;
  const id = 'local-employee';
  window.localStorage.setItem(CURRENT_EMPLOYEE_ID_KEY, id);
  return id;
}

export function computeTotalEarnings(stats: Omit<EmployeeStats, 'totalEarnings'>): number {
  // Simple baseline model:
  // - Base monthly pool = $1000
  // - Performance % = 60% submission-rate + 40% hours (cap hours at 160)
  // - Earnings = pool * performance%
  const basePool = 1000;
  const submissionRate = stats.projectsAssigned > 0 ? stats.projectsSubmitted / stats.projectsAssigned : 0;
  const hoursRate = Math.min(stats.totalHours / 160, 1);
  const performance = submissionRate * 0.6 + hoursRate * 0.4;
  return Math.max(0, basePool * performance);
}

export function getEmployees(): EmployeeRecord[] {
  if (typeof window === 'undefined') return [];
  const parsed = safeParse<EmployeeRecord[]>(window.localStorage.getItem(EMPLOYEES_KEY));
  return Array.isArray(parsed) ? parsed : [];
}

export function upsertEmployee(employee: EmployeeRecord): void {
  if (typeof window === 'undefined') return;
  const employees = getEmployees();
  const idx = employees.findIndex((e) => e.id === employee.id);
  if (idx >= 0) employees[idx] = employee;
  else employees.push(employee);
  window.localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(employees));
}

export function getOrCreateEmployee(id?: string): EmployeeRecord {
  const empId = id ?? getOrCreateCurrentEmployeeId();
  const employees = getEmployees();
  const existing = employees.find((e) => e.id === empId);
  if (existing) return existing;

  const created: EmployeeRecord = {
    id: empId,
    name: 'Employee',
    role: 'Team Member',
    createdAt: new Date().toISOString(),
    payout: { method: null },
    stats: { totalHours: 0, projectsAssigned: 0, projectsSubmitted: 0, totalEarnings: 0 },
  };
  upsertEmployee(created);
  return created;
}

export function updateEmployeeStats(partial: Partial<Omit<EmployeeStats, 'totalEarnings'>>): EmployeeRecord {
  const employee = getOrCreateEmployee();
  const nextStatsBase = {
    totalHours: partial.totalHours ?? employee.stats.totalHours,
    projectsAssigned: partial.projectsAssigned ?? employee.stats.projectsAssigned,
    projectsSubmitted: partial.projectsSubmitted ?? employee.stats.projectsSubmitted,
  };
  const totalEarnings = computeTotalEarnings(nextStatsBase);
  const updated: EmployeeRecord = {
    ...employee,
    stats: { ...nextStatsBase, totalEarnings },
  };
  upsertEmployee(updated);
  return updated;
}

export function updateEmployeePayout(payout: PayoutInfo): EmployeeRecord {
  const employee = getOrCreateEmployee();
  const updated: EmployeeRecord = { ...employee, payout };
  upsertEmployee(updated);
  return updated;
}

