import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, MoveUpRight, Globe } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from '@/components/ui/TextReveal';
import ParallaxImage from '@/components/ui/ParallaxImage';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.from(bottomRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.5 // Wait for page transition and text reveal
            });

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
        <section ref={containerRef} className="relative min-h-screen h-auto md:h-screen flex flex-col justify-between px-4 sm:px-6 md:px-12 pb-8 pt-0 overflow-hidden bg-black text-white">

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
                <div className="md:col-span-12 pt-0 text-center md:text-left">
                    <div className="leading-none tracking-tighter text-white">
                        <TextReveal delay={0.8} className="text-[15vw] sm:text-[13vw] md:text-[7rem] lg:text-[8.5rem] font-sans font-medium text-white pb-2 block">
                            Create,
                        </TextReveal>
                        <div className="ml-0 md:ml-12">
                            <TextReveal delay={1.0} className="text-[15vw] sm:text-[13vw] md:text-[7rem] lg:text-[8.5rem] font-serif italic font-light text-gray-400 leading-none block">
                                Impactful
                            </TextReveal>
                        </div>
                    </div>
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
                                <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 hover:scale-110 cursor-hover">
                                    <Facebook size={18} />
                                </Link>
                                <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 hover:scale-110 cursor-hover">
                                    <Instagram size={18} />
                                </Link>
                                <Link href="https://codeinc.ai" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 hover:scale-110 cursor-hover">
                                    <Globe size={18} />
                                </Link>
                                <Link href="https://behance.net" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 hover:scale-110 cursor-hover">
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
                    <div className="mb-8 sm:mb-12 md:mb-16">
                        <h3 className="text-sm sm:text-lg font-medium text-white mb-4 sm:mb-6 uppercase tracking-widest opacity-60">We do</h3>
                        <div className="space-y-1 text-base sm:text-xl text-gray-400 font-light">
                            <p><span className="text-white hover:text-blue-400 transition-colors cursor-default cursor-hover">Brand Identity</span> / UI/UX Design</p>
                            <p>Development / Marketing</p>
                        </div>
                    </div>

                    {/* Marquee Partners */}
                    <div ref={marqueeRef} className="relative overflow-hidden w-full max-w-[280px] sm:max-w-[300px] md:max-w-sm flex items-center group">
                        <div className="marquee-part flex gap-6 sm:gap-8 md:gap-12 whitespace-nowrap items-center pr-8 sm:pr-12 text-gray-600 transition-colors group-hover:text-gray-400">
                            <span className="text-xl sm:text-2xl md:text-3xl font-serif font-bold">venice.</span>
                            <span className="text-xl sm:text-2xl md:text-3xl font-sans font-bold">cairo</span>
                            <span className="text-xl sm:text-2xl md:text-3xl font-serif italic">italic</span>
                            <span className="text-xl sm:text-2xl md:text-3xl font-serif font-bold">venice.</span>
                            <span className="text-xl sm:text-2xl md:text-3xl font-sans font-bold">cairo</span>
                            <span className="text-xl sm:text-2xl md:text-3xl font-serif italic">italic</span>
                        </div>
                        <div className="marquee-part flex gap-6 sm:gap-8 md:gap-12 whitespace-nowrap items-center pr-8 sm:pr-12 absolute left-full top-0 text-gray-600 transition-colors group-hover:text-gray-400">
                            <span className="text-xl sm:text-2xl md:text-3xl font-serif font-bold">venice.</span>
                            <span className="text-xl sm:text-2xl md:text-3xl font-sans font-bold">cairo</span>
                            <span className="text-xl sm:text-2xl md:text-3xl font-serif italic">italic</span>
                            <span className="text-xl sm:text-2xl md:text-3xl font-serif font-bold">venice.</span>
                            <span className="text-xl sm:text-2xl md:text-3xl font-sans font-bold">cairo</span>
                            <span className="text-xl sm:text-2xl md:text-3xl font-serif italic">italic</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Center */}
                <div className="md:col-span-3 flex justify-center pb-8 hidden md:flex">
                </div>

                {/* Bottom Right: Featured Project */}
                <div className="md:col-span-5 flex flex-col items-end">
                    <div className="flex justify-between items-center mb-4 sm:mb-6 w-full md:w-full md:pl-20">
                        <span className="text-base sm:text-xl font-medium tracking-tight uppercase opacity-60">Featured</span>
                        <span className="text-base sm:text-xl font-mono opacity-40 text-gray-400 tracking-tighter">(02)</span>
                    </div>

                    <div className="w-full h-[180px] sm:h-[200px] md:h-[240px] bg-[#0A0A0A] rounded-xl sm:rounded-[2rem] overflow-hidden relative group border border-white/5 transition-all duration-700 hover:border-white/20 hover:shadow-[0_0_50px_rgba(255,255,255,0.05)] cursor-hover">
                        <ParallaxImage
                            src="/placeholder.png"
                            alt="Featured Project"
                            className="group-hover:grayscale-0 transition-all duration-700 grayscale"
                            speed={0.1}
                        />
                        {/* Overlay Content */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 sm:p-10 flex flex-col justify-between pointer-events-none">
                            <div className="flex justify-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer">
                                    <MoveUpRight size={20} />
                                </div>
                            </div>
                            <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <h4 className="text-2xl sm:text-3xl font-serif italic mb-2 text-white leading-tight">Mobile App</h4>
                                <div className="flex gap-2 sm:gap-3 items-center">
                                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                                    <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white/50 font-sans">Finance / 2026</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    );
}
