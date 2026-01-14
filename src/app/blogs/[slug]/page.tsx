'use client';
import dynamic from 'next/dynamic';
import { Check } from 'lucide-react';

const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export default function BlogPost() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white">
            <Navbar />

            <article className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">

                {/* Header Split */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-16">
                    <h1 className="text-6xl md:text-9xl font-medium tracking-tighter text-white max-w-4xl">
                        UI Trends
                    </h1>
                    <div className="md:max-w-xs md:text-right mt-2">
                        <p className="text-sm md:text-base text-gray-400 font-medium leading-relaxed">
                            This is most Thoughtfully minimal interfaces that prioritize clarity, focus.
                        </p>
                    </div>
                </div>

                {/* Hero Image Container */}
                <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-neutral-900 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/5 mb-20 group">
                    {/* Placeholder for Image */}
                    <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center">
                        <div className="text-center grayscale opacity-50">
                            <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-700 to-black opacity-50 absolute inset-0 mix-blend-overlay" />
                            {/* Simulation of the poster in reference */}
                            <div className="relative z-10 border-4 border-white/20 p-12 bg-black/50 backdrop-blur-sm">
                                <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-widest text-white/80">
                                    This<br />Is<br />Not Real
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-4xl mx-auto space-y-16">

                    {/* Section 1 */}
                    <section className="space-y-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                            Designs are cleaner, calmer, and more intentional
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Minimal UI is more than just empty white space — it&apos;s about making choices that feel human. Today&apos;s interfaces prioritize clarity, focus, and effortless interaction. White space, clean typography, and flat elements are not just trendy; they&apos;re essential to avoid clutter and overwhelm. Simplicity builds trust; allows the design to speak with precision.
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            A Brand&apos;s new aim is appear elegant and efficient by reducing visual noise. Every color, every line, every motion matters. It&apos;s about decluttering, not depleting. Simplicity does not mean boring — it means smarter. And users are loving it. Typography plays a huge role in this movement. Designers are opting for legible, neutral fonts and generous spacing that make content breathable. Paired with soft color palettes and flat illustrations, this creates interfaces that feel lightweight and polished.
                        </p>
                    </section>

                    <div className="h-px bg-white/10 w-full" />

                    {/* Section 2 */}
                    <section className="space-y-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                            Micro interactions and motion are redefining engagement
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            User interfaces are evolving into dynamic systems that respond, adapt, and react in real time. From a soft button glow on hover to a bounce effect when swiping left — the tiny movement matters. These micro interactions aren&apos;t just visual candy; they guide behavior, signal success, and deepen engagement.
                        </p>

                        <div className="space-y-4 mt-8">
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                                    <Check size={12} className="text-white" />
                                </div>
                                <span className="text-sm font-bold text-gray-300">Micro interactions like hover, tap, drag</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                                    <Check size={12} className="text-white" />
                                </div>
                                <span className="text-sm font-bold text-gray-300">Smooth transitions between UI states</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                                    <Check size={12} className="text-white" />
                                </div>
                                <span className="text-sm font-bold text-gray-300">Scroll-based storytelling and effects</span>
                            </div>
                        </div>
                    </section>

                </div>

            </article>

            <Footer />
        </main>
    );
}
