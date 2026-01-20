'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Team() {
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

    const team = [
        {
            id: 1,
            name: "M. Adan",
            role: "Co-Founder",
            tag: "Leader",
            image: "/adan2.png"
        },
        {
            id: 2,
            name: "Leonie Blatt",
            role: "CEO & Founder",
            tag: "CEO & Founder",
            image: "/leonie2.png"
        },
        {
            id: 3,
            name: "Ahmad Umar",
            role: "Co-Founder",
            tag: "Development Team",
            image: "/placeholder.png"
        }
    ];

    return (
        <section ref={containerRef} className="bg-black text-white py-20 sm:py-32 md:py-40 px-4 sm:px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div ref={headerRef} className="flex flex-col items-center justify-center text-center mb-12 sm:mb-24">
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6 sm:mb-8">
                        <Users size={12} className="text-gray-300" />
                        <span className="text-[9px] sm:text-[10px] font-bold text-gray-300 tracking-[0.2em] uppercase">Team Members</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight px-4">
                        Meet Our <span className="font-serif italic text-white/50">Team Members</span>
                    </h2>
                </div>

                {/* Team Grid */}
                <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                    {team.map((member) => (
                        <div key={member.id} className="group relative h-[350px] sm:h-[400px] md:h-[450px] rounded-2xl sm:rounded-3xl overflow-hidden bg-white/[0.02] border border-white/5 transition-all duration-500 hover:border-white/20">

                            {/* Background Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10" />
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            {/* Image */}
                            <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className={`object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0 ${
                                        member.id === 1 ? 'object-center' : 'object-top'
                                    }`}
                                />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-between z-20">
                                {/* Top Tag */}
                                <div className="self-start">
                                    <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs font-medium tracking-wide uppercase text-white/90">
                                        {member.tag}
                                    </span>
                                </div>

                                {/* Bottom Info */}
                                <div>
                                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1 sm:mb-2">{member.name}</h3>
                                    <p className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-medium">{member.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
