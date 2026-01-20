'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PageTransition() {
    const curtainRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.to(curtainRef.current, {
                yPercent: -100,
                duration: 1.2,
                ease: "power4.inOut",
                delay: 0.2
            })
                .set(curtainRef.current, { display: "none" });

        }, curtainRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={curtainRef}
            className="fixed inset-0 bg-black z-[10000] flex items-center justify-center text-white"
        >
            {/* Optional: Add a loader or logo here */}
            <div className="text-2xl font-serif italic animate-pulse">CodeInc.</div>
        </div>
    );
}
