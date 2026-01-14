'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header Animation
            gsap.fromTo(titleRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        once: true
                    }
                }
            );

            // Cards Animation
            const cards = cardsRef.current?.children;
            if (cards) {
                gsap.fromTo(cards,
                    { y: 100, opacity: 0, scale: 0.95 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1,
                        stagger: 0.3,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: cardsRef.current,
                            start: "top 75%",
                            once: true
                        }
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const projects = [
        {
            id: 1,
            slug: 'the-news',
            title: "The News",
            description: "Landing page design for news platform",
            tags: ["Web & App Design", "Responsive Frontends"],
            awards: [
                { icon: "W.", label: "Honor Mentions", date: "June 2024" },
                { icon: "Bm", label: "UI/UX Featured", date: "August 2024" }
            ],
            image: "/placeholder.png",
            bgColor: "bg-[#0A0A0A]"
        },
        {
            id: 2,
            slug: 'fintech-pulse',
            title: "Fintech Pulse",
            description: "Real-time financial analytics dashboard",
            tags: ["Dashboards", "Data Visualization"],
            awards: [
                { icon: "Aw", label: "Site of the Day", date: "Sept 2024" }
            ],
            image: "/placeholder.png",
            bgColor: "bg-[#080808]"
        }
    ];

    return (
        <section id="projects" ref={containerRef} className="bg-black text-white py-32 px-4 md:px-8">
            <div className="max-w-[1700px] mx-auto">

                {/* Section Header */}
                <div ref={titleRef} className="flex items-end justify-between mb-24 px-4">
                    <h2 className="text-6xl md:text-9xl font-serif tracking-tight">
                        Selected <span className="italic text-white/40">Works</span>
                    </h2>
                    <span className="hidden md:block text-sm uppercase tracking-widest text-neutral-500 mb-4">(2023 — 2025)</span>
                </div>

                {/* Projects Grid */}
                <div ref={cardsRef} className="flex flex-col gap-8 md:gap-16">
                    {projects.map((project) => (
                        <Link
                            key={project.id}
                            href={`/projects/${project.slug}`}
                            className={`group relative w-full h-[550px] md:h-[800px] ${project.bgColor} rounded-[2rem] md:rounded-[4rem] border border-white/5 overflow-hidden transition-colors duration-700 hover:border-white/10`}
                        >
                            {/* Background Glow */}
                            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            <div className="relative h-full flex flex-col justify-between p-8 md:p-16 z-10">

                                {/* Top Row: Tags & Awards */}
                                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                                    {/* Tags */}
                                    <div className="flex flex-col gap-3">
                                        {project.tags.map((tag, i) => (
                                            <span key={i} className="px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-sm text-neutral-300 w-fit">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Awards */}
                                    <div className="flex flex-col gap-6 text-right">
                                        {project.awards.map((award, i) => (
                                            <div key={i} className="flex items-center justify-end gap-3 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                                                <div className="text-right">
                                                    <p className="text-xs font-bold text-white uppercase tracking-wider">{award.label}</p>
                                                    <p className="text-[10px] text-neutral-500 uppercase mt-0.5">{award.date}</p>
                                                </div>
                                                <span className="text-xl font-serif font-bold italic">{award.icon}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Center Image (Phone Mockup) */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="relative w-[220px] md:w-[400px] aspect-[1/2] top-32 md:top-32 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-4">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-contain drop-shadow-2xl"
                                        />
                                    </div>
                                </div>

                                {/* Bottom Row: Title & Link */}
                                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mt-auto relative z-20">
                                    <div>
                                        <p className="text-neutral-400 text-sm md:text-base mb-2 font-medium tracking-wide">{project.description}</p>
                                        <h3 className="text-5xl md:text-8xl font-medium tracking-tight text-white group-hover:text-blue-500/80 transition-colors duration-500">
                                            {project.title}
                                        </h3>
                                    </div>

                                    {/* Interactive Button */}
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 cursor-pointer">
                                        <ArrowUpRight size={24} className="md:w-8 md:h-8" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}
