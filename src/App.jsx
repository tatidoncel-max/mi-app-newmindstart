import { useState, useEffect } from "react";

// TODO: Conectar con API real de NEWMINDSTART para obtener cursos dinámicos
// TODO: Integrar Stripe con clave pk_live_51NcotfGLGIrRJxc3uuxDXN4IeTYhmJCy0QONwhyP72sTmnpJrXTz4YzKJZq6WvUc0p5Wa37M3I6Vu76jBNWXwyT700Yy1ISlX0
// TODO: Implementar autenticación real de usuarios
// TODO: Conectar con backend Livewire/Laravel para datos en tiempo real

const COLORS = {
  primary: "#6C3CE1",       // Morado principal
  primaryDark: "#4f28b8",
  primaryLight: "#8B5CF6",
  secondary: "#F59E0B",     // Dorado/Amarillo acento
  dark: "#0F0A1E",          // Fondo oscuro principal
  darkCard: "#1A1035",      // Fondo tarjetas
  darkNav: "#110D2A",       // Fondo nav
  text: "#FFFFFF",
  textMuted: "#A09BC0",
  textSecondary: "#C4B5FD",
  success: "#10B981",
  border: "#2D2060",
  cardBorder: "#3D2F80",
};

const NAV_LINKS = [
  { label: "Inicio", href: "#hero" },
  { label: "Cursos", href: "#courses" },
  { label: "Categorías", href: "#categories" },
  { label: "Testimonios", href: "#testimonials" },
  { label: "Contacto", href: "#contact" },
];

const COURSES = [
  {
    id: 1,
    title: "Desarrollo Web Full Stack",
    category: "Programación",
    level: "Intermedio",
    duration: "120 horas",
    students: 3420,
    rating: 4.9,
    price: 199,
    originalPrice: 399,
    image: "https://via.placeholder.com/400x220/6C3CE1/FFFFFF?text=Full+Stack",
    instructor: "Carlos Mendoza",
    tags: ["HTML", "CSS", "React", "Node.js"],
    badge: "Más Vendido",
    badgeColor: COLORS.secondary,
  },
  {
    id: 2,
    title: "Inteligencia Artificial y Machine Learning",
    category: "IA & Data",
    level: "Avanzado",
    duration: "150 horas",
    students: 2180,
    rating: 4.8,
    price: 249,
    originalPrice: 499,
    image: "https://via.placeholder.com/400x220/4f28b8/FFFFFF?text=AI+%26+ML",
    instructor: "Ana García",
    tags: ["Python", "TensorFlow", "OpenAI"],
    badge: "Nuevo",
    badgeColor: COLORS.success,
  },
  {
    id: 3,
    title: "Diseño UX/UI con Figma",
    category: "Diseño",
    level: "Principiante",
    duration: "80 horas",
    students: 5670,
    rating: 4.9,
    price: 149,
    originalPrice: 299,
    image: "https://via.placeholder.com/400x220/8B5CF6/FFFFFF?text=UX%2FUI",
    instructor: "Laura Torres",
    tags: ["Figma", "Prototipos", "UX Research"],
    badge: "Popular",
    badgeColor: "#EC4899",
  },
  {
    id: 4,
    title: "Marketing Digital & SEO",
    category: "Marketing",
    level: "Principiante",
    duration: "60 horas",
    students: 4120,
    rating: 4.7,
    price: 129,
    originalPrice: 259,
    image: "https://via.placeholder.com/400x220/1A1035/FFFFFF?text=Marketing",
    instructor: "Pedro Ramírez",
    tags: ["SEO", "Google Ads", "Analytics"],
    badge: null,
    badgeColor: null,
  },
  {
    id: 5,
    title: "Ciberseguridad Profesional",
    category: "Seguridad",
    level: "Avanzado",
    duration: "200 horas",
    students: 1890,
    rating: 4.9,
    price: 299,
    originalPrice: 599,
    image: "https://via.placeholder.com/400x220/0F0A1E/FFFFFF?text=Ciberseguridad",
    instructor: "Miguel Ángel López",
    tags: ["Ethical Hacking", "Redes", "CTF"],
    badge: "Destacado",
    badgeColor: COLORS.primary,
  },
  {
    id: 6,
    title: "Fotografía y Edición Profesional",
    category: "Fotografía",
    level: "Intermedio",
    duration: "90 horas",
    students: 3210,
    rating: 4.8,
    price: 159,
    originalPrice: 319,
    image: "https://via.placeholder.com/400x220/3D2F80/FFFFFF?text=Fotografía",
    instructor: "Sofía Morales",
    tags: ["Lightroom", "Photoshop", "Composición"],
    badge: null,
    badgeColor: null,
  },
];

const CATEGORIES = [
  { name: "Programación", icon: "💻", count: 48 },
  { name: "IA & Data Science", icon: "🤖", count: 32 },
  { name: "Diseño", icon: "🎨", count: 27 },
  { name: "Marketing", icon: "📈", count: 19 },
  { name: "Fotografía", icon: "📷", count: 15 },
  { name: "Negocios", icon: "💼", count: 24 },
  { name: "Idiomas", icon: "🌐", count: 21 },
  { name: "Seguridad", icon: "🔐", count: 13 },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Valentina Cruz",
    role: "Desarrolladora Frontend",
    company: "TechCorp",
    avatar: "https://via.placeholder.com/60x60/6C3CE1/FFFFFF?text=VC",
    text: "Gracias a NEWMINDSTART logré conseguir mi primer trabajo como desarrolladora en solo 6 meses. Los cursos son increíblemente prácticos y los instructores siempre están disponibles.",
    rating: 5,
    course: "Desarrollo Web Full Stack",
  },
  {
    id: 2,
    name: "Roberto Herrera",
    role: "Data Scientist",
    company: "DataLab",
    avatar: "https://via.placeholder.com/60x60/8B5CF6/FFFFFF?text=RH",
    text: "El curso de Machine Learning superó todas mis expectativas. El contenido está perfectamente estructurado y los proyectos prácticos me ayudaron a construir un portafolio sólido.",
    rating: 5,
    course: "IA y Machine Learning",
  },
  {
    id: 3,
    name: "Isabella Martínez",
    role: "UX Designer",
    company: "CreativeStudio",
    avatar: "https://via.placeholder.com/60x60/F59E0B/0F0A1E?text=IM",
    text: "NEWMINDSTART transformó mi carrera. Pasé de no saber nada de diseño a trabajar en una agencia top. La inversión valió completamente la pena.",
    rating: 5,
    course: "Diseño UX/UI con Figma",
  },
];

const STATS = [
  { value: "50,000+", label: "Estudiantes" },
  { value: "200+", label: "Cursos" },
  { value: "98%", label: "Satisfacción" },
  { value: "150+", label: "Instructores" },
];

// ─── Utility Components ───────────────────────────────────────────────────────

function StarRating({ rating }) {
  return (
    <span style={{ color: COLORS.secondary, fontSize: "0.85rem", letterSpacing: "1px" }}>
      {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
      <span style={{ color: COLORS.textMuted, marginLeft: 4, fontSize: "0.8rem" }}>
        ({rating})
      </span>
    </span>
  );
}

function Button({ children, variant = "primary", onClick, style = {}, href }) {
  const [hovered, setHovered] = useState(false);

  const base = {
    padding: "12px 28px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "0.95rem",
    transition: "all 0.25s ease",
    textDecoration: "none",
    display: "inline-block",
    lineHeight: 1.2,
    ...style,
  };

  const variants = {
    primary: {
      background: hovered
        ? `linear-gradient(135deg, ${COLORS.primaryDark}, ${COLORS.primaryLight})`
        : `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
      color: "#fff",
      boxShadow: hovered ? `0 8px 30px ${COLORS.primary}66` : `0 4px 15px ${COLORS.primary}44`,
      transform: hovered ? "translateY(-2px)" : "translateY(0)",
    },
    secondary: {
      background: hovered ? COLORS.secondary : "transparent",
      color: hovered ? COLORS.dark : COLORS.secondary,
      border: `2px solid ${COLORS.secondary}`,
      transform: hovered ? "translateY(-2px)" : "translateY(0)",
    },
    outline: {
      background: hovered ? `${COLORS.primary}22` : "transparent",
      color: COLORS.textSecondary,
      border: `1px solid ${COLORS.border}`,
      transform: hovered ? "translateY(-1px)" : "translateY(0)",
    },
    ghost: {
      background: "transparent",
      color: hovered ? COLORS.primaryLight : COLORS.textMuted,
      border: "none",
      padding: "8px 16px",
    },
  };

  const finalStyle = { ...base, ...variants[variant] };

  if (href) {
    return (
      <a
        href={href}
        style={finalStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      style={finalStyle}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: scrolled
      ? `${COLORS.darkNav}F5`
      : "transparent",
    backdropFilter: scrolled ? "blur(12px)" : "none",
    borderBottom: scrolled ? `1px solid ${COLORS.border}` : "none",
    transition: "all 0.3s ease",
  };

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav style={navStyle}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 70,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
          onClick={() => handleNavClick("#hero")}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.1rem",
          }}>🧠</div>
          <span style={{
            fontWeight: 800,
            fontSize: "1.2rem",
            color: COLORS.text,
            letterSpacing: "-0.5px",
          }}>
            NEW<span style={{ color: COLORS.primaryLight }}>MIND</span>START
          </span>
        </div>

        {/* Desktop links */}
        <div style={{
          display: "flex",
          gap: 4,
          alignItems: "center",
        }} className="desktop-nav">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              link={link}
              active={activeSection === link.href.replace("#", "")}
              onClick={() => handleNavClick(link.href)}
            />
          ))}
        </div>

        {/* Desktop CTAs */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }} className="desktop-nav">
          {/* TODO: Implementar autenticación real */}
          <Button variant="ghost" onClick={() => alert("TODO: Modal de Login")}>Iniciar Sesión</Button>
          <Button variant="primary" style={{ padding: "10px 20px", fontSize: "0.88rem" }}
            onClick={() => alert("TODO: Registro de usuario")}>
            Comenzar Gratis
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            display: "none",
            flexDirection: "column",
            gap: 5,
          }}
          className="hamburger"
          aria-label="Menú"
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: "block",
              width: 24,
              height: 2,
              background: COLORS.text,
              borderRadius: 2,
              transition: "all 0.3s",
              transform: menuOpen
                ? i === 0 ? "rotate(45deg) translate(5px, 5px)"
                : i === 1 ? "opacity(0)" : "rotate(-45deg) translate(5px, -5px)"
                : "none",
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: COLORS.darkNav,
          borderTop: `1px solid ${COLORS.border}`,
          padding: "16px 24px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}>
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              style={{
                background: "none",
                border: "none",
                color: COLORS.text,
                padding: "12px 0",
                textAlign: "left",
                fontSize: "1rem",
                cursor: "pointer",
                borderBottom: `1px solid ${COLORS.border}44`,
              }}
            >
              {link.label}
            </button>
          ))}
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            {/* TODO: Implementar autenticación real */}
            <Button variant="outline" onClick={() => alert("TODO: Modal de Login")}>
              Iniciar Sesión
            </Button>
            <Button variant="primary" onClick={() => alert("TODO: Registro de usuario")}>
              Comenzar Gratis
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ link, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "none",
        border: "none",
        color: active ? COLORS.primaryLight : hovered ? COLORS.text : COLORS.textMuted,
        padding: "8px 14px",
        borderRadius: 6,
        fontSize: "0.92rem",
        cursor: "pointer",
        fontWeight: active ? 600 : 400,
        transition: "all 0.2s",
        position: "relative",
      }}
    >
      {link.label}
      {active && (
        <span style={{
          position: "absolute",
          bottom: 2,
          left: "50%",
          transform: "translateX(-50%)",
          width: 20,
          height: 2,
          background: COLORS.primaryLight,
          borderRadius: 1,
        }} />
      )}
    </button>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  const [emailInput, setEmailInput] = useState("");

  return (
    <section id="hero" style={{
      minHeight: "100vh",
      background: `radial-gradient(ellipse at 70% 50%, ${COLORS.primary}22 0%, transparent 60%),
                   radial-gradient(ellipse at 20% 80%, ${COLORS.primaryLight}15 0%, transparent 50%),
                   ${COLORS.dark}`,
      display: "flex",
      alignItems: "center",
      paddingTop: 80,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative elements */}
      <div style={{
        position: "absolute",
        top: "15%",
        right: "5%",
        width: 300,
        height: 300,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.primary}20, transparent 70%)`,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: "10%",
        left: "2%",
        width: 200,
        height: 200,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.secondary}15, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px", width: "100%" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 60,
          alignItems: "center",
        }} className="hero-grid">
          {/* Left content */}
          <div>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: `${COLORS.primary}22`,
              border: `1px solid ${COLORS.primary}44`,
              borderRadius: 30,
              padding: "6px 16px",
              marginBottom: 24,
            }}>
              <span style={{ fontSize: "0.75rem" }}>✨</span>
              <span style={{ color: COLORS.textSecondary, fontSize: "0.82rem", fontWeight: 600 }}>
                Plataforma de aprendizaje online #1
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              color: COLORS.text,
              lineHeight: 1.15,
              marginBottom: 20,
              letterSpacing: "-1px",
            }}>
              Transforma tu{" "}
              <span style={{
                background: `linear-gradient(135deg, ${COLORS.primaryLight}, ${COLORS.secondary})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                mente
              </span>
              ,<br />
              transforma tu{" "}
              <span style={{
                background: `linear-gradient(135deg, ${COLORS.secondary}, ${COLORS.primaryLight})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                futuro
              </span>
            </h1>

            <p style={{
              color: COLORS.textMuted,
              fontSize: "1.1rem",
              lineHeight: 1.7,
              marginBottom: 36,
              maxWidth: 480,
            }}>
              Accede a más de 200 cursos profesionales impartidos por expertos de la industria.
              Aprende a tu ritmo y alcanza tus metas con NEWMINDSTART.
            </p>

            {/* Email capture form */}
            <div style={{
              display: "flex",
              gap: 12,
              marginBottom: 32,
              flexWrap: "wrap",
            }}>
              <input
                type="email"
                placeholder="tu@email.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: 220,
                  padding: "13px 18px",
                  borderRadius: 8,
                  border: `1px solid ${COLORS.border}`,
                  background: `${COLORS.darkCard}`,
                  color: COLORS.text,
                  fontSize: "0.95rem",
                  outline: "none",
                }}
              />
              {/* TODO: Conectar con API de registro */}
              <Button variant="primary" onClick={() => alert(`TODO: Registrar email: ${emailInput}`)}>
                Empezar Ahora →
              </Button>
            </div>

            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {[
                { icon: "✅", text: "Sin tarjeta de crédito" },
                { icon: "🎯", text: "Cancela cuando quieras" },
                { icon: "📱", text: "Acceso en todos los dispositivos" },
              ].map((item) => (
                <div key={item.text} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  color: COLORS.textMuted,
                  fontSize: "0.82rem",
                }}>
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual card stack */}
          <div style={{ position: "relative", height: 420 }} className="hero-visual">
            {/* Main card */}
            <div style={{
              position: "absolute",
              top: "5%",
              left: "10%",
              right: 0,
              background: `linear-gradient(135deg, ${COLORS.darkCard}, ${COLORS.dark})`,
              border: `1px solid ${COLORS.cardBorder}`,
              borderRadius: 16,
              padding: 28,
              boxShadow: `0 20px 60px ${COLORS.primary}30`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                  background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                }}>💻</div>
                <div>
                  <div style={{ color: COLORS.text, fontWeight: 700, fontSize: "0.95rem" }}>
                    Desarrollo Web Full Stack
                  </div>
                  <div style={{ color: COLORS.textMuted, fontSize: "0.78rem" }}>Carlos Mendoza</div>
                </div>
              </div>
              {/* Progress bar */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ color: COLORS.textMuted, fontSize: "0.8rem" }}>Progreso</span>
                  <span style={{ color: COLORS.primaryLight, fontSize: "0.8rem", fontWeight: 700 }}>68%</span>
                </div>
                <div style={{ background: COLORS.border, borderRadius: 4, height: 6 }}>
                  <div style={{
                    width: "68%",
                    height: "100%",
                    borderRadius: 4,
                    background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
                  }} />
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["HTML", "CSS", "React"].map((tag) => (
                  <span key={tag} style={{
                    background: `${COLORS.primary}22`,
                    color: COLORS.textSecondary,
                    padding: "3px 10px",
                    borderRadius: 20,
                    fontSize: "0.75rem",
                    border: `1px solid ${COLORS.primary}33`,
                  }}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Floating stat card 1 */}
            <div style={{
              position: "absolute",
              top: "58%",
              left: 0,
              background: COLORS.darkCard,
              border: `1px solid ${COLORS.cardBorder}`,
              borderRadius: 12,
              padding: "14px 20px",
              boxShadow: `0 10px 30px rgba(0,0,0,0.4)`,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}>
              <span style={{ fontSize: "1.5rem" }}>🏆</span>
              <div>
                <div style={{ color: COLORS.text, fontWeight: 700, fontSize: "0.9rem" }}>50,000+</div>
                <div style={{ color: COLORS.textMuted, fontSize: "0.75rem" }}>Estudiantes activos</div>
              </div>
            </div>

            {/* Floating stat card 2 */}
            <div style={{
              position: "absolute",
              top: "2%",
              right: "-5%",
              background: COLORS.darkCard,
              border: `1px solid ${COLORS.secondary}44`,
              borderRadius: 12,
              padding: "14px 20px",
              boxShadow: `0 10px 30px rgba(0,0,0,0.4)`,
            }}>
              <div style={{ color: COLORS.secondary, fontWeight: 700, fontSize: "1.1rem" }}>★ 4.9</div>
              <div style={{ color: COLORS.textMuted, fontSize: "0.75rem" }}>Valoración media</div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 24,
          marginTop: 64,
          paddingTop: 48,
          borderTop: `1px solid ${COLORS.border}`,
        }} className="stats-grid">
          {STATS.map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div style={{
                fontSize: "2rem",
                fontWeight: 900,
                background: `linear-gradient(135deg, ${COLORS.primaryLight}, ${COLORS.secondary})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                {stat.value}
              </div>
              <div style={{ color: COLORS.textMuted, fontSize: "0.88rem", marginTop: 4 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Categories Section ───────────────────────────────────────────────────────

function CategoriesSection() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section id="categories" style={{
      padding: "80px 24px",
      background: COLORS.darkCard,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader
          badge="Explora"
          title="Categorías Populares"
          subtitle="Encuentra el área de conocimiento que impulse tu carrera profesional"
        />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 16,
          marginTop: 48,
        }}>
          {CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              onMouseEnter={() => setHoveredId(cat.name)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => alert(`TODO: Filtrar cursos por categoría: ${cat.name}`)}
              style={{
                background: hoveredId === cat.name
                  ? `linear-gradient(135deg, ${COLORS.primary}33, ${COLORS.primaryLight}22)`
                  : COLORS.dark,
                border: `1px solid ${hoveredId === cat.name ? COLORS.primary : COLORS.border}`,
                borderRadius: 12,
                padding: "24px 20px",
                cursor: "pointer",
                transition: "all 0.25s ease",
                transform: hoveredId === cat.name ? "translateY(-4px)" : "none",
                boxShadow: hoveredId === cat.name ? `0 12px 30px ${COLORS.primary}22` : "none",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: 10 }}>{cat.icon}</div>
              <div style={{
                color: hoveredId === cat.name ? COLORS.text : COLORS.textMuted,
                fontWeight: 600,
                fontSize: "0.92rem",
                marginBottom: 6,
                transition: "color 0.2s",
              }}>
                {cat.name}
              </div>
              <div style={{ color: COLORS.textMuted, fontSize: "0.78rem" }}>
                {cat.count} cursos
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Course Card ──────────────────────────────────────────────────────────────

function CourseCard({ course }) {
  const [hovered, setHovered] = useState(false);

  const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: COLORS.darkCard,
        border: `1px solid ${hovered ? COLORS.cardBorder : COLORS.border}`,
        borderRadius: 14,
        overflow: "hidden",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-6px)" : "none",
        boxShadow: hovered ? `0 20px 50px rgba(0,0,0,0.4)` : "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={course.image}
          alt={course.title}
          style={{
            width: "100%",
            height: 180,
            objectFit: "cover",
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        {/* Badge */}
        {course.badge && (
          <span style={{
            position: "absolute",
            top: 12,
            left: 12,
            background: course.badgeColor,
            color: "#fff",
            padding: "4px 10px",
            borderRadius: 20,
            fontSize: "0.72rem",
            fontWeight: 700,
          }}>
            {course.badge}
          </span>
        )}
        {/* Discount */}
        <span style={{
          position: "absolute",
          top: 12,
          right: 12,
          background: COLORS.success,
          color: "#fff",
          padding: "4px 10px",
          borderRadius: 20,
          fontSize: "0.72rem",
          fontWeight: 700,
        }}>
          -{discount}%
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: "18px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
          <span style={{
            background: `${COLORS.primary}22`,
            color: COLORS.textSecondary,
            padding: "3px 10px",
            borderRadius: 20,
            fontSize: "0.72rem",
            border: `1px solid ${COLORS.primary}33`,
          }}>
            {course.category}
          </span>
          <span style={{
            background: `${COLORS.border}`,
            color: COLORS.textMuted,
            padding: "3px 10px",
            borderRadius: 20,
            fontSize: "0.72rem",
          }}>
            {course.level}
          </span>
        </div>

        <h3 style={{
          color: COLORS.text,
          fontWeight: 700,
          fontSize: "0.97rem",
          lineHeight: 1.4,
          marginBottom: 8,
          flex: 1,
        }}>
          {course.title}
        </h3>

        <p style={{
          color: COLORS.textMuted,
          fontSize: "0.8rem",
          marginBottom: 10,
        }}>
          Por {course.instructor}
        </p>

        <StarRating rating={course.rating} />

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginTop: 8,
          color: COLORS.textMuted,
          fontSize: "0.78rem",
        }}>
          <span>⏱️ {course.duration}</span>
          <span>👥 {course.students.toLocaleString()}</span>
        </div>

        <div style={{
          marginTop: 16,
          paddingTop: 14,
          borderTop: `1px solid ${COLORS.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div>
            <span style={{
              color: COLORS.text,
              fontWeight: 800,
              fontSize: "1.25rem",
            }}>
              ${course.price}
            </span>
            <span style={{
              color: COLORS.textMuted,
              fontSize: "0.82rem",
              textDecoration: "line-through",
              marginLeft: 8,
            }}>
              ${course.originalPrice}
            </span>
          </div>
          {/* TODO: Conectar con Stripe para proceso de pago */}
          <Button
            variant="primary"
            style={{ padding: "8px 16px", fontSize: "0.82rem" }}
            onClick={() => alert(`TODO: Stripe checkout para: ${course.title}`)}
          >
            Inscribirme
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Courses Section ──────────────────────────────────────────────────────────

function CoursesSection() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const filters = ["Todos", "Programación", "IA & Data", "Diseño", "Marketing", "Seguridad"];

  const filtered = activeFilter === "Todos"
    ? COURSES
    : COURSES.filter((c) => c.category.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <section id="courses" style={{
      padding: "80px 24px",
      background: COLORS.dark,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader
          badge="Aprende"
          title="Cursos Destacados"
          subtitle="Nuestros cursos más populares seleccionados por expertos en cada área"
        />

        {/* Filters */}
        <div style={{
          display: "flex",
          gap: 8,
          marginTop: 40,
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: 48,
        }}>
          {filters.map((f) => (
            <FilterButton
              key={f}
              label={f}
              active={activeFilter === f}
              onClick={() => setActiveFilter(f)}
            />
          ))}
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 24,
        }}>
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          {/* TODO: Conectar con catálogo completo de cursos */}
          <Button variant="secondary" onClick={() => alert("TODO: Cargar más cursos desde API")}>
            Ver todos los cursos →
          </Button>
        </div>
      </div>
    </section>
  );
}

function FilterButton({ label, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "9px 20px",
        borderRadius: 25,
        border: `1px solid ${active ? COLORS.primary : COLORS.border}`,
        background: active
          ? `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`
          : hovered ? `${COLORS.primary}15` : "transparent",
        color: active ? "#fff" : hovered ? COLORS.textSecondary : COLORS.textMuted,
        fontSize: "0.85rem",
        fontWeight: active ? 600 : 400,
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
    >
      {label}
    </button>
  );
}

// ─── Features Section ─────────────────────────────────────────────────────────

function FeaturesSection() {
  const features = [
    {
      icon: "🎓",
      title: "Instructores Certificados",
      desc: "Aprende de profesionales con años de experiencia en la industria y certificaciones internacionales.",
    },
    {
      icon: "📱",
      title: "Aprende Donde Quieras",
      desc: "Accede a tus cursos desde cualquier dispositivo, en cualquier momento y lugar del mundo.",
    },
    {
      icon: "🏅",
      title: "Certificados Verificados",
      desc: "Obtén certificados digitales reconocidos por empresas líderes al completar cada curso.",
    },
    {
      icon: "💬",
      title: "Soporte 24/7",
      desc: "Comunidad activa y tutores disponibles para resolver tus dudas en tiempo real.",
    },
    {
      icon: "🔄",
      title: "Contenido Actualizado",
      desc: "Material educativo siempre al día con las últimas tendencias y tecnologías del mercado.",
    },
    {
      icon: "💡",
      title: "Proyectos Prácticos",
      desc: "Consolida tu aprendizaje con proyectos reales que podrás añadir a tu portafolio profesional.",
    },
  ];

  return (
    <section style={{
      padding: "80px 24px",
      background: `linear-gradient(180deg, ${COLORS.darkCard} 0%, ${COLORS.dark} 100%)`,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader
          badge="¿Por qué elegirnos?"
          title="Todo lo que necesitas para aprender"
          subtitle="NEWMINDSTART es la plataforma más completa para tu desarrollo profesional"
        />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 24,
          marginTop: 52,
        }}>
          {features.map((feat, i) => (
            <FeatureCard key={i} feature={feat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `${COLORS.primary}15` : COLORS.dark,
        border: `1px solid ${hovered ? COLORS.primary + "55" : COLORS.border}`,
        borderRadius: 14,
        padding: 28,
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "none",
      }}
    >
      <div style={{
        width: 52,
        height: 52,
        borderRadius: 12,
        background: `linear-gradient(135deg, ${COLORS.primary}33, ${COLORS.primaryLight}22)`,
        border: `1px solid ${COLORS.primary}33`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.5rem",
        marginBottom: 16,
      }}>
        {feature.icon}
      </div>
      <h3 style={{
        color: COLORS.text,
        fontWeight: 700,
        fontSize: "1rem",
        marginBottom: 10,
      }}>
        {feature.title}
      </h3>
      <p style={{
        color: COLORS.textMuted,
        fontSize: "0.88rem",
        lineHeight: 1.6,
      }}>
        {feature.desc}
      </p>
    </div>
  );
}

// ─── Testimonials Section ─────────────────────────────────────────────────────

function TestimonialsSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="testimonials" style={{
      padding: "80px 24px",
      background: COLORS.dark,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader
          badge="Testimonios"
          title="Lo que dicen nuestros estudiantes"
          subtitle="Miles de personas ya transformaron su carrera con NEWMINDSTART"
        />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 24,
          marginTop: 52,
        }}>
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>

        {/* CTA Banner */}
        <div style={{
          marginTop: 64,
          background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
          borderRadius: 20,
          padding: "48px 40px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            top: "-30%",
            right: "-5%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.07)",
          }} />
          <div style={{
            position: "absolute",
            bottom: "-40%",
            left: "-5%",
            width: 250,
            height: 250,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
          }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{
              color: "#fff",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 800,
              marginBottom: 12,
            }}>
              ¿Listo para comenzar tu transformación?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: 28, fontSize: "1rem" }}>
              Únete a más de 50,000 estudiantes que ya están aprendiendo con nosotros
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              {/* TODO: Conectar con flujo de registro real */}
              <Button
                variant="secondary"
                onClick={() => alert("TODO: Registro gratuito")}
                style={{ padding: "14px 32px", fontSize: "1rem" }}
              >
                Comenzar Gratis
              </Button>
              <button
                onClick={() => {
                  const el = document.querySelector("#courses");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  padding: "14px 32px",
                  borderRadius: 8,
                  border: "2px solid rgba(255,255,255,0.4)",
                  background: "transparent",
                  color: "#fff",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                Ver Cursos →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <div style={{
      background: COLORS.darkCard,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 14,
      padding: 28,
    }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
        {"★".repeat(testimonial.rating).split("").map((s, i) => (
          <span key={i} style={{ color: COLORS.secondary, fontSize: "1rem" }}>{s}</span>
        ))}
      </div>
      <p style={{
        color: COLORS.textMuted,
        fontSize: "0.92rem",
        lineHeight: 1.7,
        marginBottom: 20,
        fontStyle: "italic",
      }}>
        "{testimonial.text}"
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }}
        />
        <div>
          <div style={{ color: COLORS.text, fontWeight: 700, fontSize: "0.9rem" }}>
            {testimonial.name}
          </div>
          <div style={{ color: COLORS.textMuted, fontSize: "0.78rem" }}>
            {testimonial.role} · {testimonial.company}
          </div>
        </div>
      </div>
      <div style={{
        marginTop: 14,
        paddingTop: 14,
        borderTop: `1px solid ${COLORS.border}`,
        color: COLORS.textSecondary,
        fontSize: "0.78rem",
      }}>
        📚 Curso: {testimonial.course}
      </div>
    </div>
  );
}

// ─── Contact / Newsletter Section ─────────────────────────────────────────────

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Conectar con API de contacto / newsletter
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" style={{
      padding: "80px 24px",
      background: COLORS.darkCard,
    }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <SectionHeader
          badge="Contacto"
          title="¿Tienes alguna pregunta?"
          subtitle="Estamos aquí para ayudarte. Escríbenos y te responderemos a la brevedad."
        />

        <div style={{
          marginTop: 48,
          background: COLORS.dark,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 16,
          padding: "36px 32px",
        }}>
          {submitted ? (
            <div style={{
              textAlign: "center",
              padding: "40px 20px",
              color: COLORS.success,
            }}>
              <div style={{ fontSize: "3rem", marginBottom: 16 }}>✅</div>
              <h3 style={{ color: COLORS.text, fontWeight: 700, marginBottom: 8 }}>
                ¡Mensaje enviado!
              </h3>
              <p style={{ color: COLORS.textMuted }}>Te responderemos pronto.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <FormField
                label="Nombre completo"
                type="text"
                placeholder="Tu nombre"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
              />
              <FormField
                label="Correo electrónico"
                type="email"
                placeholder="tu@email.com"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
              />
              <div>
                <label style={{
                  display: "block",
                  color: COLORS.textMuted,
                  fontSize: "0.85rem",
                  marginBottom: 8,
                  fontWeight: 500,
                }}>
                  Mensaje
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="¿En qué podemos ayudarte?"
                  rows={5}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: 8,
                    border: `1px solid ${COLORS.border}`,
                    background: COLORS.darkCard,
                    color: COLORS.text,
                    fontSize: "0.92rem",
                    resize: "vertical",
                    outline: "none",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                />
              </div>
              {/* TODO: Integrar servicio de email (SendGrid, etc.) */}
              <Button variant="primary" style={{ width: "100%", padding: "14px" }}>
                Enviar Mensaje ✉️
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function FormField({ label, type, placeholder, value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{
        display: "block",
        color: COLORS.textMuted,
        fontSize: "0.85rem",
        marginBottom: 8,
        fontWeight: 500,
      }}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          padding: "12px 16px",
          borderRadius: 8,
          border: `1px solid ${focused ? COLORS.primary : COLORS.border}`,
          background: COLORS.darkCard,
          color: COLORS.text,
          fontSize: "0.92rem",
          outline: "none",
          boxSizing: "border-box",
          transition: "border-color 0.2s",
        }}
      />
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const footerLinks = {
    "Plataforma": ["Cursos", "Instructores", "Certificaciones", "Empresas"],
    "Recursos": ["Blog", "Podcast", "Guías gratuitas", "Comunidad"],
    "Soporte": ["Centro de ayuda", "Contacto", "Política de privacidad", "Términos de uso"],
  };

  return (
    <footer style={{
      background: COLORS.dark,
      borderTop: `1px solid ${COLORS.border}`,
      padding: "60px 24px 24px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr repeat(3, 1fr)",
          gap: 48,
          marginBottom: 48,
        }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.1rem",
              }}>🧠</div>
              <span style={{
                fontWeight: 800,
                fontSize: "1.1rem",
                color: COLORS.text,
              }}>
                NEW<span style={{ color: COLORS.primaryLight }}>MIND</span>START
              </span>
            </div>
            <p style={{
              color: COLORS.textMuted,
              fontSize: "0.88rem",
              lineHeight: 1.7,
              maxWidth: 260,
              marginBottom: 20,
            }}>
              Transformamos vidas a través del conocimiento. Tu nueva mente comienza aquí.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {/* TODO: Agregar URLs reales de redes sociales */}
              {["𝕏", "📘", "📸", "💼"].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: COLORS.darkCard,
                    border: `1px solid ${COLORS.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    color: COLORS.textMuted,
                    transition: "all 0.2s",
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 style={{
                color: COLORS.text,
                fontWeight: 700,
                fontSize: "0.92rem",
                marginBottom: 16,
                letterSpacing: "0.5px",
              }}>
                {section}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {links.map((link) => (
                  <li key={link}>
                    {/* TODO: Agregar rutas reales */}
                    <a
                      href="#"
                      style={{
                        color: COLORS.textMuted,
                        fontSize: "0.85rem",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => e.target.style.color = COLORS.textSecondary}
                      onMouseLeave={(e) => e.target.style.color = COLORS.textMuted}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          paddingTop: 24,
          borderTop: `1px solid ${COLORS.border}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}>
          <p style={{ color: COLORS.textMuted, fontSize: "0.82rem" }}>
            © 2024 NEWMINDSTART. Todos los derechos reservados.
          </p>
          <p style={{ color: COLORS.textMuted, fontSize: "0.82rem" }}>
            Hecho con ❤️ para transformar mentes
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({ badge, title, subtitle }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: `${COLORS.primary}22`,
        border: `1px solid ${COLORS.primary}44`,
        borderRadius: 30,
        padding: "6px 16px",
        marginBottom: 16,
      }}>
        <span style={{ color: COLORS.textSecondary, fontSize: "0.82rem", fontWeight: 600 }}>
          {badge}
        </span>
      </div>
      <h2 style={{
        fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
        fontWeight: 800,
        color: COLORS.text,
        marginBottom: 12,
        letterSpacing: "-0.5px",
        lineHeight: 1.2,
      }}>
        {title}
      </h2>
      <p style={{
        color: COLORS.textMuted,
        fontSize: "1rem",
        maxWidth: 540,
        margin: "0 auto",
        lineHeight: 1.6,
      }}>
        {subtitle}
      </p>
    </div>
  );
}

// ─── Scroll to Top ────────────────────────────────────────────────────────────

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        bottom: 32,
        right: 32,
        width: 44,
        height: 44,
        borderRadius: 10,
        background: hovered
          ? `linear-gradient(135deg, ${COLORS.primaryDark}, ${COLORS.primary})`
          : `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
        border: "none",
        color: "#fff",
        fontSize: "1.1rem",
        cursor: "pointer",
        boxShadow: `0 4px 20px ${COLORS.primary}55`,
        transition: "all 0.2s ease",
        transform: hovered ? "scale(1.1)" : "scale(1)",
        zIndex: 999,
      }}
    >
      ↑
    </button>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = ["hero", "courses", "categories", "testimonials", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((obs) => obs && obs.disconnect());
  }, []);

  return (
    <div style={{
      fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
      background: COLORS.dark,
      color: COLORS.text,
      minHeight: "100vh",
      WebkitFontSmoothing: "antialiased",
    }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: ${COLORS.dark}; }
        ::selection { background: ${COLORS.primary}55; color: #fff; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${COLORS.dark}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.primary}; border-radius: 3px; }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hero-visual { display: none !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }

        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        section {
          animation: fadeInUp 0.5s ease forwards;
        }
      `}</style>

      <Navbar activeSection={activeSection} />
      <HeroSection />
      <CategoriesSection />
      <CoursesSection />
      <FeaturesSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
}