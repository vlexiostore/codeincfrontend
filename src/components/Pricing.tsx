'use client';
import React, { useEffect, useRef } from 'react';
import { Check, Star, DollarSign } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CheckItem = ({ text }: { text: string }) => (
    <li className="flex items-start gap-3 text-sm text-gray-400">
        <div className="mt-0.5 w-4 h-4 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
            <Check size={10} className="text-white" />
        </div>
        <span>{text}</span>
    </li>
);

export default function Pricing() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header Animation
            gsap.fromTo(headerRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 85%",
                        once: true
                    }
                }
            );

            // Cards Animation
            const cards = gridRef.current?.children;
            if (cards) {
                gsap.fromTo(cards,
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: gridRef.current,
                            start: "top 75%",
                            once: true
                        }
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="pricing" ref={containerRef} className="bg-black text-white py-20 sm:py-24 md:py-48 px-4 sm:px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div ref={headerRef} className="flex flex-col items-center justify-center text-center mb-12 sm:mb-24 px-4">
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6 sm:mb-8">
                        <DollarSign size={12} className="text-gray-300" />
                        <span className="text-[9px] sm:text-[10px] font-bold text-gray-300 tracking-[0.2em] uppercase">Pricing Plan</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif mb-4 sm:mb-6">
                        Plans <span className="font-sans font-medium">That Scale With You</span>
                    </h2>
                    <p className="max-w-xl text-gray-500 text-xs sm:text-sm md:text-base leading-relaxed">
                        Whether you&apos;re launching a startup or growing a product, we&apos;ve got a plan that fits your stage — no fluff, just what you need.
                    </p>
                </div>

                {/* Pricing Grid */}
                <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">

                    {/* Starter Plan */}
                    <div className="flex flex-col p-6 sm:p-8 rounded-xl sm:rounded-[2rem] bg-black border border-white/10 hover:border-white/20 transition-colors duration-300">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center mb-4 sm:mb-6 text-xs sm:text-sm font-bold text-white">1</div>
                        <h3 className="text-lg sm:text-xl font-bold mb-2">Starter Plan</h3>
                        <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">For early-stage ideas or small projects</p>

                        <div className="flex items-baseline gap-1 mb-6 sm:mb-8">
                            <span className="text-3xl sm:text-4xl font-bold">$500+</span>
                            <span className="text-gray-500 text-xs sm:text-sm">/ Project</span>
                        </div>

                        <button className="w-full py-3 sm:py-4 text-sm sm:text-base rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors mb-6 sm:mb-8">
                            Get Started
                        </button>

                        <div className="relative flex items-center justify-center mb-8">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                            <span className="relative bg-black px-4 text-xs text-gray-500 uppercase tracking-widest">Plan Detail</span>
                        </div>

                        <ul className="space-y-4">
                            <CheckItem text="Discovery session & roadmap" />
                            <CheckItem text="Basic frontend development" />
                            <CheckItem text="2 rounds of revisions" />
                            <CheckItem text="1-week turnaround" />
                        </ul>
                    </div>

                    {/* Growth Plan (Popular) */}
                    <div className="relative flex flex-col p-6 sm:p-8 rounded-xl sm:rounded-[2rem] bg-white/[0.03] border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.05)] transform sm:-translate-y-2 md:-translate-y-4">
                        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] sm:text-xs font-bold uppercase tracking-wide">
                            <Star size={8} className="fill-yellow-500" /> Popular
                        </div>

                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-black flex items-center justify-center mb-4 sm:mb-6 text-xs sm:text-sm font-bold">2</div>
                        <h3 className="text-lg sm:text-xl font-bold mb-2">Growth Plan</h3>
                        <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">For growing brands or MVP launches</p>

                        <div className="flex items-baseline gap-1 mb-6 sm:mb-8">
                            <span className="text-3xl sm:text-4xl font-bold">$1500+</span>
                            <span className="text-gray-500 text-xs sm:text-sm">/ Project</span>
                        </div>

                        <button className="w-full py-3 sm:py-4 text-sm sm:text-base rounded-full bg-white hover:bg-gray-200 text-black font-bold transition-colors mb-6 sm:mb-8">
                            Get Started
                        </button>

                        <div className="relative flex items-center justify-center mb-8">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                            <span className="relative px-4 text-xs text-gray-500 uppercase tracking-widest" style={{ backgroundColor: '#0E0E0E' }}>Plan Detail</span>
                        </div>

                        <ul className="space-y-4">
                            <CheckItem text="End-to-end design & dev" />
                            <CheckItem text="Responsive frontend & CMS" />
                            <CheckItem text="Light brand styling" />
                            <CheckItem text="SEO-ready & launch support" />
                            <CheckItem text="2-3 weeks delivery" />
                        </ul>
                    </div>

                    {/* Custom Plan */}
                    <div className="flex flex-col p-6 sm:p-8 rounded-xl sm:rounded-[2rem] bg-black border border-white/10 hover:border-white/20 transition-colors duration-300 sm:col-span-2 md:col-span-1">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center mb-4 sm:mb-6 text-xs sm:text-sm font-bold text-white">3</div>
                        <h3 className="text-lg sm:text-xl font-bold mb-2">Custom Plan</h3>
                        <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">For complex products or long-term builds</p>

                        <div className="flex items-baseline gap-1 mb-6 sm:mb-8">
                            <span className="text-3xl sm:text-4xl font-bold">Custom</span>
                            <span className="text-gray-500 text-xs sm:text-sm">/ Project</span>
                        </div>

                        <button className="w-full py-3 sm:py-4 text-sm sm:text-base rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors mb-6 sm:mb-8">
                            Get Started
                        </button>

                        <div className="relative flex items-center justify-center mb-8">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                            <span className="relative bg-black px-4 text-xs text-gray-500 uppercase tracking-widest">Plan Detail</span>
                        </div>

                        <ul className="space-y-4">
                            <CheckItem text="Full product design + development" />
                            <CheckItem text="Feature-rich platforms or apps" />
                            <CheckItem text="Advanced backend integrations" />
                            <CheckItem text="Dedicated team & PM" />
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
}
