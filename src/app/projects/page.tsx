'use client';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const BlogHero = dynamic(() => import('@/components/AllHero'), { ssr: false });
const Projects = dynamic(() => import('@/components/Projects'), { ssr: false });

export default function ProjectsPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white">
            <Navbar />

            {/* Reused Hero */}
            <BlogHero
                label="Our Work"
                title="Projects."
                description="A showcase of our finest digital craftsmanship and technical innovation."
            />

            {/* Projects Section - Reusing the component from Home but ensuring it looks good in this context. 
               The Projects component usually has its own internal padding/container, so simple placement should work.
            */}
            <div className="pt-12">
                <Projects />
            </div>

            <Footer />
        </main>
    );
}
