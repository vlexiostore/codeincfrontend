'use client';
import React, { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const bgTextRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Background Text Parallax
            gsap.to(bgTextRef.current, {
                y: 100,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });

            // Content Fade Up
            if (contentRef.current) {
                gsap.fromTo(contentRef.current.children,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: contentRef.current,
                            start: "top 80%",
                            once: true
                        }
                    }
                );
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const stats = [
        { label: "Projects Launched", value: "140+" },
        { label: "Years Of Experience", value: "10+" },
        { label: "Happy Clients", value: "50+" },
    ];

    return (
        <section id="about" ref={sectionRef} className="relative bg-black text-white py-32 md:py-48 overflow-hidden">

            {/* Background "agencify" Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <h1
                    ref={bgTextRef}
                    className="text-[12rem] md:text-[20rem] font-serif italic text-white/[0.03] leading-none tracking-tighter mix-blend-screen"
                >
                    agencify
                </h1>
            </div>

            {/* Dotted Pattern at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/[0.03] to-transparent bg-[length:4px_4px] opacity-20" />

            {/* Main Content */}
            <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm mb-12">
                    <Star size={12} className="text-white fill-white" />
                    <span className="text-xs uppercase tracking-[0.2em] font-medium text-gray-300">About Us</span>
                </div>

                {/* Main Heading */}
                <h2 className="max-w-3xl text-3xl md:text-5xl font-medium leading-[1.3] mb-32">
                    We help ambitious <span className="text-white font-bold">brands</span> and startups build digital products that <span className="text-white font-bold">stand out and scale.</span> We <span className="text-gray-500">believe</span> in working smart, building fast, and designing with purpose.
                </h2>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-32 w-full border-t border-white/5 pt-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-start md:items-center text-left md:text-center group">
                            <span className="text-sm text-gray-500 mb-6 block w-full border-b border-white/10 pb-4 md:border-none md:pb-0">{stat.label}</span>
                            <span className="text-6xl md:text-8xl font-sans tracking-tight text-white/90 group-hover:text-white transition-colors duration-300">
                                {stat.value}
                            </span>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
