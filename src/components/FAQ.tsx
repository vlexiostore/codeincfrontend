'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FAQ() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header Animation
            gsap.fromTo(headerRef.current,
                { y: 30, opacity: 0 },
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

            // List Animation
            const items = listRef.current?.children;
            if (items) {
                gsap.fromTo(items,
                    { y: 20, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: listRef.current,
                            start: "top 80%",
                            once: true
                        }
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "How long does a typical project take?",
            answer: "Project timelines vary based on scope, but most branding or website projects take between 2–4 weeks. Complex apps or platforms may take longer — we'll always give you a clear timeline upfront."
        },
        {
            question: "Do you offer ongoing support after launch?",
            answer: "Yes! We offer flexible support packages to ensure your digital product stays up-to-date, secure, and performs optimally as your business grows."
        },
        {
            question: "What if I only need design or development, not both?",
            answer: "We are happy to accommodate requests for specific services. Whether you have a design ready for development or need a design system for your internal team, we can help."
        },
        {
            question: "Can you work with my internal team?",
            answer: "Absolutely. We often collaborate with internal marketing, design, and engineering teams to augment capabilities and accelerate delivery."
        },
        {
            question: "Do you work with startups or only established companies?",
            answer: "We work with ambitious companies of all sizes. From early-stage startups needing an MVP to established enterprises looking for a refresh, our process scales to fit your needs."
        }
    ];

    return (
        <section ref={containerRef} className="bg-black text-white py-20 sm:py-32 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div ref={headerRef} className="flex flex-col items-center justify-center text-center mb-12 sm:mb-24">
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6 sm:mb-8">
                        <HelpCircle size={12} className="text-gray-300" />
                        <span className="text-[9px] sm:text-[10px] font-bold text-gray-300 tracking-[0.2em] uppercase">FAQs</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-sans tracking-tight">FAQs</h2>
                </div>

                {/* FAQ List */}
                <div ref={listRef} className="flex flex-col">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-white/10 last:border-none">
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between py-4 sm:py-6 md:py-8 text-left group gap-4"
                            >
                                <span className={`text-base sm:text-lg md:text-xl lg:text-2xl font-medium transition-colors duration-300 flex-1 ${openIndex === index ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                    {faq.question}
                                </span>
                                <div className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center border transition-all duration-300 flex-shrink-0 ${openIndex === index ? 'bg-white border-white text-black' : 'bg-transparent border-white/20 text-gray-400 group-hover:border-white group-hover:text-white'}`}>
                                    {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                                </div>
                            </button>

                            <div
                                className={`grid transition-all duration-500 ease-in-out ${openIndex === index ? 'grid-rows-[1fr] opacity-100 mb-4 sm:mb-6 md:mb-8' : 'grid-rows-[0fr] opacity-0'}`}
                            >
                                <div className="overflow-hidden">
                                    <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-2xl">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
