'use client';
import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const blogs = [
    {
        id: 1,
        slug: 'ui-trends-in-design',
        title: "UI Trends in Design",
        description: "Design principles are the foundation...",
        date: "June 2025",
        image: null // Placeholder
    },
    {
        id: 2,
        slug: 'designing-trends',
        title: "Designing Trends",
        description: "What's in, what's out and how...",
        date: "March 2025",
        image: null
    },
    {
        id: 3,
        slug: 'sketch-to-screen',
        title: "Sketch to Screen",
        description: "How raw ideas evolve into products...",
        date: "April 2024",
        image: null
    },
    {
        id: 4,
        slug: 'minimal-is-not-empty',
        title: "Minimal is not Empty",
        description: "Crafting impact with less elements...",
        date: "May 2025",
        image: null
    },
    {
        id: 5,
        slug: 'the-art-of-visual',
        title: "The Art of Visual",
        description: "How to design narratives with...",
        date: "June 2024",
        image: null
    }
];

export default function BlogList() {
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (listRef.current) {
                gsap.fromTo(listRef.current.children,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: listRef.current,
                            start: "top 80%",
                            once: true
                        }
                    }
                );
            }
        }, listRef);

        return () => {
            ctx.revert();
            ScrollTrigger.refresh();
        };
    }, []);

    return (
        <section className="bg-black py-20 px-6">
            <div className="max-w-7xl mx-auto">

                {/* Header Badge */}
                <div className="flex justify-center mb-16">
                    <div className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                        <MessageCircle size={16} className="text-gray-400" />
                        <span className="text-sm font-medium text-gray-300">Blog Insights</span>
                    </div>
                </div>

                {/* Grid */}
                <div ref={listRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <Link
                            key={blog.id}
                            href={`/blogs/${blog.slug}`}
                            className="group relative bg-white/[0.03] border border-white/5 hover:border-white/20 rounded-[2.5rem] p-8 transition-colors duration-500 flex flex-col h-[500px]"
                        >
                            {/* Top Info */}
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                                        {blog.title.split(' ').map((word, i) => (
                                            <span key={i} className={i % 2 !== 0 ? "font-serif italic font-normal text-gray-400" : ""}>
                                                {word}{' '}
                                            </span>
                                        ))}
                                    </h3>
                                    <p className="text-sm text-gray-500">{blog.description}</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] uppercase text-gray-600 tracking-wider font-bold">Date</span>
                                    <p className="text-xs text-white font-medium mt-1">{blog.date}</p>
                                </div>
                            </div>

                            {/* Image Placeholder Area */}
                            <div className="flex-1 w-full rounded-[1.5rem] overflow-hidden bg-neutral-900 border border-white/5 relative group-hover:scale-[1.02] transition-transform duration-500">
                                <div className="absolute inset-0 flex items-center justify-center text-neutral-700">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                                            <span className="text-2xl">📷</span>
                                        </div>
                                        <span className="text-xs uppercase tracking-widest font-bold">Image</span>
                                    </div>
                                </div>

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}
