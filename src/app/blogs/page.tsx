'use client';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const BlogHero = dynamic(() => import('@/components/AllHero'), { ssr: false });
const BlogList = dynamic(() => import('@/components/BlogList'), { ssr: false });

export default function BlogsPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white">
            <Navbar />
            <BlogHero />
            <BlogList />
            <Footer />
        </main>
    );
}
