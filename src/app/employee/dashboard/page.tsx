'use client';
import React, { useState, useEffect } from 'react';
import { Clock, FolderKanban, CheckCircle2, DollarSign, TrendingUp } from 'lucide-react';
import { getOrCreateEmployee, updateEmployeeStats } from '@/lib/employeeStore';

export default function EmployeeDashboard() {
    const [stats, setStats] = useState({
        totalHours: 0,
        projectsAssigned: 0,
        projectsSubmitted: 0,
        totalEarnings: 0,
    });

    // Load stats (in a real app, this would come from an API)
    useEffect(() => {
        const employee = getOrCreateEmployee();
        setStats(employee.stats);
    }, []);

    // Calculate payment percentage
    const calculatePaymentPercentage = () => {
        if (stats.projectsAssigned === 0) return 0;
        const submissionRate = (stats.projectsSubmitted / stats.projectsAssigned) * 100;
        const hoursRate = Math.min(stats.totalHours / 160, 1) * 100; // Assuming 160 hours per month
        return (submissionRate * 0.6 + hoursRate * 0.4); // 60% submission rate, 40% hours
    };

    const paymentPercentage = calculatePaymentPercentage();

    const statCards = [
        {
            title: 'Total Hours',
            value: `${stats.totalHours}h`,
            icon: Clock,
            color: 'text-blue-400',
            bgColor: 'bg-blue-400/10',
        },
        {
            title: 'Projects Assigned',
            value: stats.projectsAssigned.toString(),
            icon: FolderKanban,
            color: 'text-purple-400',
            bgColor: 'bg-purple-400/10',
        },
        {
            title: 'Projects Submitted',
            value: stats.projectsSubmitted.toString(),
            icon: CheckCircle2,
            color: 'text-green-400',
            bgColor: 'bg-green-400/10',
        },
        {
            title: 'Total Earnings',
            value: `$${stats.totalEarnings.toFixed(2)}`,
            icon: DollarSign,
            color: 'text-yellow-400',
            bgColor: 'bg-yellow-400/10',
        },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">Dashboard</h1>
                <p className="text-sm sm:text-base text-gray-400">Welcome back! Here's your work overview.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {statCards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={index}
                            className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/10 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <div className={`p-2 sm:p-3 rounded-lg ${card.bgColor}`}>
                                    <Icon className={card.color} size={20} />
                                </div>
                            </div>
                            <h3 className="text-xs sm:text-sm text-gray-400 mb-1">{card.title}</h3>
                            <p className="text-2xl sm:text-3xl font-bold">{card.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Payment Performance */}
            <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="p-2 rounded-lg bg-yellow-400/10">
                        <TrendingUp className="text-yellow-400" size={20} />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold">Payment Performance</h2>
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm sm:text-base text-gray-400">Overall Performance</span>
                            <span className="text-lg sm:text-xl font-bold">{paymentPercentage.toFixed(1)}%</span>
                        </div>
                        <div className="w-full h-2 sm:h-3 bg-white/5 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-500"
                                style={{ width: `${Math.min(paymentPercentage, 100)}%` }}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10">
                        <div>
                            <p className="text-xs sm:text-sm text-gray-400 mb-1">Submission Rate</p>
                            <p className="text-xl sm:text-2xl font-bold">
                                {stats.projectsAssigned > 0
                                    ? ((stats.projectsSubmitted / stats.projectsAssigned) * 100).toFixed(1)
                                    : 0}%
                            </p>
                        </div>
                        <div>
                            <p className="text-xs sm:text-sm text-gray-400 mb-1">Hours Contribution</p>
                            <p className="text-xl sm:text-2xl font-bold">
                                {Math.min((stats.totalHours / 160) * 100, 100).toFixed(1)}%
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    <a
                        href="/employee/payout"
                        className="p-4 sm:p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                    >
                        <h3 className="font-bold mb-2 text-sm sm:text-base">Manage Payout</h3>
                        <p className="text-xs sm:text-sm text-gray-400">Update your payout method and information</p>
                    </a>
                    <a
                        href="/employee/time-tracking"
                        className="p-4 sm:p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                    >
                        <h3 className="font-bold mb-2 text-sm sm:text-base">Track Time</h3>
                        <p className="text-xs sm:text-sm text-gray-400">Log your work hours on projects</p>
                    </a>
                    <a
                        href="/employee/projects"
                        className="p-4 sm:p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors sm:col-span-2 lg:col-span-1"
                    >
                        <h3 className="font-bold mb-2 text-sm sm:text-base">View Projects</h3>
                        <p className="text-xs sm:text-sm text-gray-400">Check your assigned projects</p>
                    </a>
                </div>
            </div>

            {/* Demo controls (remove when backend is wired) */}
            <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">Monitor (Demo Controls)</h2>
                <p className="text-gray-400 mb-4 sm:mb-6 text-xs sm:text-sm">
                    Use these to simulate work activity. Admin will see the same data.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                    <button
                        className="px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 transition-colors"
                        onClick={() => {
                            const updated = updateEmployeeStats({ totalHours: stats.totalHours + 1 });
                            setStats(updated.stats);
                        }}
                    >
                        +1 hour
                    </button>
                    <button
                        className="px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 transition-colors"
                        onClick={() => {
                            const updated = updateEmployeeStats({ projectsAssigned: stats.projectsAssigned + 1 });
                            setStats(updated.stats);
                        }}
                    >
                        +1 project assigned
                    </button>
                    <button
                        className="px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 transition-colors"
                        onClick={() => {
                            const updated = updateEmployeeStats({ projectsSubmitted: stats.projectsSubmitted + 1 });
                            setStats(updated.stats);
                        }}
                    >
                        +1 project submitted
                    </button>
                </div>
            </div>
        </div>
    );
}
