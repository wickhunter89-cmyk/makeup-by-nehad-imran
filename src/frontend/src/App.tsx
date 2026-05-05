import { Layout } from "@/components/Layout";
import { GALLERY_IMAGES, HERO_BG, HERO_IMAGE } from "@/lib/images";
import {
  Float,
  MeshDistortMaterial,
  OrbitControls,
  Sphere,
  Stars,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type * as THREE from "three";

// ─── 3D Background Orbs ──────────────────────────────────────────────────────
function GlowOrb({
  position,
  color,
  speed,
  distort,
}: {
  position: [number, number, number];
  color: string;
  speed: number;
  distort: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.elapsedTime * speed * 0.3;
      meshRef.current.rotation.y = clock.elapsedTime * speed * 0.5;
    }
  });
  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1.5}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0}
          metalness={0.8}
          transparent
          opacity={0.55}
        />
      </Sphere>
    </Float>
  );
}

function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.6} color="#f5e8c8" />
      <pointLight position={[5, 5, 5]} intensity={1.8} color="#c8843a" />
      <pointLight position={[-5, -3, 3]} intensity={1.2} color="#e8c87a" />
      <pointLight position={[0, 8, 2]} intensity={0.8} color="#f0d4a0" />
      <GlowOrb
        position={[-3.5, 1.5, -2]}
        color="#8B5A2B"
        speed={0.5}
        distort={0.6}
      />
      <GlowOrb
        position={[3.5, -1, -3]}
        color="#C8963C"
        speed={0.35}
        distort={0.4}
      />
      <GlowOrb
        position={[0, 2, -5]}
        color="#E8C87A"
        speed={0.25}
        distort={0.3}
      />
      <GlowOrb
        position={[4, 3, -4]}
        color="#D4A055"
        speed={0.4}
        distort={0.5}
      />
      <GlowOrb
        position={[-4, -2, -4]}
        color="#F5DEB3"
        speed={0.3}
        distort={0.35}
      />
    </>
  );
}

// ─── Section wrapper with entrance animation ─────────────────────────────────
function SectionReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.34, 1.1, 0.64, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Section Title ────────────────────────────────────────────────────────────
function SectionTitle({
  tag,
  title,
  subtitle,
}: { tag: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-16">
      <span className="inline-block text-xs font-body tracking-[0.3em] uppercase text-primary mb-3 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10">
        {tag}
      </span>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground font-body max-w-xl mx-auto text-base">
          {subtitle}
        </p>
      )}
      <div className="flex items-center justify-center gap-2 mt-6">
        <div className="w-12 h-px bg-primary/60" />
        <div className="w-2 h-2 rounded-full bg-primary pulse-glow" />
        <div className="w-12 h-px bg-primary/60" />
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grain-overlay"
    >
      {/* 3D Canvas background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <HeroScene />
        </Canvas>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/50 via-background/30 to-background" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,oklch(0.58_0.14_52/0.06)_0%,transparent_70%)]" />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
      >
        {/* Text side */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block text-xs font-body tracking-[0.35em] uppercase text-primary mb-4 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 blur-glow">
              ✦ Celebrity Makeup Artist ✦
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] text-foreground mt-4"
          >
            Makeup
            <br />
            <span className="shimmer-gold glow-text">by Nehad</span>
            <br />
            <span className="text-foreground/60">Imran</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-6 font-body text-base sm:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed"
          >
            Where artistry meets luxury. Transforming beauty one brushstroke at
            a time. Trusted by Bollywood celebrities and brides across India.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <a
              href="#contact"
              data-ocid="hero.book_cta"
              className="px-8 py-3.5 rounded-full font-body font-semibold text-sm tracking-wide bg-primary text-primary-foreground shadow-[0_4px_24px_oklch(0.42_0.1_45/0.35)] hover:shadow-[0_8px_36px_oklch(0.58_0.14_52/0.5)] transition-all duration-300 hover:scale-105"
            >
              Book Your Session
            </a>
            <a
              href="#gallery"
              data-ocid="hero.gallery_cta"
              className="px-8 py-3.5 rounded-full font-body font-semibold text-sm tracking-wide border border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary transition-all duration-300"
            >
              View Gallery
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="mt-12 flex gap-8 justify-center lg:justify-start"
          >
            {[
              { num: "500+", label: "Happy Clients" },
              { num: "8+", label: "Years Experience" },
              { num: "50+", label: "Celebrity Looks" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-2xl font-bold text-primary glow-sm">
                  {stat.num}
                </div>
                <div className="font-body text-xs text-muted-foreground tracking-wide mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.34, 1.1, 0.64, 1] }}
          className="relative shrink-0"
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 rounded-2xl ring-2 ring-primary/30 z-10" />
            <div className="absolute -inset-2 rounded-3xl blur-3xl bg-accent/25 z-[-1]" />
            <div className="absolute -inset-1 rounded-3xl blur-xl bg-primary/15 z-[-1]" />
            <img
              src={HERO_IMAGE}
              alt="Nehad Imran — Premium Makeup Artist"
              className="w-full h-full object-cover object-top"
            />
          </div>
          {/* Floating badge */}
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute -bottom-4 -right-4 blur-glow px-3 py-2 rounded-xl text-xs font-body"
          >
            <span className="text-primary font-semibold">
              ★ Celebrity Artist
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
      >
        <span className="text-[10px] tracking-widest text-muted-foreground uppercase font-body">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-primary/60 to-transparent" />
      </motion.div>
    </section>
  );
}

// ─── Celebrity Section ────────────────────────────────────────────────────────
const CELEBRITIES = [
  { name: "Tamannaah Bhatia", event: "Brand Launch Event", icon: "💄" },
  { name: "Rashmika Mandanna", event: "Film Premiere Look", icon: "✨" },
  { name: "Tejasswi Prakash", event: "Award Night Glam", icon: "👑" },
  { name: "Shehnaaz Gill", event: "Magazine Cover Shoot", icon: "📸" },
  { name: "Kiara Advani", event: "Brand Campaign", icon: "🌟" },
  { name: "Nora Fatehi", event: "Music Video", icon: "💫" },
];

function CelebritySection() {
  return (
    <section className="py-24 bg-card/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.58_0.14_52/0.06)_0%,transparent_60%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionReveal>
          <SectionTitle
            tag="Celebrity Portfolio"
            title="Trusted by the Stars"
            subtitle="Nehad Imran has crafted iconic looks for top Bollywood & South Indian celebrities, bringing professional glamour to every frame."
          />
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CELEBRITIES.map((celeb, i) => (
            <SectionReveal key={celeb.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8, rotateX: 3 }}
                transition={{ type: "spring", stiffness: 300 }}
                data-ocid={`celebrity.item.${i + 1}`}
                className="blur-glow rounded-2xl p-6 border border-primary/20 cursor-default group"
              >
                <div className="text-3xl mb-3">{celeb.icon}</div>
                <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {celeb.name}
                </h3>
                <p className="font-body text-sm text-muted-foreground mt-1">
                  {celeb.event}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg
                        key={`celeb-star-${s}`}
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-3.5 h-3.5 text-accent"
                        aria-hidden="true"
                      >
                        <path d="M8 1.3l1.5 3.1 3.4.5-2.5 2.4.6 3.4L8 9.1l-3 1.6.6-3.4L3.1 4.9l3.4-.5L8 1.3z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground font-body">
                    Verified
                  </span>
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>

        {/* Marquee strip */}
        <SectionReveal delay={0.4}>
          <div className="mt-16 overflow-hidden rounded-2xl border border-primary/20 bg-background/50 py-4">
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="flex gap-8 whitespace-nowrap"
            >
              {[...CELEBRITIES, ...CELEBRITIES].map((c, i) => (
                <span
                  key={`${c.name}-${i}`}
                  className="font-display text-sm text-primary/70 shrink-0"
                >
                  {c.icon} {c.name} &nbsp;&nbsp;·
                </span>
              ))}
            </motion.div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    title: "Bridal Makeup",
    desc: "Complete bridal transformation with long-lasting HD formulas. From mehendi to reception, every look perfected.",
    price: "From ₹12,000",
    icon: "👰",
    features: [
      "Trial session included",
      "Airbrush available",
      "All skin tones",
    ],
  },
  {
    title: "Celebrity & Film Makeup",
    desc: "High-definition makeup for shoots, films, and events. Camera-ready looks tailored to lighting and concept.",
    price: "From ₹8,000",
    icon: "🎬",
    features: ["On-location service", "HD & 8K ready", "Character makeup"],
  },
  {
    title: "Party & Event Glam",
    desc: "Stunning event makeup for galas, receptions, fashion shows, and social occasions.",
    price: "From ₹4,000",
    icon: "✨",
    features: ["Quick turnaround", "Home visits", "Group packages"],
  },
  {
    title: "Engagement Makeup",
    desc: "Radiant, photogenic engagement looks that photograph beautifully in all conditions.",
    price: "From ₹6,000",
    icon: "💍",
    features: ["Natural glow focus", "Skin prep included", "Touch-up kit"],
  },
  {
    title: "Saree Draping & Styling",
    desc: "Complete look curation with saree draping, hair styling, and accessories consultation.",
    price: "From ₹3,500",
    icon: "🥻",
    features: ["All saree types", "Hair styling", "Accessory advice"],
  },
  {
    title: "Makeup Master Class",
    desc: "One-on-one professional makeup training for aspiring artists and beauty enthusiasts.",
    price: "From ₹5,000",
    icon: "🎓",
    features: ["Personalized training", "Certificate issued", "Kit guidance"],
  },
];

function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-background relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,oklch(0.58_0.14_52/0.05)_0%,transparent_60%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionReveal>
          <SectionTitle
            tag="Our Services"
            title="Artistry for Every Occasion"
            subtitle="From intimate bridal sessions to Bollywood-calibre film sets, every service is delivered with uncompromising precision."
          />
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((svc, i) => (
            <SectionReveal key={svc.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -10, rotateX: 4, rotateY: -2 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                data-ocid={`services.item.${i + 1}`}
                className="group relative rounded-2xl border border-border hover:border-primary/50 bg-card p-7 cursor-default h-full flex flex-col transition-shadow hover:shadow-[0_20px_60px_oklch(0.42_0.1_45/0.15)]"
              >
                <div className="text-4xl mb-4">{svc.icon}</div>
                <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {svc.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground mt-2 leading-relaxed flex-1">
                  {svc.desc}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {svc.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-xs text-muted-foreground font-body"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between">
                  <span className="font-body text-sm font-semibold text-primary">
                    {svc.price}
                  </span>
                  <a
                    href="#contact"
                    data-ocid={`services.book_button.${i + 1}`}
                    className="text-xs font-body font-medium px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                  >
                    Book →
                  </a>
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
function GallerySection() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 bg-card/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.58_0.14_52/0.04)_0%,transparent_70%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionReveal>
          <SectionTitle
            tag="Portfolio"
            title="The Art of Transformation"
            subtitle="Every look tells a story. Browse through Nehad's signature work — from editorial glamour to timeless bridal elegance."
          />
        </SectionReveal>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {GALLERY_IMAGES.map((src, i) => (
            <SectionReveal key={src} delay={i * 0.05}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                data-ocid={`gallery.item.${i + 1}`}
                className="relative group cursor-pointer rounded-xl overflow-hidden break-inside-avoid"
                onClick={() => setSelected(src)}
              >
                <img
                  src={src}
                  alt={`Gallery look ${i + 1}`}
                  className="w-full h-auto object-cover block transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="text-xs font-body text-foreground/80">
                    Look #{i + 1}
                  </span>
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
          data-ocid="gallery.lightbox"
        >
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            src={selected}
            alt="Selected look"
            className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            className="absolute top-6 right-6 text-foreground/70 hover:text-primary transition-colors text-2xl font-light"
            onClick={() => setSelected(null)}
            data-ocid="gallery.close_button"
            aria-label="Close lightbox"
          >
            ✕
          </button>
        </motion.div>
      )}
    </section>
  );
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────
const WHY_REASONS = [
  {
    icon: "🏆",
    title: "Celebrity-Trusted",
    desc: "Nehad's work has graced Bollywood red carpets, brand campaigns, and major award shows.",
  },
  {
    icon: "💎",
    title: "Premium Products",
    desc: "We use MAC, Charlotte Tilbury, Armani, and top-tier brands for a flawless, skin-safe finish.",
  },
  {
    icon: "🎨",
    title: "Artistic Mastery",
    desc: "8+ years of honing techniques from airbrush to avant-garde editorial looks.",
  },
  {
    icon: "⏰",
    title: "Punctual & Professional",
    desc: "We respect your time. Every session is executed with military precision and warmth.",
  },
  {
    icon: "🌹",
    title: "Skin Specialist",
    desc: "Deep knowledge of Indian skin tones ensures a perfect colour match and natural finish every time.",
  },
  {
    icon: "📱",
    title: "Home & On-Location",
    desc: "We come to you. Home visits across Bengaluru and on-location for shoots and weddings.",
  },
];

function WhyUsSection() {
  return (
    <section className="py-24 bg-background relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(0.58_0.14_52/0.05)_0%,transparent_50%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionReveal>
          <SectionTitle
            tag="Why Choose Us"
            title="The Nehad Imran Difference"
            subtitle="More than makeup — a complete luxury experience that ensures you look and feel extraordinary."
          />
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_REASONS.map((reason, i) => (
            <SectionReveal key={reason.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300 }}
                data-ocid={`why.item.${i + 1}`}
                className="group flex gap-4 p-6 rounded-2xl border border-border hover:border-primary/40 bg-card hover:shadow-[0_10px_40px_oklch(0.42_0.1_45/0.12)] transition-all duration-300"
              >
                <span className="text-3xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {reason.icon}
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    {reason.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mt-1.5 leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="py-24 bg-card/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Images collage */}
          <SectionReveal>
            <div className="relative">
              <div className="grid grid-cols-2 gap-3">
                <motion.img
                  whileHover={{ scale: 1.03, rotateZ: -1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  src={GALLERY_IMAGES[1]}
                  alt="Nehad at work"
                  className="rounded-2xl w-full h-56 object-cover object-top shadow-lg col-span-1"
                />
                <motion.img
                  whileHover={{ scale: 1.03, rotateZ: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  src={GALLERY_IMAGES[2]}
                  alt="Nehad portfolio"
                  className="rounded-2xl w-full h-56 object-cover object-top shadow-lg col-span-1 mt-6"
                />
                <motion.img
                  whileHover={{ scale: 1.03, rotateZ: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  src={GALLERY_IMAGES[3]}
                  alt="Client transformation"
                  className="rounded-2xl w-full h-48 object-cover object-top shadow-lg col-span-1"
                />
                <motion.img
                  whileHover={{ scale: 1.03, rotateZ: -1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  src={GALLERY_IMAGES[4]}
                  alt="Bridal look"
                  className="rounded-2xl w-full h-48 object-cover object-top shadow-lg col-span-1 -mt-3"
                />
              </div>
              {/* Floating stat */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-5 -right-5 blur-glow rounded-2xl px-5 py-3 text-center"
              >
                <div className="font-display text-2xl font-bold text-primary">
                  8+
                </div>
                <div className="font-body text-xs text-muted-foreground">
                  Years Excellence
                </div>
              </motion.div>
            </div>
          </SectionReveal>

          {/* Text */}
          <SectionReveal delay={0.2}>
            <div>
              <span className="inline-block text-xs font-body tracking-[0.3em] uppercase text-primary mb-4 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10">
                About Nehad Imran
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
                Crafting Beauty,
                <span className="block text-primary glow-sm">
                  One Look at a Time
                </span>
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                Nehad Imran is a celebrated professional makeup artist based in
                Bengaluru, Karnataka, with over 8 years of expertise in bridal,
                editorial, and celebrity makeup. Her studio — nestled in the
                vibrant Jayamahal neighbourhood — has become the go-to
                destination for discerning clients who demand nothing but the
                best.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-6">
                From intimate bridal preparations to high-octane Bollywood
                shoots, Nehad brings an unrivalled understanding of Indian skin
                tones, a steady artistic hand, and a warmth that makes every
                session feel like a luxury ritual. Her celebrity portfolio
                speaks for itself — a testament to trust, talent, and
                transformation.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "Bridal Specialist",
                  "Celebrity MUA",
                  "HD Makeup",
                  "Airbrush Expert",
                  "Film & TV",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs font-body font-medium bg-primary/10 text-primary border border-primary/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

// ─── Reviews ──────────────────────────────────────────────────────────────────
const REVIEWS = [
  {
    name: "Priya Sharma",
    role: "Bride, Bengaluru",
    text: "Nehad is an absolute genius! My bridal look was beyond perfect. She understood exactly what I wanted and the long-lasting makeup stayed flawless through 8 hours of celebrations.",
    stars: 5,
    avatar: "P",
  },
  {
    name: "Anjali Menon",
    role: "Film Actor, Mumbai",
    text: "Working with Nehad on my last three projects was incredible. Her understanding of camera lighting and HD-ready formulas is second to none. A true professional.",
    stars: 5,
    avatar: "A",
  },
  {
    name: "Sunita Rao",
    role: "Bride, Hyderabad",
    text: "I flew in from Hyderabad specifically for Nehad. Her expertise with South Indian bridal looks is unmatched. The silk saree draping was also done beautifully.",
    stars: 5,
    avatar: "S",
  },
  {
    name: "Kavitha Nair",
    role: "Wedding Guest",
    text: "Booked Nehad for my sister’s wedding and the whole bridal party looked stunning. She handled 6 looks back to back with the same energy and artistry from start to finish.",
    stars: 5,
    avatar: "K",
  },
  {
    name: "Deepa Krishnamurthy",
    role: "Model & Influencer",
    text: "My go-to artist for every major shoot! Nehad’s editorial eye and ability to create versatile looks for different concepts is why I keep coming back.",
    stars: 5,
    avatar: "D",
  },
  {
    name: "Meera Joshi",
    role: "Bride, Pune",
    text: "The best investment I made for my wedding. Every single photo looks like it was retouched, but that’s just the quality of Nehad’s work. Absolutely magical.",
    stars: 5,
    avatar: "M",
  },
];

function ReviewsSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,oklch(0.58_0.14_52/0.05)_0%,transparent_60%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionReveal>
          <SectionTitle
            tag="Client Reviews"
            title="What Our Clients Say"
            subtitle="Genuine reviews from brides, celebrities, and clients who experienced the Nehad Imran magic."
          />
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <SectionReveal key={review.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 250 }}
                data-ocid={`reviews.item.${i + 1}`}
                className="group p-6 rounded-2xl border border-border hover:border-primary/40 bg-card hover:shadow-[0_15px_50px_oklch(0.42_0.1_45/0.12)] transition-all duration-300 flex flex-col gap-4"
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {([1, 2, 3, 4, 5] as const).map((s) => (
                    <svg
                      key={`rv-star-${s}`}
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 text-accent"
                      aria-hidden="true"
                    >
                      <path d="M8 1.3l1.5 3.1 3.4.5-2.5 2.4.6 3.4L8 9.1l-3 1.6.6-3.4L3.1 4.9l3.4-.5L8 1.3z" />
                    </svg>
                  ))}
                </div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1 italic">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-border/60">
                  <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0">
                    <span className="font-display text-sm font-bold text-primary">
                      {review.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="font-body text-sm font-semibold text-foreground">
                      {review.name}
                    </div>
                    <div className="font-body text-xs text-muted-foreground">
                      {review.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "How far in advance should I book?",
    a: "For bridal makeup, we recommend booking 3–6 months in advance. For events and shoots, 2–4 weeks is ideal. We take limited bookings to ensure full attention to every client.",
  },
  {
    q: "Do you offer a bridal trial session?",
    a: "Yes! All bridal packages include a complimentary trial session 1–2 weeks before the wedding so we can perfect your look together.",
  },
  {
    q: "Do you travel for destination weddings?",
    a: "Absolutely. Nehad is available for destination weddings across India and internationally. Travel and accommodation fees apply.",
  },
  {
    q: "What brands do you use?",
    a: "We exclusively use premium brands: MAC, Charlotte Tilbury, Giorgio Armani, NARS, and Huda Beauty — always skin-safe and tested for Indian climates.",
  },
  {
    q: "Can you accommodate sensitive skin?",
    a: "Of course. Please inform us during booking. We have hypoallergenic product options and tailor every session to your skin type and concerns.",
  },
  {
    q: "Do you provide home services?",
    a: "Yes, we offer home visits across Bengaluru. Additional travel charges may apply based on distance from our studio in Jayamahal.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-card/30 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionTitle
            tag="FAQ"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know before booking your session with Nehad Imran."
          />
        </SectionReveal>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <SectionReveal key={faq.q} delay={i * 0.08}>
              <motion.div
                data-ocid={`faq.item.${i + 1}`}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  openIndex === i
                    ? "border-primary/50 bg-card shadow-[0_0_30px_oklch(0.42_0.1_45/0.1)]"
                    : "border-border bg-card/60 hover:border-primary/30"
                }`}
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  data-ocid={`faq.toggle.${i + 1}`}
                >
                  <span className="font-body text-sm font-medium text-foreground">
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 text-primary"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="w-4 h-4"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === i ? "auto" : 0,
                    opacity: openIndex === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 font-body text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </motion.div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Map & Location ───────────────────────────────────────────────────────────
function MapSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.58_0.14_52/0.04)_0%,transparent_70%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionReveal>
          <SectionTitle
            tag="Find Us"
            title="Visit the Studio"
            subtitle="Located in the heart of Bengaluru's Jayamahal neighbourhood, our studio is easily accessible."
          />
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <SectionReveal>
            <div className="relative rounded-2xl overflow-hidden border border-primary/20 shadow-[0_8px_40px_oklch(0.42_0.1_45/0.12)] h-72 lg:h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.516!2d77.5946!3d13.0060!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae178e8b4ac735%3A0x7f8b2e28c2e2f2f2!2sJayamahal%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1683000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "sepia(0.3) saturate(0.8)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Makeup by Nehad Imran Studio Location"
              />
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="space-y-6">
              <div className="blur-glow rounded-2xl p-6 border border-primary/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      className="w-5 h-5 text-primary"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-body text-sm font-semibold text-foreground mb-1">
                      Studio Address
                    </h4>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      2nd Floor, 4, VP Deenadayalu Naidu Rd,
                      <br />
                      Nandi Durga Road Extension, Jayamahal,
                      <br />
                      Bengaluru, Karnataka 560046
                    </p>
                  </div>
                </div>
              </div>

              <div className="blur-glow rounded-2xl p-6 border border-primary/20">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      className="w-5 h-5 text-primary"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-body text-sm font-semibold text-foreground mb-1">
                      Phone
                    </h4>
                    <a
                      href="tel:09986660543"
                      className="font-body text-sm text-primary hover:underline"
                    >
                      09986660543
                    </a>
                  </div>
                </div>
              </div>

              <div className="blur-glow rounded-2xl p-6 border border-primary/20">
                <h4 className="font-body text-sm font-semibold text-foreground mb-3">
                  Studio Hours
                </h4>
                <div className="space-y-2">
                  {[
                    { day: "Monday – Saturday", hours: "9:00 AM – 8:00 PM" },
                    { day: "Sunday", hours: "10:00 AM – 6:00 PM" },
                  ].map(({ day, hours }) => (
                    <div
                      key={day}
                      className="flex justify-between text-sm font-body"
                    >
                      <span className="text-muted-foreground">{day}</span>
                      <span className="text-foreground font-medium">
                        {hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section
      className="py-28 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.26 0.07 42) 0%, oklch(0.22 0.06 38) 40%, oklch(0.28 0.08 50) 100%)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.58 0.14 52 / 0.12) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-3xl"
        style={{ background: "oklch(0.65 0.14 55 / 0.1)" }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <SectionReveal>
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="inline-block mb-6"
          >
            <span className="text-6xl">💄</span>
          </motion.div>
          <h2
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ color: "oklch(0.95 0.03 72)" }}
          >
            Ready to Look
            <span
              className="block shimmer-gold"
              style={{
                filter: "drop-shadow(0 0 24px oklch(0.65 0.14 55 / 0.5))",
              }}
            >
              Extraordinary?
            </span>
          </h2>
          <p
            className="font-body text-lg mb-10 max-w-xl mx-auto"
            style={{ color: "oklch(0.78 0.02 65)" }}
          >
            Book your session with Nehad Imran today. Whether it&apos;s your
            wedding day, a film set, or a special occasion — you deserve the
            best.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:09986660543"
              data-ocid="cta.call_button"
              className="px-8 py-4 rounded-full font-body font-semibold text-base transition-all duration-300 hover:scale-105"
              style={{
                background: "oklch(0.65 0.14 55)",
                color: "oklch(0.18 0.05 40)",
                boxShadow: "0 8px 32px oklch(0.65 0.14 55 / 0.45)",
              }}
            >
              📞 Call: 09986660543
            </a>
            <a
              href="https://wa.me/919986660543"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="cta.whatsapp_button"
              className="px-8 py-4 rounded-full font-body font-semibold text-base border transition-all duration-300 hover:scale-105"
              style={{
                borderColor: "oklch(0.65 0.14 55 / 0.6)",
                color: "oklch(0.88 0.03 68)",
              }}
            >
              💬 WhatsApp Us
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: "", phone: "", service: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 bg-background relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.58_0.14_52/0.06)_0%,transparent_50%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionReveal>
          <SectionTitle
            tag="Book a Session"
            title="Get in Touch"
            subtitle="Fill out the form below and we'll get back to you within 24 hours to confirm your booking."
          />
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <SectionReveal>
            <form
              onSubmit={handleSubmit}
              data-ocid="contact.form"
              className="blur-glow rounded-2xl p-8 border border-primary/20 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-body text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    data-ocid="contact.name_input"
                    placeholder="Priya Sharma"
                    className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border focus:border-primary focus:ring-1 focus:ring-primary/50 text-sm font-body text-foreground placeholder:text-muted-foreground/50 outline-none transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block font-body text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    data-ocid="contact.phone_input"
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border focus:border-primary focus:ring-1 focus:ring-primary/50 text-sm font-body text-foreground placeholder:text-muted-foreground/50 outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="contact-service"
                  className="block font-body text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2"
                >
                  Service Interested In
                </label>
                <select
                  id="contact-service"
                  required
                  value={form.service}
                  onChange={(e) =>
                    setForm({ ...form, service: e.target.value })
                  }
                  data-ocid="contact.service_select"
                  className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border focus:border-primary focus:ring-1 focus:ring-primary/50 text-sm font-body text-foreground outline-none transition-all"
                >
                  <option value="">Select a service...</option>
                  <option value="bridal">Bridal Makeup</option>
                  <option value="celebrity">Celebrity / Film Makeup</option>
                  <option value="party">Party & Event Glam</option>
                  <option value="engagement">Engagement Makeup</option>
                  <option value="saree">Saree Draping & Styling</option>
                  <option value="class">Makeup Master Class</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="block font-body text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  data-ocid="contact.message_textarea"
                  placeholder="Tell us about your event, date, and any specific requirements..."
                  className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border focus:border-primary focus:ring-1 focus:ring-primary/50 text-sm font-body text-foreground placeholder:text-muted-foreground/50 outline-none transition-all resize-none"
                />
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  data-ocid="contact.success_state"
                  className="flex items-center gap-3 p-4 rounded-xl bg-primary/10 border border-primary/30 text-sm font-body text-primary"
                >
                  <span>✓</span> Thank you! We'll be in touch within 24 hours.
                </motion.div>
              ) : (
                <button
                  type="submit"
                  data-ocid="contact.submit_button"
                  className="w-full py-3.5 rounded-xl font-body font-semibold text-sm bg-primary text-primary-foreground shadow-[0_4px_20px_oklch(0.42_0.1_45/0.3)] hover:shadow-[0_8px_30px_oklch(0.58_0.14_52/0.45)] transition-all duration-300 hover:scale-[1.02]"
                >
                  Send Enquiry →
                </button>
              )}
            </form>
          </SectionReveal>

          {/* Gallery preview */}
          <SectionReveal delay={0.2}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {GALLERY_IMAGES.slice(5, 9).map((src, i) => (
                  <motion.div
                    key={src}
                    whileHover={{ scale: 1.04, rotate: i % 2 === 0 ? 1 : -1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="rounded-xl overflow-hidden aspect-square"
                  >
                    <img
                      src={src}
                      alt={`Look ${i + 1}`}
                      className="w-full h-full object-cover object-top"
                    />
                  </motion.div>
                ))}
              </div>
              <div className="blur-glow rounded-2xl p-6 border border-primary/20 text-center">
                <p className="font-display text-lg font-semibold text-foreground mb-2">
                  Prefer to call?
                </p>
                <a
                  href="tel:09986660543"
                  className="font-body text-xl font-bold text-primary hover:underline glow-sm"
                >
                  09986660543
                </a>
                <p className="font-body text-xs text-muted-foreground mt-1">
                  Mon – Sat, 9 AM to 8 PM
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <Layout>
      <HeroSection />
      <CelebritySection />
      <ServicesSection />
      <GallerySection />
      <WhyUsSection />
      <AboutSection />
      <ReviewsSection />
      <FAQSection />
      <CTASection />
      <MapSection />
      <ContactSection />
    </Layout>
  );
}
