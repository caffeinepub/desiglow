import {
  ChevronDown,
  Hammer,
  Heart,
  Home,
  Leaf,
  MessageCircle,
  Package,
  Phone,
  Sparkles,
  Star,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Intersection Observer hook for scroll animations
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-cream font-sans text-charcoal">
      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-cream shadow-card py-2"
            : "bg-cream/90 backdrop-blur-sm py-3"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2 focus:outline-none"
          >
            <img
              src="/assets/uploads/IMG-20260130-WA0262-3-1.jpg"
              alt="DESIGLOW Logo"
              className="h-12 w-12 object-contain rounded-full"
            />
            <span className="font-serif text-xl font-bold text-charcoal tracking-wide">
              DESIGLOW
            </span>
          </button>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8 font-sans text-sm font-semibold uppercase tracking-widest">
            <li>
              <button
                type="button"
                data-ocid="nav.home.link"
                onClick={() => scrollTo("hero")}
                className="text-charcoal-soft hover:text-gold transition-colors"
              >
                Home
              </button>
            </li>
            <li>
              <button
                type="button"
                data-ocid="nav.about.link"
                onClick={() => scrollTo("about")}
                className="text-charcoal-soft hover:text-gold transition-colors"
              >
                About
              </button>
            </li>
            <li>
              <button
                type="button"
                data-ocid="nav.features.link"
                onClick={() => scrollTo("features")}
                className="text-charcoal-soft hover:text-gold transition-colors"
              >
                Features
              </button>
            </li>
            <li>
              <button
                type="button"
                data-ocid="nav.contact.link"
                onClick={() => scrollTo("contact")}
                className="text-charcoal-soft hover:text-gold transition-colors"
              >
                Contact
              </button>
            </li>
          </ul>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-charcoal transition-all ${
                mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-charcoal transition-all ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-charcoal transition-all ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-cream border-t border-cream-dark px-6 py-4 flex flex-col gap-4 font-sans text-sm font-semibold uppercase tracking-widest">
            <button
              type="button"
              data-ocid="nav.home.link"
              onClick={() => scrollTo("hero")}
              className="text-left text-charcoal-soft hover:text-gold"
            >
              Home
            </button>
            <button
              type="button"
              data-ocid="nav.about.link"
              onClick={() => scrollTo("about")}
              className="text-left text-charcoal-soft hover:text-gold"
            >
              About
            </button>
            <button
              type="button"
              data-ocid="nav.features.link"
              onClick={() => scrollTo("features")}
              className="text-left text-charcoal-soft hover:text-gold"
            >
              Features
            </button>
            <button
              type="button"
              data-ocid="nav.contact.link"
              onClick={() => scrollTo("contact")}
              className="text-left text-charcoal-soft hover:text-gold"
            >
              Contact
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-decor.dim_1200x700.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/75 via-charcoal/60 to-charcoal/80" />

        <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl fade-in">
          <img
            src="/assets/uploads/IMG-20260130-WA0262-3-1.jpg"
            alt="DESIGLOW"
            className="w-28 h-28 object-contain rounded-full border-4 border-gold/60 shadow-gold"
            style={{ filter: "drop-shadow(0 0 24px rgba(201,136,58,0.6))" }}
          />
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-cream leading-tight">
            Where Indian Tradition
            <br />
            Meets Modern Living
          </h1>
          <p className="text-cream/80 text-lg md:text-xl max-w-xl leading-relaxed">
            Affordable, stylish home decor that brings the soul of India into
            every corner of your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <button
              type="button"
              data-ocid="hero.primary_button"
              onClick={() => scrollTo("features")}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gold font-semibold text-white text-base shadow-gold hover:bg-gold-dark transition-colors"
            >
              <Package className="w-5 h-5" />
              Shop Now
            </button>
            <button
              type="button"
              data-ocid="hero.secondary_button"
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-cream text-cream font-semibold text-base hover:bg-cream/10 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Contact Us
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          type="button"
          onClick={() => scrollTo("about")}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-cream/60 hover:text-cream transition-colors animate-bounce"
          aria-label="Scroll down"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-6 h-6" />
        </button>
      </section>

      {/* VALUE PROPOSITION */}
      <section id="about" className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
              Our Promise
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal">
              Why Choose DESIGLOW?
            </h2>
            <div className="mx-auto mt-4 w-20 h-1 bg-gold rounded-full" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="w-8 h-8 text-gold" />,
                title: "Rooted in Tradition",
                desc: "Inspired by centuries of Indian craft — every piece carries a story of heritage, passed down through generations of artisans.",
                delay: 0,
              },
              {
                icon: <Sparkles className="w-8 h-8 text-gold" />,
                title: "Modern Aesthetics",
                desc: "Clean, contemporary designs that seamlessly blend into modern homes while celebrating our cultural roots.",
                delay: 150,
              },
              {
                icon: <Star className="w-8 h-8 text-gold" />,
                title: "Affordable Luxury",
                desc: "Premium craftsmanship and quality materials — without the premium price tag. Beautiful decor for every home.",
                delay: 300,
              },
            ].map(({ icon, title, desc, delay }) => (
              <AnimatedSection key={title} delay={delay}>
                <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-gold transition-shadow border border-cream-dark flex flex-col gap-4">
                  <div className="w-14 h-14 rounded-xl bg-cream-dark flex items-center justify-center">
                    {icon}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-charcoal">
                    {title}
                  </h3>
                  <p className="text-charcoal-soft leading-relaxed text-sm">
                    {desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES / PRODUCTS SHOWCASE */}
      <section id="features" className="py-24 bg-cream-dark">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
              Handpicked & Handcrafted
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal">
              Our Collection
            </h2>
            <div className="mx-auto mt-4 w-20 h-1 bg-gold rounded-full" />
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection delay={0}>
              <img
                src="/assets/generated/products-showcase.dim_900x600.jpg"
                alt="DESIGLOW product collection"
                className="rounded-3xl shadow-card w-full object-cover"
                style={{ maxHeight: "480px" }}
              />
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="flex flex-col gap-6">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-charcoal">
                  Bringing India's Artistic Soul Into Your Home
                </h3>
                <p className="text-charcoal-soft leading-relaxed">
                  Each piece in our collection is thoughtfully curated, blending
                  traditional Indian artistry with the needs of modern living.
                  From entryways to living rooms, we have something for every
                  space.
                </p>

                <div className="flex flex-col gap-4 mt-2">
                  {[
                    {
                      icon: <Hammer className="w-5 h-5 text-gold" />,
                      text: "Handcrafted home accents",
                    },
                    {
                      icon: <Sparkles className="w-5 h-5 text-gold" />,
                      text: "Traditional Indian motifs reimagined",
                    },
                    {
                      icon: <Leaf className="w-5 h-5 text-gold" />,
                      text: "Eco-friendly materials",
                    },
                    {
                      icon: <Home className="w-5 h-5 text-gold" />,
                      text: "Curated for modern Indian homes",
                    },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-cream flex items-center justify-center flex-shrink-0 shadow-xs">
                        {icon}
                      </div>
                      <span className="text-charcoal font-medium">{text}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => scrollTo("contact")}
                  className="mt-4 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold text-white font-semibold shadow-gold hover:bg-gold-dark transition-colors self-start"
                >
                  <Phone className="w-4 h-4" />
                  Get in Touch
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* VISUAL SHOWCASE / STATS */}
      <section className="relative py-0">
        <div
          className="relative w-full"
          style={{
            backgroundImage:
              "url('/assets/generated/features-grid.dim_900x500.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "380px",
          }}
        >
          <div className="absolute inset-0 bg-charcoal/70" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full py-24 px-6 text-center">
            <AnimatedSection>
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
                Our Story in Numbers
              </p>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-cream mb-12">
                Crafting Homes, Creating Memories
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-3xl mx-auto">
              {[
                { stat: "100+", label: "Unique Products", delay: 0 },
                { stat: "★★★★★", label: "Happy Customers", delay: 150 },
                { stat: "∞", label: "Artisan Inspired", delay: 300 },
              ].map(({ stat, label, delay }) => (
                <AnimatedSection key={label} delay={delay}>
                  <div className="flex flex-col items-center gap-2">
                    <span className="font-serif text-4xl md:text-5xl font-bold text-gold">
                      {stat}
                    </span>
                    <span className="text-cream/80 text-sm uppercase tracking-widest font-semibold">
                      {label}
                    </span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
              The People
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal">
              The Minds Behind DESIGLOW
            </h2>
            <div className="mx-auto mt-4 w-20 h-1 bg-gold rounded-full" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { name: "Prince Madaliya", initials: "PM", delay: 0 },
              { name: "Khushi Parmar", initials: "KP", delay: 150 },
              { name: "Parth Nahar", initials: "PN", delay: 300 },
            ].map(({ name, initials, delay }) => (
              <AnimatedSection key={name} delay={delay}>
                <div className="bg-white rounded-2xl p-8 shadow-card border border-cream-dark flex flex-col items-center gap-4 text-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold font-serif text-white"
                    style={{
                      background: "linear-gradient(135deg, #C9883A, #C4704A)",
                    }}
                  >
                    {initials}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-charcoal">
                      {name}
                    </h3>
                    <p className="text-gold text-sm font-semibold uppercase tracking-widest mt-1">
                      Co-Founder
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="py-24"
        style={{
          background: "linear-gradient(135deg, #2C2416 0%, #4A3F30 100%)",
        }}
      >
        <div className="max-w-2xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
              Reach Out
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mb-4">
              Get in Touch
            </h2>
            <p className="text-cream/70 text-lg leading-relaxed mb-10">
              Interested in our collection? Have a custom request? We'd love to
              hear from you.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center mb-10">
              <a
                data-ocid="contact.primary_button"
                href="tel:9687380038"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gold text-white font-semibold text-base shadow-gold hover:bg-gold-dark transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call Us Now
              </a>
              <a
                data-ocid="contact.secondary_button"
                href="https://wa.me/919687380038"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border-2 border-gold text-gold font-semibold text-base hover:bg-gold/10 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
            </div>

            <div className="flex items-center justify-center gap-3 text-cream/50 text-sm">
              <Phone className="w-4 h-4" />
              <span className="tracking-widest font-semibold">9687380038</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-charcoal py-10 border-t border-charcoal-soft">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/assets/uploads/IMG-20260130-WA0262-3-1.jpg"
              alt="DESIGLOW"
              className="h-10 w-10 object-contain rounded-full border border-gold/40"
            />
            <div>
              <p className="font-serif font-bold text-cream text-lg tracking-wide">
                DESIGLOW
              </p>
              <p className="text-cream/50 text-xs">
                Where Indian Tradition Meets Modern Living
              </p>
            </div>
          </div>

          <p className="text-cream/40 text-sm text-center">
            © {year} DESIGLOW. Built with <span className="text-gold">♥</span>{" "}
            using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
