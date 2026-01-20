'use client';
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const containerRef = useRef<HTMLDivElement>(null);
    const leftCardRef = useRef<HTMLDivElement>(null);
    const rightCardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Left Card Animation
            gsap.fromTo(leftCardRef.current,
                { x: -50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                        once: true
                    }
                }
            );

            // Right Card Animation
            gsap.fromTo(rightCardRef.current,
                { x: 50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1.2,
                    delay: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                        once: true
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="contact" ref={containerRef} className="bg-black text-white py-12 sm:py-16 md:py-32 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

                {/* Left Card - Aesthetic */}
                <div ref={leftCardRef} className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0A0A0A] border border-white/5 flex flex-col justify-end p-6 sm:p-8 md:p-12">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
                        {/* Dot Pattern */}
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
                            backgroundSize: '30px 30px'
                        }} />
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-2">Let&apos;s Talk</h2>
                        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-serif italic text-gray-400">Your Next Big Idea</p>
                    </div>
                </div>

                {/* Right Card - Form */}
                <div ref={rightCardRef} className="h-auto lg:h-[600px] rounded-2xl sm:rounded-3xl bg-black border border-white/10 p-6 sm:p-8 md:p-12 flex flex-col justify-center">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-200 mb-8 sm:mb-12">Fill This Form Below</h3>

                    <form className="flex flex-col gap-6 sm:gap-8">
                        <div className="group">
                            <label className="block text-xs sm:text-sm font-bold text-white mb-2">Your Name</label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                className="w-full bg-transparent border-b border-white/20 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
                            />
                        </div>

                        <div className="group">
                            <label className="block text-xs sm:text-sm font-bold text-white mb-2">Your Email</label>
                            <input
                                type="email"
                                placeholder="Enter the e-mail"
                                className="w-full bg-transparent border-b border-white/20 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
                            />
                        </div>

                        <div className="group">
                            <label className="block text-xs sm:text-sm font-bold text-white mb-2">More About The Project</label>
                            <textarea
                                rows={3}
                                className="w-full bg-transparent border-b border-white/20 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-white transition-colors resize-none"
                            />
                        </div>

                        <button type="button" className="w-full mt-4 sm:mt-8 py-3 sm:py-4 px-6 sm:px-8 rounded-full bg-white text-black font-bold text-base sm:text-lg hover:bg-gray-200 transition-colors">
                            Send Message
                        </button>
                    </form>
                </div>

            </div>
        </section>
    );
}
