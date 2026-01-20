'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { MessageSquareQuote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title Animation
            gsap.fromTo(titleRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        once: true
                    }
                }
            );

            // Scattered Cards Animation
            // We want them to float in from slightly different directions/delays
            const cards = cardsRef.current?.children;
            if (cards) {
                Array.from(cards).forEach((card, i) => {
                    const xOffset = i % 2 === 0 ? -50 : 50;
                    gsap.fromTo(card,
                        { x: xOffset, y: 50, opacity: 0 },
                        {
                            x: 0,
                            y: 0,
                            opacity: 1,
                            duration: 1.2,
                            delay: i * 0.1,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: "top 60%",
                                once: true
                            }
                        }
                    );
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const testimonials = [
        {
            id: 1,
            text: "Agencify felt like an extension of our team. Their design instincts and speed were exactly what we needed to launch on time — and with style.",
            name: "Sarah Coleman",
            role: "CEO at NovaTech",
            image: "/client-1.png",
            position: "top-[-5%] left-[5%] md:left-[10%] z-10"
        },
        {
            id: 2,
            text: "From the first call to the final handoff, everything was seamless. The UI/UX work was some of the best we've seen.",
            name: "Daniel Reyes",
            role: "Product Manager at Clarity CRM",
            image: "/client-4.png",
            position: "top-[10%] right-[5%] md:right-[15%] z-10"
        },
        {
            id: 3,
            text: "We came to Agencify with a rough idea, and they turned it into a beautiful, functional MVP in weeks. Highly recommended.",
            name: "Rachel Lin",
            role: "Co-Founder at Driftly",
            image: "/client-3.png",
            position: "bottom-[5%] left-[2%] md:left-[5%] z-20"
        },
        {
            id: 4,
            text: "Their process is clear, communication is fast, and the results speak for themselves. We saw a 40% boost in engagement post-launch.",
            name: "Jason Ford",
            role: "Marketing Lead at BrightChain",
            image: "/client-2.png",
            position: "bottom-[10%] right-[2%] md:right-[10%] z-20"
        }
    ];

    return (
        <section ref={sectionRef} className="relative bg-black text-white min-h-[600px] sm:min-h-[800px] md:min-h-[900px] h-auto py-16 sm:py-24 md:py-32 overflow-hidden flex flex-col items-center justify-center">

            {/* Background Particles/Wave Effect */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-800 via-black to-black opacity-40" />

                {/* Simulated Wave Lines using Gradients */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(255,255,255,0.03)_21px,transparent_22px)] mask-image-radial-gradient" />
                <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent,transparent_30px,rgba(255,255,255,0.02)_31px,transparent_32px)] mask-image-radial-gradient" />
            </div>

            {/* Central Title */}
            <div ref={titleRef} className="relative z-30 text-center max-w-2xl px-4 sm:px-6 mb-12 sm:mb-20 md:mb-0">
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6 sm:mb-8">
                    <MessageSquareQuote size={12} className="text-gray-300" />
                    <span className="text-[9px] sm:text-[10px] font-bold text-gray-300 tracking-[0.2em] uppercase">Testimonials</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif">
                    Hear from the <span className="italic text-white/50">Clients</span> <br />
                    <span className="font-sans font-medium">We&apos;ve Partnered With</span>
                </h2>
            </div>

            {/* Scattered Cards Container */}
            {/* On mobile: Stacked. On desktop: Absolute positioning */}
            <div ref={cardsRef} className="relative w-full max-w-[1400px] h-auto md:h-[800px] flex flex-col md:block gap-6 sm:gap-8 px-4 sm:px-6 md:px-0 mt-8 sm:mt-12 md:mt-0">
                {testimonials.map((testimonial) => (
                    <div
                        key={testimonial.id}
                        className={`relative md:absolute w-full md:w-[420px] p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-[#0A0A0A]/90 border border-white/5 backdrop-blur-md shadow-2xl ${testimonial.position}`}
                    >
                        <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">&quot;{testimonial.text}&quot;</p>

                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                                <Image
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-xs sm:text-sm tracking-wide">{testimonial.name}</h4>
                                <p className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-wider">{testimonial.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
}
