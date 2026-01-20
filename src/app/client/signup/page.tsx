'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export default function ClientSignupPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white">
      <Navbar />

      <section className="pt-32 pb-24 px-6 md:px-12 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Client Sign up</h1>
        <p className="text-gray-400 mb-8 max-w-xl">
          Share a few details and we&apos;ll set up your client workspace so you can start submitting projects and
          tracking progress.
        </p>

        <div className="space-y-4 bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="px-4 py-3 rounded-lg bg-black border border-white/10 focus:outline-none focus:border-white/40"
              placeholder="Full name"
            />
            <input
              className="px-4 py-3 rounded-lg bg-black border border-white/10 focus:outline-none focus:border-white/40"
              placeholder="Company name"
            />
          </div>

          <input
            className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 focus:outline-none focus:border-white/40"
            placeholder="Work email"
            type="email"
          />

          <textarea
            className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 focus:outline-none focus:border-white/40 min-h-[140px]"
            placeholder="What kind of projects do you want to work on with us?"
          />

          <button className="mt-4 inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-black text-sm font-bold hover:bg-gray-200 transition-colors">
            Request access
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
