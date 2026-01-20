'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
    LayoutDashboard, 
    Wallet, 
    Clock, 
    FolderKanban, 
    Settings,
    Menu,
    X,
    LogOut
} from 'lucide-react';

export default function EmployeeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    const menuItems = [
        { name: 'Dashboard', path: '/employee/dashboard', icon: LayoutDashboard },
        { name: 'Payout', path: '/employee/payout', icon: Wallet },
        { name: 'Time Tracking', path: '/employee/time-tracking', icon: Clock },
        { name: 'Projects', path: '/employee/projects', icon: FolderKanban },
        { name: 'Settings', path: '/employee/settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Mobile Sidebar Toggle */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10 p-3 sm:p-4 flex items-center justify-between">
                <h1 className="text-lg sm:text-xl font-bold truncate">Employee Dashboard</h1>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex-shrink-0"
                >
                    {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-black border-r border-white/10 z-40 transition-transform duration-300 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0 pt-20 lg:pt-6`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="px-6 py-6 border-b border-white/10">
                        <Link href="/" className="text-2xl font-bold">
                            CodeInc
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                        isActive
                                            ? 'bg-white/10 text-white'
                                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    <Icon size={20} />
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout */}
                    <div className="px-4 py-6 border-t border-white/10">
                        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors w-full">
                            <LogOut size={20} />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="lg:ml-64 pt-14 sm:pt-16 lg:pt-0">
                <div className="p-4 sm:p-6 md:p-8 lg:p-12">
                    {children}
                </div>
            </main>
        </div>
    );
}
