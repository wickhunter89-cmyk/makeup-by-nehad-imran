import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { threshold: 0.3 },
    );
    for (const { href } of NAV_LINKS) {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-card/90 border-b border-border shadow-[0_4px_30px_oklch(0.42_0.1_45/0.08)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => scrollTo("#home")}
          data-ocid="nav.logo"
          className="flex flex-col cursor-pointer group"
        >
          <span className="font-display text-lg sm:text-xl font-bold tracking-wide text-foreground group-hover:text-primary transition-colors duration-300">
            Makeup by Nehad Imran
          </span>
          <span className="text-[10px] tracking-[0.25em] text-primary uppercase font-body opacity-80">
            Premium Makeup Studio
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <button
                type="button"
                onClick={() => scrollTo(href)}
                data-ocid={`nav.${label.toLowerCase()}_link`}
                className={`relative text-sm font-body font-medium tracking-wide transition-all duration-300 py-1 ${
                  activeSection === href.replace("#", "")
                    ? "text-primary glow-sm"
                    : "text-muted-foreground hover:text-primary"
                } group`}
              >
                {label}
                <span
                  className={`absolute bottom-0 left-0 h-px bg-primary transition-all duration-300 ${
                    activeSection === href.replace("#", "")
                      ? "w-full shadow-[0_0_6px_oklch(0.42_0.1_45/0.8)]"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>

        {/* Book CTA */}
        <button
          type="button"
          onClick={() => scrollTo("#contact")}
          data-ocid="nav.book_button"
          className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium font-body bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-[0_4px_20px_oklch(0.42_0.1_45/0.25)] hover:shadow-[0_6px_28px_oklch(0.58_0.14_52/0.4)]"
        >
          Book Now
        </button>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-ocid="nav.mobile_menu_button"
          className="md:hidden p-2 rounded-lg text-foreground hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span
              className={`h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`}
            />
            <span
              className={`h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden backdrop-blur-xl bg-background/95 border-b border-border"
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <button
                    type="button"
                    onClick={() => scrollTo(href)}
                    data-ocid={`nav.mobile.${label.toLowerCase()}_link`}
                    className="w-full text-left text-base font-body font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-border/40"
                  >
                    {label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("#contact")}
                  data-ocid="nav.mobile.book_button"
                  className="w-full text-center px-5 py-2.5 rounded-full text-sm font-medium font-body bg-primary text-primary-foreground mt-2"
                >
                  Book Now
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function FloatingButtons() {
  return (
    <div className="fixed bottom-8 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp / Phone */}
      <a
        href="tel:09986660543"
        data-ocid="floating.phone_button"
        aria-label="Call us"
        className="group w-12 h-12 rounded-full flex items-center justify-center bg-primary shadow-[0_4px_20px_oklch(0.42_0.1_45/0.35)] hover:shadow-[0_6px_32px_oklch(0.58_0.14_52/0.55)] transition-all duration-300 hover:scale-110 border border-primary/30"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 text-primary-foreground"
          aria-hidden="true"
        >
          <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C9.6 21 3 14.4 3 6c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" />
        </svg>
        <span className="sr-only">Call us</span>
      </a>
    </div>
  );
}

function InstagramFloat() {
  return (
    <div className="fixed bottom-8 left-6 z-50">
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="floating.instagram_button"
        aria-label="Follow on Instagram"
        className="group flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-md bg-card/90 border border-primary/30 shadow-[0_4px_18px_oklch(0.42_0.1_45/0.15)] hover:shadow-[0_6px_28px_oklch(0.58_0.14_52/0.35)] transition-all duration-300 hover:scale-105"
      >
        <svg
          viewBox="0 0 24 24"
          fill="url(#ig-grad)"
          className="w-5 h-5 shrink-0"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f09433" />
              <stop offset="25%" stopColor="#e6683c" />
              <stop offset="50%" stopColor="#dc2743" />
              <stop offset="75%" stopColor="#cc2366" />
              <stop offset="100%" stopColor="#bc1888" />
            </linearGradient>
          </defs>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
        <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors hidden sm:inline">
          @makeupbynehad
        </span>
      </a>
    </div>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      className="border-t border-primary/20 pt-16 pb-8"
      style={{
        background: "oklch(0.22 0.06 42)",
        color: "oklch(0.9 0.015 72)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3
              className="font-display text-2xl font-bold mb-3"
              style={{ color: "oklch(0.88 0.04 68)" }}
            >
              Makeup by Nehad Imran
            </h3>
            <p
              className="text-sm font-body leading-relaxed mb-4"
              style={{ color: "oklch(0.72 0.03 60)" }}
            >
              Premium makeup artist studio in Bengaluru. Bringing luxury and
              artistry to every client — from bridal looks to celebrity
              appearances.
            </p>
            <div className="flex gap-3">
              <div
                className="w-8 h-0.5 rounded-full"
                style={{ background: "oklch(0.65 0.12 55)" }}
              />
              <div
                className="w-4 h-0.5 rounded-full"
                style={{ background: "oklch(0.65 0.12 55 / 0.4)" }}
              />
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-body text-sm font-semibold tracking-widest uppercase mb-4"
              style={{ color: "oklch(0.72 0.12 55)" }}
            >
              Contact
            </h4>
            <ul
              className="space-y-3 text-sm font-body"
              style={{ color: "oklch(0.72 0.03 60)" }}
            >
              <li className="flex items-start gap-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="w-4 h-4 mt-0.5 shrink-0"
                  style={{ color: "oklch(0.72 0.12 55)" }}
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
                <span>
                  2nd Floor, 4, VP Deenadayalu Naidu Rd,
                  <br />
                  Nandi Durga Road Extension, Jayamahal,
                  <br />
                  Bengaluru, Karnataka 560046
                </span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="w-4 h-4 shrink-0"
                  style={{ color: "oklch(0.72 0.12 55)" }}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                <a
                  href="tel:09986660543"
                  className="footer-link transition-colors"
                >
                  09986660543
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-body text-sm font-semibold tracking-widest uppercase mb-4"
              style={{ color: "oklch(0.72 0.12 55)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm font-body footer-link transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body"
          style={{
            borderTop: "1px solid oklch(0.35 0.06 42)",
            color: "oklch(0.55 0.03 55)",
          }}
        >
          <p>© {year} Makeup by Nehad Imran. All rights reserved.</p>
          <a
            href={kavyarl}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link-subtle transition-colors"
          >
            Designed By Kavya Chaudhary
          </a>
        </div>
      </div>
    </footer>
  );
}

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main>{children}</main>
      <Footer />
      <FloatingButtons />
      <InstagramFloat />
    </div>
  );
}
