'use client';
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function AllHero({
    label = "Our Blog",
    title = "Insights.",
    description = "Thoughts on design, technology, and the future of digital experiences."
}: {
    label?: string;
    title?: string;
    description?: string;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(contentRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power3.out"
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-[50vh] md:h-[60vh] min-h-[400px] flex flex-col items-center justify-center bg-black overflow-hidden pt-32 md:pt-20">

            {/* Subtle Gradient Spot */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-white/5 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />

            {/* Content */}
            <div ref={contentRef} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                <span className="block text-xs md:text-base text-gray-400 mb-4 md:mb-6 tracking-[0.2em] uppercase font-medium">
                    {label}
                </span>
                <h1 className="text-5xl md:text-8xl font-serif italic text-white mb-4 md:mb-6 leading-tight">
                    {title}
                </h1>
                <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        </section>
    );
}
