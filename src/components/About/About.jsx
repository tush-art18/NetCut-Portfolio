import React, { useEffect, useRef, useState } from 'react';

const stats = [
    { value: '2+', label: 'Years of Experience' },
    { value: '120+', label: 'Projects Completed' },
    { value: '40+', label: 'Happy Clients' },
    { value: '15+', label: 'Awards Won' },
];

const skills = [
    'Adobe Premiere Pro',
    'After Effects',
    'DaVinci Resolve',
    'Final Cut Pro',
    'Cinema 4D',
    'Audition',
];

const About = () => {
    const [inView, setInView] = useState(false);
    const sectionRef = useRef(null);

    // Trigger animation when section enters viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold: 0.2 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const anim = (animation, delay = '0s', duration = '0.9s') =>
        inView
            ? { animationDelay: delay, animationDuration: duration, animationFillMode: 'both' }
            : { opacity: 0 };

    const cls = (animation) =>
        inView ? `animate__animated ${animation}` : '';

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative flex items-center w-full min-h-screen px-10 py-24 overflow-hidden bg-black font-outfit lg:px-20"
        >
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)' }} />

            <div className="relative z-10 grid items-center w-full grid-cols-1 gap-20 mx-auto max-w-7xl lg:grid-cols-2">

                {/* ── LEFT: Image card ── */}
                <div className={`relative ${cls('animate__fadeInLeft')}`} style={anim('animate__fadeInLeft', '0.1s', '1s')}>
                    {/* Decorative orange border frame */}
                    <div className="absolute w-full h-full border -top-4 -left-4 border-orange-500/30 rounded-2xl" />

                    <div className="relative rounded-2xl overflow-hidden aspect-[3/2] max-h-[620px]">
                        <img
                            src="/photo2.png"
                            alt="About"
                            className="object-cover object-top w-full h-full brightness-90 saturate-110"
                        />
                        {/* Dark gradient at bottom of card */}
                        <div className="absolute inset-0"
                            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }} />

                        {/* Floating experience badge */}
                        <div className="absolute px-5 py-3 border bottom-6 left-6 bg-white/10 backdrop-blur-md border-white/20 rounded-xl">
                            <p className="text-orange-400 text-xs font-bold tracking-widest uppercase mb-0.5">Experience</p>
                            <p className="text-2xl font-black leading-none text-white">2+ Years</p>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: Content ── */}
                <div className="flex flex-col gap-8">

                    {/* Label */}
                    <div className={`flex items-center gap-3 ${cls('animate__fadeIn')}`}
                        style={anim('animate__fadeIn', '0.3s', '0.8s')}>
                        <span className="w-8 h-[2px] bg-orange-500 block" />
                        <span className="text-orange-500 text-sm font-semibold tracking-[0.2em] uppercase">About Me</span>
                    </div>

                    {/* Heading */}
                    <h2 className={`text-white text-5xl lg:text-6xl font-black leading-tight tracking-tight m-0 ${cls('animate__fadeInUp')}`}
                        style={anim('animate__fadeInUp', '0.5s', '0.9s')}>
                        Netresh <br />
                        <span className="text-orange-500">Satpute.</span>
                    </h2>

                    {/* Bio */}
                    <p className={`text-white/60 text-base leading-relaxed max-w-md ${cls('animate__fadeIn')}`}
                        style={anim('animate__fadeIn', '0.7s', '1s')}>
                        With experience at Trans Aviacons and Arham Vijja, I am a Hyderabad-based video editor specializing in DaVinci Resolve and Blender. My expertise spans cinematic color grading, motion graphics, premium SaaS visuals, 2.5D/3D documentary compositions, and high-end wedding films. Always learning, I match new trends to craft compelling cinematic storytelling.
                    </p>


                    {/* Stats row */}
                    <div className={`grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-white/10 ${cls('animate__fadeIn')}`}
                        style={anim('animate__fadeIn', '1.1s', '1s')}>
                        
                    </div>

                    {/* CTA */}
                    <div className={`flex items-center gap-4 pt-2 ${cls('animate__fadeInUp')}`}
                        style={anim('animate__fadeInUp', '1.1s', '0.9s')}>
                        <a href="/netresh-Resume.pdf" target='_blank'
                            className="flex items-center gap-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full px-7 py-3 text-sm font-bold transition-all duration-300 hover:scale-105 no-underline">
                            VIEW RESUME
                            <span className="text-base">→</span>
                        </a>
                        <a href="/netresh-Resume.pdf" download
                            className="text-white/70 hover:text-white text-sm font-medium no-underline transition-colors duration-300 border-b border-white/20 hover:border-white pb-0.5">
                            Download Resume
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;