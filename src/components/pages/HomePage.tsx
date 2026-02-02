// HPI 1.7-V
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Terminal, 
  Cpu, 
  Globe, 
  Zap, 
  Shield, 
  Layers, 
  Code2, 
  Box, 
  Command, 
  Server, 
  GitBranch, 
  Container 
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { useMember } from '@/integrations';

// --- Types & Interfaces ---

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  stat: string;
}

interface StepItem {
  number: string;
  title: string;
  description: string;
}

// --- Canonical Data Sources ---

const FEATURES_DATA: FeatureItem[] = [
  {
    id: 'f1',
    title: 'Instant Provisioning',
    description: 'Spin up isolated development environments in seconds. No DevOps tickets, no waiting.',
    icon: Zap,
    stat: '0.4s'
  },
  {
    id: 'f2',
    title: 'Docker Native',
    description: 'Full Docker support out of the box. Bring your own compose files or use our templates.',
    icon: Container,
    stat: '100%'
  },
  {
    id: 'f3',
    title: 'Global Edge',
    description: 'Deploy your workspace to the edge location nearest to you for zero-latency coding.',
    icon: Globe,
    stat: '24ms'
  },
  {
    id: 'f4',
    title: 'Enterprise Security',
    description: 'SOC2 compliant infrastructure with automated secrets management and role-based access.',
    icon: Shield,
    stat: 'SOC2'
  }
];

const STEPS_DATA: StepItem[] = [
  {
    number: '01',
    title: 'Select Stack',
    description: 'Choose from pre-configured templates for Node.js, Python, Go, or Rust.'
  },
  {
    number: '02',
    title: 'Configure Resources',
    description: 'Define CPU, RAM, and storage requirements tailored to your workload.'
  },
  {
    number: '03',
    title: 'Deploy & Code',
    description: 'Access your VS Code compatible environment directly in the browser.'
  }
];

const TECH_STACK = [
  "KUBERNETES", "DOCKER", "NODE.JS", "PYTHON", "RUST", "GO", "TERRAFORM", "AWS", "AZURE", "GCP"
];

// --- Components ---

const Marquee = () => {
  return (
    <div className="w-full bg-primary text-primary-foreground overflow-hidden py-4 border-y border-gridline/30">
      <div className="flex whitespace-nowrap">
        <motion.div 
          className="flex gap-12 items-center"
          animate={{ x: "-50%" }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        >
          {[...TECH_STACK, ...TECH_STACK, ...TECH_STACK, ...TECH_STACK].map((tech, i) => (
            <span key={i} className="text-lg font-heading tracking-widest opacity-80">
              {tech} <span className="mx-4 text-gridline">•</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const ParallaxImage = ({ className }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-[120%] absolute top-[-10%] left-0">
        <Image
          src="https://static.wixstatic.com/media/fbfb8f_edef723198bb4e949777163e059855f0~mv2.png?originWidth=1920&originHeight=704"
          alt="High tech development environment visualization"
          width={1920}
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
};

const StickySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="w-full max-w-[120rem] mx-auto relative min-h-[200vh] bg-background">
      <div className="sticky top-0 h-screen flex flex-col lg:flex-row overflow-hidden">
        {/* Left Static Panel */}
        <div className="w-full lg:w-1/2 h-full bg-primary text-primary-foreground p-8 lg:p-20 flex flex-col justify-center border-r border-gridline/20 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-5xl lg:text-7xl uppercase leading-[0.9] mb-8">
              Workflow<br />Evolution
            </h2>
            <p className="font-paragraph text-xl text-gray-400 max-w-md leading-relaxed">
              From local host chaos to cloud-native harmony. We orchestrate the complexity so you can focus on the code.
            </p>
            <div className="mt-12 w-full h-[1px] bg-gridline/30" />
            <div className="mt-8 flex gap-4">
               <div className="flex flex-col">
                 <span className="text-4xl font-heading">99.9%</span>
                 <span className="text-sm text-gray-500 uppercase tracking-wider">Uptime</span>
               </div>
               <div className="w-[1px] h-12 bg-gridline/30 mx-4" />
               <div className="flex flex-col">
                 <span className="text-4xl font-heading">0ms</span>
                 <span className="text-sm text-gray-500 uppercase tracking-wider">Config Time</span>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Right Scrolling Panel */}
        <div className="w-full lg:w-1/2 h-full bg-background relative flex items-center justify-center p-8 lg:p-20">
          <div className="absolute inset-0 w-full h-full">
             {/* We use absolute positioning and opacity to transition between steps based on scroll progress */}
             {STEPS_DATA.map((step, index) => {
               // Calculate range for this step
               const start = index / STEPS_DATA.length;
               const end = (index + 1) / STEPS_DATA.length;
               const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
               const y = useTransform(scrollYProgress, [start, end], [50, -50]);
               
               return (
                 <motion.div 
                    key={step.number}
                    style={{ opacity, y }}
                    className="absolute inset-0 flex items-center justify-center p-12 pointer-events-none"
                 >
                   <div className="max-w-lg w-full">
                     <span className="font-heading text-9xl text-gridline/20 absolute -top-20 -left-10 -z-10">
                       {step.number}
                     </span>
                     <h3 className="font-heading text-4xl text-foreground uppercase mb-6">{step.title}</h3>
                     <p className="font-paragraph text-xl text-subtletext leading-relaxed">
                       {step.description}
                     </p>
                     <div className="mt-8">
                        <div className="w-full h-2 bg-gridline/10 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-primary"
                            style={{ width: useTransform(scrollYProgress, [start, end], ["0%", "100%"]) }}
                          />
                        </div>
                     </div>
                   </div>
                 </motion.div>
               );
             })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default function HomePage() {
  const { isAuthenticated } = useMember();
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground overflow-x-clip">
      <style>{`
        .clip-diagonal {
          clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
        }
        .text-stroke {
          -webkit-text-stroke: 1px rgba(0,0,0,0.1);
          color: transparent;
        }
      `}</style>
      
      <Header />

      <main className="w-full flex flex-col">
        
        {/* --- HERO SECTION (Inspiration Image Structure) --- */}
        <section ref={heroRef} className="w-full max-w-[120rem] mx-auto pt-[var(--header-height)]">
          {/* Top Split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[50vh]">
            {/* Left: Black Block */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-primary text-primary-foreground p-8 lg:p-16 flex flex-col justify-center relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <h1 className="font-heading text-5xl lg:text-7xl xl:text-8xl uppercase leading-[0.85] tracking-tight z-10">
                Dev<br/>Env<br/>Platform
              </h1>
              <div className="mt-8 flex items-center gap-4 text-gridline">
                <Terminal className="w-6 h-6" />
                <span className="font-mono text-sm tracking-widest">V.2.0.4 STABLE</span>
              </div>
            </motion.div>

            {/* Right: White Block */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-background text-foreground p-8 lg:p-16 flex flex-col justify-center border-l border-gridline relative"
            >
              <div className="max-w-xl">
                <p className="font-paragraph text-xl lg:text-2xl leading-relaxed mb-10 text-subtletext">
                  This is the space to introduce the future of coding. 
                  Showcase the power of ephemeral environments and underline 
                  any important or unique features.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6">
                  {isAuthenticated ? (
                    <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-14 px-8 text-lg font-heading tracking-wider">
                      <Link to="/dashboard">
                        ACCESS CONSOLE <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-14 px-8 text-lg font-heading tracking-wider">
                      <Link to="/dashboard">
                        INITIALIZE <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  )}
                  <Link to="/features" className="group flex items-center text-lg font-heading uppercase tracking-wider border-b border-transparent hover:border-foreground transition-all h-14">
                    Documentation
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom: Full Width Image */}
          <div className="w-full h-[60vh] lg:h-[80vh] relative border-t border-gridline">
            <ParallaxImage className="w-full h-full" />
            
            {/* Overlay Content */}
            <div className="absolute bottom-0 left-0 w-full p-8 lg:p-12 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
              <div className="flex justify-between items-end text-white">
                <div className="hidden lg:block">
                  <span className="block text-xs font-mono mb-2">SYSTEM STATUS</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="font-heading tracking-widest">OPERATIONAL</span>
                  </div>
                </div>
                <h2 className="font-heading text-4xl lg:text-6xl uppercase opacity-90">
                  Infrastructure<br/>As Code
                </h2>
              </div>
            </div>
          </div>
        </section>

        <Marquee />

        {/* --- FEATURES GRID --- */}
        <section className="w-full max-w-[120rem] mx-auto bg-background border-b border-gridline">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gridline">
            {FEATURES_DATA.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-8 lg:p-12 min-h-[400px] flex flex-col justify-between hover:bg-primary hover:text-primary-foreground transition-colors duration-500 cursor-default"
              >
                <div className="flex justify-between items-start">
                  <feature.icon className="w-10 h-10 stroke-1 group-hover:stroke-white transition-colors" />
                  <span className="font-mono text-xs border border-gridline/30 px-2 py-1 rounded group-hover:border-white/30">
                    {feature.stat}
                  </span>
                </div>
                
                <div>
                  <h3 className="font-heading text-2xl uppercase mb-4 tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="font-paragraph text-subtletext group-hover:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="w-full h-[1px] bg-gridline/20 mt-8 group-hover:bg-white/20 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- STICKY PROCESS SECTION --- */}
        <StickySection />

        {/* --- VISUAL BREATHER --- */}
        <section className="w-full max-w-[120rem] mx-auto h-[100vh] relative flex items-center justify-center overflow-hidden bg-primary">
          <div className="absolute inset-0 opacity-30">
             <Image 
               src="https://static.wixstatic.com/media/fbfb8f_4a9c0a1e45f14cd59190b880e9d1cb1e~mv2.png?originWidth=1920&originHeight=1024"
               alt="Abstract code visualization"
               width={1920}
               className="w-full h-full object-cover grayscale mix-blend-overlay"
             />
          </div>
          
          <div className="relative z-10 text-center px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <h2 className="font-heading text-6xl lg:text-9xl text-primary-foreground uppercase tracking-tighter mb-8 mix-blend-difference">
                Code Anywhere
              </h2>
              <p className="font-paragraph text-xl text-gray-400 max-w-2xl mx-auto mb-12">
                The constraints of local hardware are obsolete. Welcome to the era of infinite compute.
              </p>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-primary-foreground border-white/20 hover:bg-white hover:text-primary h-16 px-10 text-lg font-heading uppercase tracking-widest">
                <Link to="/features">Explore The Platform</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="w-full max-w-[120rem] mx-auto bg-background py-32 px-8 lg:px-16 border-t border-gridline">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <h2 className="font-heading text-5xl lg:text-8xl uppercase leading-[0.9] mb-12">
                Ready to<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-gray-500">Deploy?</span>
              </h2>
            </div>
            <div className="lg:col-span-4 flex flex-col justify-end items-start lg:items-end">
              <p className="font-paragraph text-xl text-subtletext mb-8 max-w-sm text-left lg:text-right">
                Join thousands of developers shipping code faster with our self-service platform.
              </p>
              <Button asChild size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 h-16 px-12 text-xl font-heading uppercase tracking-wider rounded-none">
                <Link to="/dashboard">
                  Start Free Trial <ArrowRight className="ml-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Footer Grid Decoration */}
          <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-20">
             {[1,2,3,4].map((i) => (
               <div key={i} className="h-32 border border-gridline border-dashed rounded-lg" />
             ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}