"use client";

import dynamic from "next/dynamic";
import { ArrowDown, ArrowUpRight, Menu, X, Sparkles, Code2, ShoppingBag, PanelsTopLeft, Zap, Globe2, Layers3 } from "lucide-react";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Scene = dynamic(() => import("@/components/Scene"), {
  ssr: false,
  loading: () => <div className="scene scene-loading" aria-hidden="true" />,
});

const services = [
  { icon: PanelsTopLeft, number: "01", title: "Web design", copy: "Distinctive interfaces that make your first impression count." },
  { icon: Code2, number: "02", title: "Web development", copy: "Fast, responsive websites engineered for real-world use." },
  { icon: ShoppingBag, number: "03", title: "E-commerce", copy: "Thoughtful storefronts that make buying feel effortless." },
  { icon: Layers3, number: "04", title: "Custom experiences", copy: "Dashboards, tools and digital products built around your idea." },
];

const projects = [
  { tag: "Concept · E-commerce", title: "FORM / OBJECT", color: "project-lilac", shape: "orb" },
  { tag: "Concept · Hospitality", title: "SUNDAY TABLE", color: "project-coral", shape: "arch" },
  { tag: "Concept · SaaS", title: "PULSE / DATA", color: "project-cyan", shape: "grid" },
];

export default function Site() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(motion.matches);
    const updateScroll = () => setScrolled(window.scrollY > 24);
    updateMotion();
    updateScroll();
    motion.addEventListener?.("change", updateMotion);
    window.addEventListener("scroll", updateScroll, { passive: true });

    let animationContext: gsap.Context | undefined;
    if (!motion.matches) {
      gsap.registerPlugin(ScrollTrigger);
      animationContext = gsap.context(() => {
        gsap.from(".hero-copy > *", {
          y: 24, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
        });
        gsap.utils.toArray<HTMLElement>(".service-card, .project-card").forEach((element) => {
          gsap.from(element, {
            y: 34, opacity: 0, duration: 0.65, ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          });
        });
        gsap.from(".about h2, .about-bottom", {
          y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power2.out",
          scrollTrigger: { trigger: ".about", start: "top 72%", once: true },
        });
        gsap.from(".contact-inner > *:not(.contact-orb)", {
          y: 25, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: ".contact-section", start: "top 75%", once: true },
        });
      });
    }
    return () => {
      animationContext?.revert();
      motion.removeEventListener?.("change", updateMotion);
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <div className="grain" aria-hidden="true" />
      <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
        <a className="brand" href="#home" aria-label="LUBIT Digital home" onClick={closeMenu}>
          <span className="brand-mark">L</span><span>LUBIT<span className="brand-light">DIGITAL</span></span>
        </a>
        <button className="menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={menuOpen ? "nav nav-open" : "nav"} aria-label="Main navigation">
          {[["Services", "#services"], ["Selected work", "#work"], ["About", "#about"]].map(([label, href]) => (
            <a key={label} href={href} onClick={closeMenu}>{label}</a>
          ))}
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Start a project <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" /> INDEPENDENT CREATIVE TECHNOLOGY STUDIO</div>
          <h1>Ideas into<br /><span className="gradient-text">digital</span> experiences<span className="period">.</span></h1>
          <p className="hero-description">We shape ambitious ideas into expressive websites and digital products that move businesses forward.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contact">Let&apos;s build together <ArrowUpRight size={17} /></a>
            <a className="text-link" href="#work">Explore our work <ArrowDown size={15} /></a>
          </div>
          <div className="hero-note"><Sparkles size={15} /> DESIGN-LED. TECHNOLOGY-POWERED.</div>
        </div>
        <div className="hero-art">
          <div className="art-glow" />
          <Scene />
          <div className="orbit-label orbit-label-one">IDEAS ↗</div>
          <div className="orbit-label orbit-label-two">BUILT TO MOVE</div>
          <div className="art-index">FIG. 001 — CREATIVE ENERGY</div>
        </div>
        <a className="scroll-cue" href="#services"><span /> SCROLL TO EXPLORE</a>
      </section>

      <section className="marquee" aria-label="Our capabilities">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, i) => <span key={i}>DESIGN <b>✳</b> DEVELOP <b>✳</b> EXPLORE <b>✳</b> BUILD <b>✳</b> DESIGN <b>✳</b> DEVELOP <b>✳</b></span>)}
        </div>
      </section>

      <section className="section section-wrap" id="services">
        <div className="section-heading">
          <div><div className="eyebrow">01 / WHAT WE DO</div><h2>Digital, with<br /><span className="muted-heading">a little more</span> <span className="gradient-text">feeling.</span></h2></div>
          <p>From a first sketch to a fully working product, we bring design thinking and thoughtful engineering into every build.</p>
        </div>
        <div className="service-grid">
          {services.map((service) => {
            const Icon = service.icon;
            return <article className="service-card" key={service.number}>
              <div className="service-top"><span>{service.number} / 04</span><Icon size={22} strokeWidth={1.5} /></div>
              <h3>{service.title}</h3><p>{service.copy}</p><span className="card-arrow"><ArrowUpRight size={18} /></span>
            </article>;
          })}
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-wrap section">
          <div className="section-heading work-heading">
            <div><div className="eyebrow">02 / SELECTED WORK</div><h2>Made to be<br /><span className="gradient-text">remembered.</span></h2></div>
            <p>A glimpse of the kind of digital experiences we want to create. These are concept projects, not client commissions.</p>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => <article className={`project-card ${project.color}`} key={project.title}>
              <div className={`project-art project-shape-${project.shape}`} aria-hidden="true">
                {project.shape === "orb" && <><span className="orb-main" /><span className="orb-small" /></>}
                {project.shape === "arch" && <><span className="arch-shape" /><span className="arch-ball" /></>}
                {project.shape === "grid" && <><span className="grid-shape" /><span className="grid-ball" /></>}
              </div>
              <div className="project-meta"><span>{project.tag}</span><span>0{index + 1}</span></div>
              <h3>{project.title}</h3>
            </article>)}
          </div>
        </div>
      </section>

      <section className="about section-wrap section" id="about">
        <div className="about-stamp"><Globe2 size={25} /><span>KERALA ROOTS<br />GLOBAL OUTLOOK</span></div>
        <div className="eyebrow">03 / A LITTLE ABOUT US</div>
        <h2>Small studio.<br /><span className="gradient-text">Big-picture</span> thinking.</h2>
        <div className="about-bottom">
          <p>LUBIT Digital is an emerging creative studio built around curiosity, craft and the belief that good digital work should look great and work even better.</p>
          <div className="about-values"><span><Zap size={16} /> Curious by default</span><span><Code2 size={16} /> Built with purpose</span><span><Globe2 size={16} /> Open to everywhere</span></div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="section-wrap contact-inner">
          <div className="eyebrow">04 / HAVE SOMETHING IN MIND?</div>
          <h2>Let&apos;s make<br /><span className="gradient-text">it happen.</span></h2>
          <p>Tell us what you&apos;re imagining. We&apos;ll take it from there.</p>
          <a className="button button-primary contact-button" href="mailto:hello@lubitdigital.com?subject=Project%20enquiry">Start a conversation <ArrowUpRight size={18} /></a>
          <div className="contact-orb" aria-hidden="true"><span /></div>
        </div>
      </section>

      <footer className="footer section-wrap">
        <a className="brand" href="#home"><span className="brand-mark">L</span><span>LUBIT<span className="brand-light">DIGITAL</span></span></a>
        <span>© {new Date().getFullYear()} LUBIT Digital. Built with intent.</span>
        <a href="mailto:hello@lubitdigital.com">hello@lubitdigital.com</a>
      </footer>
    </main>
  );
}
