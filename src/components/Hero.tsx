'use client'
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, MoveUpRight, Globe } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Initial Load Animations
            if (textRef.current) {
                tl.from(textRef.current.querySelectorAll('span'), {
                    y: 100,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 1,
                    ease: "power3.out"
                });
            }

            tl.from(bottomRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.5");

            // Marquee Animation
            if (marqueeRef.current) {
                const q = gsap.utils.selector(marqueeRef.current);
                const firstPart = q(".marquee-part")[0];
                if (firstPart) {
                    gsap.to(q(".marquee-part"), {
                        xPercent: -100,
                        repeat: -1,
                        duration: 15,
                        ease: "linear",
                    });
                }
            }

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-screen h-auto md:h-screen flex flex-col justify-between px-6 md:px-12 pb-8 pt-32 overflow-hidden bg-black text-white">

            {/* Background Dotted Pattern */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)',
                    backgroundSize: '32px 32px'
                }}
            />

            {/* Top Section */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
                {/* HEADLINE */}
                <div className="md:col-span-12 pt-8 md:pt-4 text-center md:text-left">
                    <h1 ref={textRef} className="leading-none tracking-tighter text-white">
                        <span className="block text-[13vw] md:text-[7rem] lg:text-[8.5rem] font-sans font-medium origin-bottom text-white pb-2">Create,</span>
                        <span className="block text-[13vw] md:text-[7rem] lg:text-[8.5rem] font-serif italic font-light ml-0 md:ml-12 text-gray-400 origin-bottom leading-none">
                            Impactful
                        </span>
                    </h1>
                </div>

                {/* Top Right Content (Copyright + Socials) */}
                <div className="absolute top-4 right-0 hidden md:flex flex-col items-end text-right">
                    <div className="w-full max-w-lg animate-in fade-in zoom-in duration-1000 delay-500">
                        <p className="text-base text-gray-400 font-sans leading-relaxed mb-12">
                            &copy; We Build Brands,websites <br />
                            and digital experience with intension,<br />
                            clarity and care
                        </p>

                        <div className="flex items-center justify-end gap-6">
                            <span className="text-xl font-bold text-white">Contact Us</span>
                            <div className="flex gap-2">
                                <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 hover:scale-110">
                                    <Facebook size={18} />
                                </Link>
                                <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 hover:scale-110">
                                    <Instagram size={18} />
                                </Link>
                                <Link href="https://codeinc.ai" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 hover:scale-110">
                                    <Globe size={18} />
                                </Link>
                                <Link href="https://behance.net" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 hover:scale-110">
                                    <span className="font-bold text-xs leading-none">Bē</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Content */}
            <div ref={bottomRef} className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-end w-full pb-8">

                {/* Bottom Left: "We do" & Partners Marquee */}
                <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="mb-12 md:mb-16">
                        <h3 className="text-lg font-medium text-white mb-6 uppercase tracking-widest opacity-60">We do</h3>
                        <div className="space-y-1 text-xl text-gray-400 font-light">
                            <p><span className="text-white hover:text-blue-400 transition-colors cursor-default">Brand Identity</span> / UI/UX Design</p>
                            <p>Development / Marketing</p>
                        </div>
                    </div>

                    {/* Marquee Partners */}
                    <div ref={marqueeRef} className="relative overflow-hidden w-full max-w-[300px] md:max-w-sm flex items-center group">
                        <div className="marquee-part flex gap-8 md:gap-12 whitespace-nowrap items-center pr-12 text-gray-600 transition-colors group-hover:text-gray-400">
                            <span className="text-2xl md:text-3xl font-serif font-bold">venice.</span>
                            <span className="text-2xl md:text-3xl font-sans font-bold">cairo</span>
                            <span className="text-2xl md:text-3xl font-serif italic">italic</span>
                            <span className="text-2xl md:text-3xl font-serif font-bold">venice.</span>
                            <span className="text-2xl md:text-3xl font-sans font-bold">cairo</span>
                            <span className="text-2xl md:text-3xl font-serif italic">italic</span>
                        </div>
                        <div className="marquee-part flex gap-8 md:gap-12 whitespace-nowrap items-center pr-12 absolute left-full top-0 text-gray-600 transition-colors group-hover:text-gray-400">
                            <span className="text-2xl md:text-3xl font-serif font-bold">venice.</span>
                            <span className="text-2xl md:text-3xl font-sans font-bold">cairo</span>
                            <span className="text-2xl md:text-3xl font-serif italic">italic</span>
                            <span className="text-2xl md:text-3xl font-serif font-bold">venice.</span>
                            <span className="text-2xl md:text-3xl font-sans font-bold">cairo</span>
                            <span className="text-2xl md:text-3xl font-serif italic">italic</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Center */}
                <div className="md:col-span-3 flex justify-center pb-8 hidden md:flex">
                </div>

                {/* Bottom Right: Featured Project */}
                <div className="md:col-span-5 flex flex-col items-end">
                    <div className="flex justify-between items-center mb-6 w-full md:w-full md:pl-20">
                        <span className="text-xl font-medium tracking-tight uppercase opacity-60">Featured</span>
                        <span className="text-xl font-mono opacity-40 text-gray-400 tracking-tighter">(02)</span>
                    </div>

                    <div className="w-full h-[200px] md:h-[240px] bg-[#0A0A0A] rounded-[2rem] overflow-hidden relative group border border-white/5 transition-all duration-700 hover:border-white/20 hover:shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                        <Image
                            src="/placeholder.png"
                            alt="Featured Project"
                            fill
                            className="object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100"
                        />
                        {/* Overlay Content */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-10 flex flex-col justify-between">
                            <div className="flex justify-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer">
                                    <MoveUpRight size={24} />
                                </div>
                            </div>
                            <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <h4 className="text-3xl font-serif italic mb-2 text-white leading-tight">Mobile App</h4>
                                <div className="flex gap-3 items-center">
                                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-sans">Finance / 2026</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    );
}
