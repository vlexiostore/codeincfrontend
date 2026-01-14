'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { Check, ArrowRight } from 'lucide-react';

const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export default function ProjectDetail() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white">
            <Navbar />

            <article className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">

                {/* Header Split */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-16">
                    <h1 className="text-6xl md:text-8xl font-medium tracking-tighter text-white max-w-4xl">
                        The News
                    </h1>
                    <div className="md:max-w-xs md:text-right mt-2">
                        <p className="text-sm md:text-base text-gray-400 font-medium leading-relaxed">
                            A mobile app designed to help users get the stories that matter most.
                        </p>
                    </div>
                </div>

                {/* Hero Visualization Container */}
                <div className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-neutral-900 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/5 mb-20 flex items-center justify-center group">

                    {/* Gradient Background */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-950 to-black opacity-80" />

                    {/* Phone Mockup */}
                    <div className="relative z-10 w-[280px] md:w-[320px] aspect-[9/19] bg-black rounded-[3rem] border-4 border-neutral-700 shadow-2xl overflow-hidden ring-1 ring-white/10">
                        {/* Dynamic Island / Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-xl z-20" />

                        {/* Screen Content */}
                        <div className="w-full h-full bg-neutral-200 flex flex-col pt-12 px-6 pb-8 relative">
                            {/* App Header */}
                            <div className="flex justify-between items-center mb-8">
                                <span className="font-bold text-black text-lg">+ Swiss</span>
                                <div className="space-x-1">
                                    <div className="w-6 h-0.5 bg-black ml-auto" />
                                    <div className="w-4 h-0.5 bg-black ml-auto mt-1" />
                                </div>
                            </div>

                            {/* App Hero */}
                            <div className="flex-1 flex flex-col justify-center">
                                <h2 className="text-4xl font-bold text-neutral-800 leading-tight mb-2">
                                    Electric
                                    <span className="block text-neutral-400">Future</span>
                                </h2>
                                {/* Car Silhouette Placeholder */}
                                <div className="flex-1 bg-gradient-to-tr from-neutral-300 to-neutral-100 rounded-xl my-4 opacity-50 relative overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center text-neutral-400 text-xs uppercase tracking-widest font-bold">Car Visual</div>
                                </div>
                            </div>

                            {/* App Footer */}
                            <div>
                                <p className="text-[10px] text-neutral-500 mb-4 leading-relaxed">
                                    Discover the perfect solution for all your business transportation needs.
                                </p>
                                <button className="w-full py-3 bg-black text-white text-xs font-bold rounded-full flex items-center justify-center gap-2">
                                    LEARN MORE <ArrowRight size={10} />
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* Reflection/Ground Effect */}
                    <div className="absolute bottom-0 w-full h-[30%] bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
                </div>

                {/* Content */}
                <div className="max-w-4xl mx-auto space-y-20">

                    {/* Project Overview */}
                    <section className="space-y-6">
                        <h3 className="text-xl font-bold text-white">Project Overview</h3>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            This project centered on reinventing the brand&apos;s digital identity across both web and mobile platforms. The goal was to create a cohesive, user-first experience that would elevate their online presence and support their growth across digital channels. Working closely with stakeholders, we defined key objectives around usability, aesthetics and performance.
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            In a fast-moving digital landscape, the brand approached us with a clear mission — to reimagine their presence across both web and mobile platforms in a way that not only captured their identity but also supported future scalability. Their existing digital experience was fragmented, slow, and lacked visual consistency making it difficult to convert users or retain engagement.
                        </p>
                    </section>

                    <div className="h-px bg-white/10 w-full" />

                    {/* Approach */}
                    <section className="space-y-6">
                        <h3 className="text-xl font-bold text-white">
                            Design & Frontend Approach
                        </h3>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Once the strategy was locked in, we shifted into design and development. Our UI process began with low-fidelity wireframes and prototypes to map interaction, hierarchy and information flow. Once validated, we transitioned into high-fidelity UI design in Figma, crafting components that would later form the basis of a unified design system.
                        </p>

                        <div className="space-y-4 mt-8">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                                    <Check size={10} className="text-white" />
                                </div>
                                <span className="text-sm font-bold text-gray-300">Fully responsive UI</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                                    <Check size={10} className="text-white" />
                                </div>
                                <span className="text-sm font-bold text-gray-300">Pixel-perfect frontend</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                                    <Check size={10} className="text-white" />
                                </div>
                                <span className="text-sm font-bold text-gray-300">Scalable design system</span>
                            </div>
                        </div>
                    </section>

                </div>

            </article>

            <Footer />
        </main>
    );
}
