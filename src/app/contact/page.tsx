'use client';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const BlogHero = dynamic(() => import('@/components/AllHero'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact'), { ssr: false });
const FAQ = dynamic(() => import('@/components/FAQ'), { ssr: false });

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white">
            <Navbar />

            {/* Reused Hero */}
            <BlogHero
                label="Get in Touch"
                title="Contact."
                description="Ready to start your next project? We're here to help you build something amazing."
            />

            <div className="pt-12">
                <Contact />
            </div>

            <FAQ />

            <Footer />
        </main>
    );
}
