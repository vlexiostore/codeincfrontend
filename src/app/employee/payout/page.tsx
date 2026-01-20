'use client';
import React, { useState, useEffect } from 'react';
import { Wallet, CreditCard, Building2, Globe, CheckCircle2, Save } from 'lucide-react';
import { getOrCreateEmployee, updateEmployeePayout, type PayoutInfo, type PayoutMethod } from '@/lib/employeeStore';

export default function PayoutPage() {
    const [selectedMethod, setSelectedMethod] = useState<PayoutMethod | null>(null);
    const [payoutInfo, setPayoutInfo] = useState<PayoutInfo>({
        method: null,
    });
    const [stats, setStats] = useState({ totalHours: 0, projectsSubmitted: 0, totalEarnings: 0 });
    const [saved, setSaved] = useState(false);

    // Load saved payout info
    useEffect(() => {
        const employee = getOrCreateEmployee();
        setPayoutInfo(employee.payout);
        setSelectedMethod(employee.payout.method);
        setStats({
            totalHours: employee.stats.totalHours,
            projectsSubmitted: employee.stats.projectsSubmitted,
            totalEarnings: employee.stats.totalEarnings,
        });
    }, []);

    const payoutMethods = [
        {
            id: 'wise' as PayoutMethod,
            name: 'Wise',
            icon: Globe,
            description: 'International money transfers',
            color: 'text-green-400',
            bgColor: 'bg-green-400/10',
        },
        {
            id: 'paypal' as PayoutMethod,
            name: 'PayPal',
            icon: CreditCard,
            description: 'Digital wallet payments',
            color: 'text-blue-400',
            bgColor: 'bg-blue-400/10',
        },
        {
            id: 'binance' as PayoutMethod,
            name: 'Binance',
            icon: Wallet,
            description: 'Cryptocurrency payments',
            color: 'text-yellow-400',
            bgColor: 'bg-yellow-400/10',
        },
        {
            id: 'local' as PayoutMethod,
            name: 'Local Bank',
            icon: Building2,
            description: 'Direct bank transfer',
            color: 'text-purple-400',
            bgColor: 'bg-purple-400/10',
        },
    ];

    const handleMethodSelect = (method: PayoutMethod) => {
        setSelectedMethod(method);
        setPayoutInfo((prev) => ({ ...prev, method }));
    };

    const handleInputChange = (field: string, value: string) => {
        setPayoutInfo((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        updateEmployeePayout(payoutInfo);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">Payout Settings</h1>
                <p className="text-gray-400">Configure how you receive your payments</p>
            </div>

            {/* Payout Methods Selection */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Select Payout Method</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {payoutMethods.map((method) => {
                        const Icon = method.icon;
                        const isSelected = selectedMethod === method.id;
                        return (
                            <button
                                key={method.id}
                                onClick={() => handleMethodSelect(method.id)}
                                className={`p-6 rounded-xl border-2 transition-all text-left ${
                                    isSelected
                                        ? 'border-white/30 bg-white/10'
                                        : 'border-white/10 bg-white/5 hover:bg-white/10'
                                }`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-lg ${method.bgColor}`}>
                                        <Icon className={method.color} size={24} />
                                    </div>
                                    {isSelected && (
                                        <CheckCircle2 className="text-green-400" size={20} />
                                    )}
                                </div>
                                <h3 className="text-xl font-bold mb-1">{method.name}</h3>
                                <p className="text-sm text-gray-400">{method.description}</p>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Payout Information Form */}
            {selectedMethod && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold mb-6">Payout Information</h2>

                    {selectedMethod === 'wise' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Wise Email Address
                                </label>
                                <input
                                    type="email"
                                    value={payoutInfo.wiseEmail || ''}
                                    onChange={(e) => handleInputChange('wiseEmail', e.target.value)}
                                    placeholder="your.email@example.com"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors"
                                />
                            </div>
                        </div>
                    )}

                    {selectedMethod === 'paypal' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    PayPal Email Address
                                </label>
                                <input
                                    type="email"
                                    value={payoutInfo.paypalEmail || ''}
                                    onChange={(e) => handleInputChange('paypalEmail', e.target.value)}
                                    placeholder="your.email@example.com"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors"
                                />
                            </div>
                        </div>
                    )}

                    {selectedMethod === 'binance' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Binance Wallet Address
                                </label>
                                <input
                                    type="text"
                                    value={payoutInfo.binanceWallet || ''}
                                    onChange={(e) => handleInputChange('binanceWallet', e.target.value)}
                                    placeholder="0x..."
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors font-mono"
                                />
                            </div>
                        </div>
                    )}

                    {selectedMethod === 'local' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Bank Name
                                </label>
                                <input
                                    type="text"
                                    value={payoutInfo.localBankName || ''}
                                    onChange={(e) => handleInputChange('localBankName', e.target.value)}
                                    placeholder="Bank Name"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Account Holder Name
                                </label>
                                <input
                                    type="text"
                                    value={payoutInfo.localAccountHolderName || ''}
                                    onChange={(e) => handleInputChange('localAccountHolderName', e.target.value)}
                                    placeholder="Full Name"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Account Number
                                    </label>
                                    <input
                                        type="text"
                                        value={payoutInfo.localAccountNumber || ''}
                                        onChange={(e) => handleInputChange('localAccountNumber', e.target.value)}
                                        placeholder="Account Number"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Routing Number
                                    </label>
                                    <input
                                        type="text"
                                        value={payoutInfo.localRoutingNumber || ''}
                                        onChange={(e) => handleInputChange('localRoutingNumber', e.target.value)}
                                        placeholder="Routing Number"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-8 flex items-center gap-4">
                        <button
                            onClick={handleSave}
                            className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                        >
                            <Save size={20} />
                            Save Information
                        </button>
                        {saved && (
                            <div className="flex items-center gap-2 text-green-400">
                                <CheckCircle2 size={20} />
                                <span>Saved successfully!</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Current Earnings Summary */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Earnings Summary</h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <span className="text-gray-400">Total Hours Worked</span>
                        <span className="text-xl font-bold">{stats.totalHours}h</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <span className="text-gray-400">Projects Completed</span>
                        <span className="text-xl font-bold">{stats.projectsSubmitted}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <span className="text-gray-400">Total Earnings</span>
                        <span className="text-2xl font-bold text-yellow-400">
                            ${stats.totalEarnings.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
