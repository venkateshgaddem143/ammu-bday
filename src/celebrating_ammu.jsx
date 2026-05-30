import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Star, PartyPopper, Heart } from 'lucide-react';

const CustomStyles = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Montserrat:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

      /* Dynamic Moving Gradient Background */
      .bg-dynamic {
        background: linear-gradient(-45deg, #6b215c, #b33966, #e6657a, #f59598, #b33966);
        background-size: 400% 400%;
        animation: gradientMove 15s ease infinite;
      }
      
      @keyframes gradientMove {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      /* --- NEW: Cinematic Effects & Color Grading --- */
      .cinematic-overlay {
        background: radial-gradient(circle at center, transparent 0%, rgba(80, 20, 50, 0.4) 100%);
        pointer-events: none;
      }
      
      .animated-gradient-text {
        background-size: 200% auto;
        animation: textGradient 4s linear infinite;
      }
      @keyframes textGradient {
        0% { background-position: 0% center; }
        100% { background-position: 200% center; }
      }

      /* --- NEW: Interactive Mouse Glow --- */
      .mouse-glow {
        position: fixed;
        width: 800px;
        height: 800px;
        background: radial-gradient(circle, rgba(255, 120, 160, 0.12) 0%, transparent 60%);
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        z-index: 5;
        transition: transform 0.1s ease-out;
        mix-blend-mode: screen;
      }

      /* Floating Fireflies */
      .firefly {
        position: absolute;
        border-radius: 50%;
        background-color: #ffdeb8;
        box-shadow: 0 0 10px 2px #ffdeb8, 0 0 20px 5px #ffb366;
        animation: floatFirefly 20s infinite linear;
        opacity: 0.6;
      }

      @keyframes floatFirefly {
        0% { transform: translateY(110vh) translateX(0) scale(1); opacity: 0; }
        10% { opacity: 0.8; }
        90% { opacity: 0.8; }
        100% { transform: translateY(-10vh) translateX(100px) scale(0.5); opacity: 0; }
      }

      /* --- Unique Image Shapes --- */
      /* 1. Organic Moving Blob */
      .shape-blob {
        border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
        animation: morph 8s ease-in-out infinite;
      }
      @keyframes morph {
        0%, 100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
        34% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; }
        67% { border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%; }
      }

      /* 2. Elegant Arch */
      .shape-arch {
        border-radius: 200px 200px 10px 10px;
      }

      /* 3. Diamond / Rhombus */
      .shape-diamond {
        clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
      }

      /* 4. Hexagon */
      .shape-hexagon {
        clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
      }

      /* 5. Petal / Leaf */
      .shape-petal {
        border-radius: 50% 0 50% 0;
      }

      /* --- 5 Unique Entry Animations --- */
      
      /* Animation 1: Cinematic Blur & Scale */
      .anim-blur-scale {
        animation: blurScale 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
      }
      @keyframes blurScale {
        0% { opacity: 0; filter: blur(20px); transform: scale(1.5); }
        100% { opacity: 1; filter: blur(0px); transform: scale(1); }
      }

      /* Animation 2: 3D Flip from bottom */
      .anim-3d-flip {
        animation: flip3D 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        transform-style: preserve-3d;
      }
      @keyframes flip3D {
        0% { opacity: 0; transform: perspective(1000px) rotateX(-90deg) translateY(100px); }
        100% { opacity: 1; transform: perspective(1000px) rotateX(0deg) translateY(0); }
      }

      /* Animation 3: Elastic Swirl */
      .anim-swirl {
        animation: swirlIn 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
      }
      @keyframes swirlIn {
        0% { opacity: 0; transform: rotate(-180deg) scale(0.2) translate(-200px, 100px); }
        100% { opacity: 1; transform: rotate(0deg) scale(1) translate(0, 0); }
      }

      /* Animation 4: Elegant Slide & Tilt */
      .anim-slide-tilt {
        animation: slideTilt 1.2s ease-out forwards;
      }
      @keyframes slideTilt {
        0% { opacity: 0; transform: translateX(150px) rotate(15deg); }
        100% { opacity: 1; transform: translateX(0) rotate(0deg); }
      }

      /* Animation 5: Drop & Bounce */
      .anim-drop-bounce {
        animation: dropBounce 1.5s cubic-bezier(0.28, 0.84, 0.42, 1) forwards;
      }
      @keyframes dropBounce {
        0% { opacity: 0; transform: translateY(-150px) scaleY(1.2); }
        50% { opacity: 1; transform: translateY(20px) scaleY(0.9); }
        75% { transform: translateY(-10px) scaleY(1.05); }
        100% { opacity: 1; transform: translateY(0) scaleY(1); }
      }

      /* Base hidden state for animations (UPDATED for smooth resets) */
      .scroll-hidden {
        opacity: 0;
        transform: translateY(80px) scale(0.92);
        pointer-events: none;
        transition: opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1), transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
      }

      /* Glassmorphism Panel (UPDATED with animated glowing border) */
      .glass-panel {
        background: rgba(255, 255, 255, 0.08);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
        position: relative;
      }
      
      .glass-panel::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        padding: 2px;
        background: linear-gradient(45deg, rgba(255,222,184,0.1), rgba(255,100,150,0.4), rgba(255,222,184,0.1));
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
        animation: borderGlow 6s linear infinite;
        background-size: 200% 200%;
      }
      
      @keyframes borderGlow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      .text-glow {
        text-shadow: 0 0 20px rgba(255, 222, 184, 0.5);
      }
    `}
  </style>
);

const MagicalBackground = () => {
  // Generate random fireflies
  const fireflies = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${10 + Math.random() * 20}s`,
    animationDelay: `${Math.random() * -20}s`, // Start some immediately
    size: `${2 + Math.random() * 4}px`,
  }));

  return (
    <div className="fixed inset-0 z-0 bg-dynamic overflow-hidden">
      {fireflies.map((ff) => (
        <div
          key={ff.id}
          className="firefly"
          style={{
            left: ff.left,
            width: ff.size,
            height: ff.size,
            animationDuration: ff.animationDuration,
            animationDelay: ff.animationDelay,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
      
      {/* NEW: Cinematic Color Grading Overlays */}
      <div className="absolute inset-0 cinematic-overlay z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#50113f] via-transparent to-[#50113f] opacity-40 z-10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-rose-200/20 mix-blend-overlay z-10 pointer-events-none"></div>
    </div>
  );
};

const AnimatedSection = ({ children, animationClass, className = "" }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Trigger animation when visible, reset when out of view (so it happens every time)
        if (entries[0].isIntersecting) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" } 
    );

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div 
      ref={domRef} 
      className={`${className} ${isVisible ? animationClass : 'scroll-hidden'}`}
    >
      {children}
    </div>
  );
};

export default function App() {
  
  // Data for the 5 sections. 
  // NOTE: Placeholder female portraits are used to demonstrate the "single pics of her" requirement.
  const galleryData = [
    {
      id: 1,
      quote: "You are the universe expressing itself in human form, a breathtaking masterpiece of light and life.",
      image: "/ammu1.jpeg",
      shape: "shape-blob",
      animation: "anim-blur-scale",
      layout: "left"
    },
    {
      id: 2,
      quote: "Do not let your fire go out, spark by irreplaceable spark. You are a radiant force of nature.",
      image: "/ammu2.jpeg",
      shape: "shape-arch",
      animation: "anim-3d-flip",
      layout: "right"
    },
    {
      id: 3,
      quote: "Yours is the light by which my spirit's born: you are my sun, my moon, and all my stars.",
      image: "/ammu6.jpeg",
      shape: "shape-diamond",
      animation: "anim-swirl",
      layout: "left"
    },
    {
      id: 4,
      quote: "In a sea of people, my eyes will always search for you. Your mere presence makes the world profoundly beautiful.",
      image: "/ammu8.jpeg",
      shape: "shape-hexagon",
      animation: "anim-slide-tilt",
      layout: "right"
    },
    {
      id: 5,
      quote: "Some people bring a light so great to the world that even after they have gone, the light remains. You are that extraordinary light.",
      image: "/ammu5.jpeg",
      shape: "shape-petal",
      animation: "anim-drop-bounce",
      layout: "left"
    }
  ];

  // NEW: Mouse tracking logic for glowing orb effect
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen font-['Montserrat'] text-white overflow-x-hidden selection:bg-rose-500 selection:text-white">
      <CustomStyles />
      <MagicalBackground />
      
      {/* NEW: Glowing mouse tracker */}
      <div 
        className="mouse-glow hidden md:block" 
        style={{ top: mousePos.y, left: mousePos.x }} 
      />

      <main className="relative z-10 w-full flex flex-col items-center">
        
        {/* --- Hero Section --- */}
        <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center w-full relative">
          <AnimatedSection animationClass="anim-blur-scale" className="w-full max-w-4xl">
            <div className="glass-panel p-10 md:p-20 rounded-3xl relative overflow-hidden group">
              {/* Decorative inner border */}
              <div className="absolute inset-4 border border-rose-300/30 rounded-2xl pointer-events-none"></div>
              
              <Star className="w-12 h-12 text-[#ffdeb8] mx-auto mb-8 animate-pulse" fill="#ffdeb8" />
              
              <h1 className="text-sm md:text-lg tracking-[0.4em] uppercase text-rose-200 mb-6 font-light">
                A Grand Celebration on 23 years of Radiance
              </h1>
              
              <h2 className="text-5xl md:text-8xl font-['Cinzel'] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ffdeb8] via-rose-400 to-[#ffdeb8] mb-6 text-glow leading-tight animated-gradient-text">
                Happy Birthday,<br/>Ammu
              </h2>
              
              <p className="text-xl md:text-3xl text-rose-100/90 font-['Playfair_Display'] italic mb-10">
                To the girl who makes the world brighter simply by existing in it.
              </p>
              
              <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/10 hover:bg-white/20 transition-all text-[#ffdeb8] rounded-full border border-[#ffdeb8]/30 shadow-[0_0_20px_rgba(255,222,184,0.2)]">
                <PartyPopper className="w-6 h-6" />
                <span className="text-lg font-medium tracking-wider">June 4th</span>
                <Sparkles className="w-6 h-6" />
              </div>
            </div>
            
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-rose-200/60 flex flex-col items-center gap-2">
              <span className="text-xs tracking-[0.3em] uppercase">Unveil the Magic</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-rose-200/60 to-transparent"></div>
            </div>
          </AnimatedSection>
        </section>

        {/* --- Gallery Sections with Different Shapes & Animations --- */}
        <section className="w-full max-w-6xl mx-auto px-6 py-20 flex flex-col gap-32 md:gap-48 pb-32">
          {galleryData.map((item, index) => (
            <div 
              key={item.id} 
              className={`flex flex-col gap-12 md:gap-20 items-center ${
                item.layout === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              
              {/* Image Side with Unique Shape and Unique Animation */}
              <div className="w-full md:w-1/2 flex justify-center">
                <AnimatedSection animationClass={item.animation} className="relative">
                  {/* Decorative glowing background behind image */}
                  <div className={`absolute inset-0 bg-gradient-to-tr from-rose-400 to-[#ffdeb8] blur-xl opacity-30 ${item.shape}`}></div>
                  
                  <div className={`relative p-2 glass-panel ${item.shape} overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)]`}>
                    <img 
                      src={item.image} 
                      alt={`Ammu - Memory ${item.id}`} 
                      className={`w-[300px] h-[300px] md:w-[450px] md:h-[500px] object-cover object-center ${item.shape}`}
                    />
                  </div>
                  
                  {/* Floating badge/accent */}
                  <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-[#ffdeb8] text-purple-950 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center font-['Cinzel'] text-2xl md:text-3xl font-bold shadow-xl border-4 border-[#4a154b]">
                    0{item.id}
                  </div>
                </AnimatedSection>
              </div>

              {/* Quote Side (Text fades in softly) */}
              <div className="w-full md:w-1/2 px-4 md:px-8 text-center md:text-left">
                <AnimatedSection animationClass="anim-slide-tilt" className="flex flex-col justify-center h-full">
                  <Heart className="w-10 h-10 text-rose-400 mb-8 hidden md:block opacity-60" fill="currentColor" />
                  <blockquote className="text-3xl md:text-5xl lg:text-6xl font-['Playfair_Display'] italic leading-tight text-white mb-8 text-glow">
                    "{item.quote}"
                  </blockquote>
                  <div className="h-[2px] w-24 bg-gradient-to-r from-rose-400 to-transparent mb-6 mx-auto md:mx-0"></div>
                  <p className="text-rose-200/80 tracking-[0.2em] uppercase text-sm font-semibold">
                    — Celebrating Ammu
                  </p>
                </AnimatedSection>
              </div>
              
            </div>
          ))}
        </section>

        {/* --- Grand Finale Section --- */}
        <section className="w-full min-h-screen flex items-center justify-center p-6 py-20 relative">
          <AnimatedSection animationClass="anim-blur-scale" className="w-full max-w-5xl z-10">
            <div className="glass-panel p-10 md:p-24 rounded-[3rem] text-center border-t border-rose-300/50 shadow-[0_0_50px_rgba(200,64,93,0.3)]">
              
              <h2 className="text-5xl md:text-7xl font-['Cinzel'] font-bold text-[#ffdeb8] mb-12 text-glow">
                Happy Birthday, Ammu
              </h2>
              
              <div className="space-y-8 text-xl md:text-3xl font-['Playfair_Display'] text-rose-100 leading-relaxed max-w-3xl mx-auto">
                <p>
                  Today, the world celebrates the phenomenal person you are. 
                </p>
                <p>
                  Keep shining, keep smiling, and keep being the absolute masterpiece that you are. May this year bring you as much joy as you bring to everyone around you.
                </p>
                <p className="text-3xl md:text-5xl font-['Cinzel'] text-[#ffdeb8] mt-12 pt-12 border-t border-white/20">
                  You are extraordinary.
                </p>

                {/* NEW: Updated Sign-off */}
                <div className="mt-16 pt-8 flex justify-center items-center">
                  <span className="text-5xl md:text-6xl drop-shadow-[0_0_25px_rgba(255,255,255,0.8)] hover:scale-110 transition-transform duration-500 cursor-default">👣🩵</span>
                </div>
              </div>
              
            </div>
          </AnimatedSection>
        </section>

      </main>
    </div>
  );
}