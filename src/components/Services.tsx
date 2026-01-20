'use client'
import React, { useEffect, useRef } from 'react';
import { Layers, Palette, Monitor, BarChart3, PenTool } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header Animation
            gsap.fromTo(headerRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 90%",
                        once: true
                    }
                }
            );

            // Grid Cards Animation
            const cards = gridRef.current?.children;
            if (cards) {
                gsap.fromTo(cards,
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: gridRef.current,
                            start: "top 85%",
                            once: true
                        }
                    }
                );
            }
        }, containerRef);

        ScrollTrigger.refresh();

        return () => {
            ctx.revert();
            ScrollTrigger.refresh();
        };
    }, []);

    const services = [
        {
            id: "01",
            title: "App Development",
            description: "Create visual apps that align with your voice and make lasting impressions.",
            icon: <Layers size={42} className="text-white" />
        },
        {
            id: "02",
            title: "UI/UX Design",
            description: "Focus on user-first interfaces that are both beautiful, intuitive, and purposes.",
            icon: <Palette size={42} className="text-white" />
        },
        {
            id: "03",
            title: "Web Development",
            description: "Develop high-performance websites and apps built to grow with you.",
            icon: <Monitor size={42} className="text-white" />
        },
        {
            id: "04",
            title: "Digital Marketing",
            description: "Craft data-driven campaigns that attract, engage, and convert — across channels.",
            icon: <BarChart3 size={42} className="text-white" />
        }
    ];

    return (
        <section id="services" ref={containerRef} className="bg-black text-white py-20 sm:py-32 px-4 sm:px-6 md:px-12 relative z-20 overflow-hidden">
            <div className="max-w-[1700px] mx-auto">

                {/* Header Section */}
                <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-20 gap-8 sm:gap-12">
                    <div>
                        {/* Badge matching image */}
                        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#1A1A1A]/80 border border-white/10 mb-6 sm:mb-10 shadow-lg backdrop-blur-md">
                            <PenTool size={12} className="text-gray-300" />
                            <span className="text-[9px] sm:text-[10px] font-bold text-gray-300 tracking-[0.1em] uppercase">Our Services</span>
                        </div>

                        {/* Heading matching image typography */}
                        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[0.9] font-normal">
                            <span className="font-serif italic mr-2 sm:mr-4 text-white">What</span>
                            <span className="font-sans text-white/90">We Do</span>
                        </h2>
                    </div>

                    {/* Description matching image right-alignment */}
                    <div className="max-w-md text-left text-gray-500 text-sm sm:text-base md:text-[17px] font-light leading-relaxed">
                        <p>We craft digital experiences from idea to launch — blending strategy, design, and engineering to build products that performs.</p>
                    </div>
                </div>

                {/* Grid matching image structure */}
                <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border border-white/10 rounded-xl sm:rounded-2xl md:rounded-[2.5rem] overflow-hidden bg-[#050505]/50 backdrop-blur-sm">
                    {services.map((service, index) => (
                        <div key={service.id} className={`group relative p-6 sm:p-8 md:p-12 min-h-[280px] sm:min-h-[320px] md:h-[480px] flex flex-col justify-between transition-colors duration-500 hover:bg-white/[0.02] ${index !== services.length - 1 ? 'sm:border-r md:border-r border-white/10' : ''} border-b sm:border-b-0 border-white/10`}>

                            {/* Centered Glass Icon Container */}
                            <div className="flex-1 flex items-center justify-center">
                                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center shadow-2xl">
                                    {/* Layered Glass Effect */}
                                    <div className="absolute inset-0 bg-[#222]/30 rounded-xl sm:rounded-2xl border border-white/10 shadow-[inner_0_0_20px_rgba(255,255,255,0.05)] blur-[0.5px]" />
                                    <div className="absolute inset-2 bg-gradient-to-br from-white/10 to-transparent rounded-lg sm:rounded-xl opacity-50" />

                                    {/* Icon with slight glow */}
                                    <div className="relative z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                                        <div className="scale-75 sm:scale-90 md:scale-100">
                                            {service.icon}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Section at bottom */}
                            <div className="space-y-3 sm:space-y-4 relative z-10">
                                <span className="block text-[10px] sm:text-[11px] font-bold text-white tracking-[0.2em] mb-3 sm:mb-4">/{service.id}</span>
                                <div className="space-y-2 sm:space-y-3">
                                    <h3 className="text-xl sm:text-2xl md:text-[26px] font-semibold text-white tracking-tight leading-tight">{service.title}</h3>
                                    <p className="text-gray-500 text-sm sm:text-[15px] leading-relaxed font-light group-hover:text-gray-400 transition-colors duration-500">
                                        {service.description}
                                    </p>
                                </div>
                            </div>

                            {/* Subtle Gradient Glow at bottom on hover */}
                            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
