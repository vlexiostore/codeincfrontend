'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
    children: string;
    className?: string;
    delay?: number;
    threshold?: number;
}

export default function TextReveal({ children, className = "", delay = 0, threshold = 0.5 }: TextRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Split text into words
    const words = children.split(" ");

    useEffect(() => {
        const ctx = gsap.context(() => {
            const q = gsap.utils.selector(containerRef.current);

            gsap.fromTo(q(".word"),
                {
                    y: 50,
                    opacity: 0,
                    rotateX: -45
                },
                {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    duration: 1,
                    stagger: 0.05,
                    ease: "power3.out",
                    delay: delay,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 90%", // Animate when top of element hits 90% of viewport height
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [delay]);

    return (
        <div ref={containerRef} className={`overflow-hidden perspective-text ${className}`}>
            {words.map((word, i) => (
                <span key={i} className="word inline-block mr-2 origin-top-left transform-style-3d">
                    {word}
                </span>
            ))}
            <style jsx global>{`
            .perspective-text {
                perspective: 1000px;
            }
            .transform-style-3d {
                transform-style: preserve-3d;
            }
       `}</style>
        </div>
    );
}
