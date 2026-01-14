'use client';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const BlogHero = dynamic(() => import('@/components/AllHero'), { ssr: false });
const Team = dynamic(() => import('@/components/Team'), { ssr: false });
const Testimonials = dynamic(() => import('@/components/Testimonials'), { ssr: false });

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white">
            <Navbar />

            {/* Reused Hero */}
            <BlogHero
                label="Who We Are"
                title="Codeinc."
                description="We are a digital agency passionate about crafting unique, future-ready digital experiences."
            />

            {/* Mission Section */}
            <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-white/5">
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">
                            Driven by <span className="font-serif italic text-white/50">Innovation</span>
                        </h2>
                    </div>
                    <div className="space-y-6">
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Codeinc is more than just a development shop. We are a collective of thinkers, designers, and engineers dedicated to pushing the boundaries of what is possible on the web.
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Our philosophy is simple: create work that matters. Work that stands out. Work that works. We bridge the gap between aesthetic excellence and technical performance.
                        </p>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <Team />

            {/* Testimonials Section */}
            <Testimonials />

            <Footer />
        </main>
    );
}
