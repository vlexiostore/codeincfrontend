'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // GSAP Animation for Mobile Menu
    useEffect(() => {
        if (isOpen) {
            gsap.to('.mobile-menu', {
                x: 0,
                duration: 0.5,
                ease: 'power3.out'
            });
            gsap.fromTo('.mobile-menu-item',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.2, ease: 'power2.out' }
            );
        } else {
            gsap.to('.mobile-menu', {
                x: '100%',
                duration: 0.5,
                ease: 'power3.in'
            });
        }
    }, [isOpen]);

    return (
        <nav className={`relative md:fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="z-50 relative flex items-center">
                    <Image
                        src="/codeinc.png"
                        alt="CodeInc Logo"
                        width={300}
                        height={100}
                        className="h-20 md:h-24 w-auto"
                        priority
                    />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8 bg-white/5 px-8 py-2.5 rounded-full border border-white/10 backdrop-blur-sm">
                    {[
                        { name: 'About', path: '/about' },
                        { name: 'Projects', path: '/projects' },
                        { name: 'Blogs', path: '/blogs' },
                        { name: 'Contact', path: '/contact' }
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.path}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Action */}
                <div className="hidden md:block">
                    <a
                        href="https://portal.codeinc.ai/auth/signup/client"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:bg-gray-200 transition-colors"
                    >
                        Sign up
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden z-50 relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white active:scale-95 transition-transform"
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>

                {/* Mobile Menu Overlay */}
                <div className="mobile-menu fixed inset-0 bg-[#050505] z-40 flex flex-col items-center justify-center translate-x-full">

                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '32px 32px' }}
                    />

                    <div className="flex flex-col items-center gap-8 relative z-10 w-full px-8">
                        {[
                            { name: 'About', path: '/about' },
                            { name: 'Projects', path: '/projects' },
                            { name: 'Blogs', path: '/blogs' },
                            { name: 'Contact', path: '/contact' }
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href={item.path}
                                onClick={() => setIsOpen(false)}
                                className="mobile-menu-item text-5xl font-serif italic text-white/90 hover:text-white transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}

                        <div className="mobile-menu-item w-full h-px bg-white/10 my-4" />

                        <a
                            href="https://portal.codeinc.ai/auth/signup/client"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsOpen(false)}
                            className="mobile-menu-item px-8 py-4 rounded-full bg-white text-black text-lg font-bold hover:bg-gray-200 transition-colors w-full text-center"
                        >
                            Sign up
                        </a>

                        <div className="mobile-menu-item flex gap-6 mt-4 opacity-50">
                            <span className="text-xs uppercase tracking-widest text-gray-400">Instagram</span>
                            <span className="text-xs uppercase tracking-widest text-gray-400">Twitter</span>
                            <span className="text-xs uppercase tracking-widest text-gray-400">LinkedIn</span>
                        </div>
                    </div>
                </div>

            </div>
        </nav>
    );
}
