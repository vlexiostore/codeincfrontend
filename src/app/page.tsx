'use client';
import dynamic from 'next/dynamic';

// --- Sections ---

const Hero = dynamic(() => import('@/components/Hero'), {
  ssr: false,
  loading: () => <div className="h-screen bg-black" />
});

const Services = dynamic(() => import('@/components/Services'), {
  ssr: false
});



const About = dynamic(() => import('@/components/About'), {
  ssr: false
});

const Projects = dynamic(() => import('@/components/Projects'), {
  ssr: false
});

const Team = dynamic(() => import('@/components/Team'), {
  ssr: false
});

const Pricing = dynamic(() => import('@/components/Pricing'), {
  ssr: false
});

const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  ssr: false
});

const FAQ = dynamic(() => import('@/components/FAQ'), {
  ssr: false
});

const Contact = dynamic(() => import('@/components/Contact'), {
  ssr: false
});

const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: false
});

const Navbar = dynamic(() => import('@/components/Navbar'), {
  ssr: false
});

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Team />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
