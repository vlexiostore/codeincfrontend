'use client';
import { useRef, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps extends ImageProps {
    containerClassName?: string;
    speed?: number; // 0 to 1 for slow to fast, negative for reverse
}

export default function ParallaxImage({ containerClassName, speed = 0.5, alt, ...props }: ParallaxImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!containerRef.current || !imgRef.current) return;

            gsap.fromTo(imgRef.current,
                {
                    yPercent: -10 * speed
                },
                {
                    yPercent: 10 * speed,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [speed]);

    return (
        <div ref={containerRef} className={`overflow-hidden relative ${containerClassName || ''}`}>
            <div ref={imgRef} className="h-[120%] w-full relative -top-[10%]">
                <Image
                    fill
                    alt={alt || "Parallax Image"}
                    className="object-cover"
                    {...props}
                />
            </div>
        </div>
    );
}
