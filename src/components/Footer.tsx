'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowUp } from 'lucide-react';

export default function Footer() {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-black text-white pt-24 pb-12 px-6 border-t border-white/5 h-screen">
            <div className="max-w-7xl mx-auto">

                {/* Top Section: Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-32">

                    {/* Location & Contact */}
                    <div className="flex flex-col gap-10">
                        <div>
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Location</h4>
                            <p className="text-sm text-gray-300 leading-relaxed">
                                1234 Market Street, Suite 500<br />
                                San Francisco, CA 94103, US
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Contact</h4>
                            <p className="text-sm text-gray-300 leading-relaxed">
                                hello@codeinc.ai<br />
                                +1 (415) 555-0132
                            </p>
                        </div>
                    </div>

                    {/* Portals */}
                    <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Portals</h4>
                        <ul className="flex flex-col gap-4">
                            <li><a href="/admin" className="text-lg font-medium hover:text-gray-400 transition-colors">Admin</a></li>
                            <li><a href="https://portal.codeinc.ai/auth/signup/employee" target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:text-gray-400 transition-colors">Employee</a></li>
                            <li><a href="https://portal.codeinc.ai/auth/signup/client" target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:text-gray-400 transition-colors">Client</a></li>
                        </ul>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Links</h4>
                        </div>
                        <ul className="flex flex-col gap-4">
                            <li><Link href="/#about" className="text-lg font-medium hover:text-gray-400 transition-colors">About</Link></li>
                            <li><Link href="/projects" className="text-lg font-medium hover:text-gray-400 transition-colors">Project</Link></li>
                            <li><Link href="/blogs" className="text-lg font-medium hover:text-gray-400 transition-colors">Blogs</Link></li>
                            <li><Link href="/#contact" className="text-lg font-medium hover:text-gray-400 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Socials</h4>
                        </div>
                        <ul className="flex flex-col gap-4">
                            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:text-gray-400 transition-colors">Instagram</a></li>
                            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:text-gray-400 transition-colors">X (Twitter)</a></li>
                            <li><a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:text-gray-400 transition-colors">Whatsapp</a></li>
                            <li><a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:text-gray-400 transition-colors">Discord</a></li>
                        </ul>
                    </div>
                </div>

                {/* Middle Section: Massive Typography */}
                <div className="relative border-b border-white/10 pb-12 mb-12">
                    <h1 className="text-[18vw] leading-none font-serif italic text-center bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent opacity-90 tracking-tight">
                        codeinc
                    </h1>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">
                        © 2025 Codeinc. All Right Reserved
                    </p>

                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-3 group cursor-pointer"
                    >
                        <span className="text-xs font-bold uppercase tracking-widest text-white group-hover:text-gray-300 transition-colors">Back to Top</span>
                        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                            <ArrowUp size={16} />
                        </div>
                    </button>
                </div>

            </div>
        </footer>
    );
}
