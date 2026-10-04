// NVS Landing — section components
const { useEffect, useRef, useState } = React;

/* -------- Reveal-on-scroll wrapper -------- */
function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add('in'), delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <Tag ref={ref} className={`reveal ${className}`} {...rest}>{children}</Tag>;
}

/* -------- NAV (Bootstrap navbar, collapses to a hamburger below md) -------- */
function Nav() {
  // Close the mobile menu after a link is chosen
  const closeMenu = () => {
    const menu = document.getElementById('nvs-nav-menu');
    if (menu && menu.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  };

  return (
    <div className="nav-wrap px-3">
      <nav className="navbar navbar-expand-md bg-dark nvs-navbar" data-bs-theme="dark" aria-label="Main navigation">
        <a href="#" className="navbar-brand nav-logo py-0 me-4" aria-label="NVS home">
          <img src="assets/nvs-logo.svg" alt="NVS" className="nav-logo-flag" />
        </a>
        <div className="collapse navbar-collapse order-last order-md-0" id="nvs-nav-menu">
          <ul className="navbar-nav nav-links mx-auto gap-1 mt-2 mt-md-0 pb-2 pb-md-0">
            <li className="nav-item"><a className="nav-link" href="#products" onClick={closeMenu}>Products</a></li>
            <li className="nav-item"><a className="nav-link" href="#team" onClick={closeMenu}>Company</a></li>
            <li className="nav-item"><a className="nav-link" href="#careers" onClick={closeMenu}>Careers</a></li>
            <li className="nav-item"><a className="nav-link" href="#contact" onClick={closeMenu}>Contact</a></li>
          </ul>
        </div>
        <div className="nav-cta d-flex align-items-center gap-2 ms-md-4">
          <a href="#contact" className="btn btn-primary btn-sm">Work with us</a>
          <button
            className="navbar-toggler rounded-pill"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#nvs-nav-menu"
            aria-controls="nvs-nav-menu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    </div>
  );
}

/* Shared arrow icon used inside buttons and links (decorative) */
function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 7h8m0 0L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* -------- HERO -------- */
function Hero() {
  return (
    <section className="hero container">
      <div className="panel hero-panel">
        <div className="hero-eyebrow-row d-flex align-items-center justify-content-between flex-wrap gap-2">
          <span className="eyebrow">AI-native systems</span>
          <span className="eyebrow" style={{ fontFamily: 'var(--mono)', textTransform: 'none', letterSpacing: '0.04em' }}>
            <span style={{ background: 'var(--accent)', width: 6, height: 6, borderRadius: '50%' }}></span>
            v.2026 — now shipping
          </span>
        </div>

        <h1 className="h-display hero-headline mt-0 mb-4">
          We build AI-native systems<br/>
          that <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>automate</em> real work
        </h1>

        <p className="lead hero-sub mt-0">
          From internal tools to scalable products, NVS designs and builds systems that replace manual processes and unlock faster execution.
        </p>

        <div className="hero-ctas d-flex flex-wrap gap-3">
          <a href="#products" className="btn btn-primary btn-lg">
            View products
            <ArrowIcon />
          </a>
          <a href="#contact" className="btn btn-outline-secondary btn-lg">Work with us</a>
        </div>

        <div className="hero-graph-wrap">
          <span className="hero-graph-corner" aria-hidden="true">SYS / WORKFLOW MAP</span>
          <window.HeroGraph />
          <span className="hero-graph-caption" aria-hidden="true">11 nodes · 15 edges · live</span>
        </div>
      </div>
    </section>
  );
}

/* -------- PRODUCTS -------- */
function Products() {
  const products = [
    {
      id: 1,
      mark: 'J',
      name: 'Jobescape',
      tag: 'CAREER · AI COACH',
      desc: 'A personal AI plan for landing your next role — skills tracking, daily streaks, AI assistants for interviews and outreach, and certified completion.',
      darkControls: true,
      slides: [
        { src: 'assets/jobescape.png',        alt: 'Jobescape personal plan dashboard' },
        { src: 'assets/jobescape-levels.png', alt: 'Jobescape platinum level, certification and weekly streak' },
        { src: 'assets/jobescape-streak.png', alt: 'Jobescape weekly streak tracker' },
      ],
    },
    {
      id: 2,
      mark: 'G',
      name: 'Genescape',
      tag: 'CREATIVE · IMAGE & VIDEO',
      desc: 'Pick a character, pick an app, done. A studio of AI image, video and music apps for creators — from headshots and portraits to viral video formats.',
      darkControls: false,
      slides: [
        { src: 'assets/genescape.png',         alt: 'Genescape image apps studio' },
        { src: 'assets/genescape-apps.png',    alt: 'Genescape portrait and photo app tiles' },
        { src: 'assets/genescape-gallery.png', alt: 'Genescape image and video app gallery' },
      ],
    },
  ];

  return (
    <section className="section container" id="products">
      <Reveal className="section-head d-flex align-items-end justify-content-between flex-wrap">
        <div className="section-head-text">
          <span className="eyebrow mb-3">Section 03 — Products</span>
          <h2 className="h-section mt-3">
            Our products
          </h2>
        </div>
        <p className="lead" style={{ maxWidth: '38ch' }}>
          Four pillars built to plug into how your team actually operates — independently or as one connected stack.
        </p>
      </Reveal>

      <div className="row g-4">
        {products.map((p, i) => (
          <Reveal key={p.id} delay={i * 80} className="col-sm-12 col-md-6 col-lg-6">
            <article className="card product-card p-4 p-sm-5 gap-4">
              <div className="product-card-head d-flex align-items-center justify-content-between gap-3">
                <div className="product-mark" data-i={p.id} aria-hidden="true">{p.mark}</div>
                <span className="product-tag">{p.tag}</span>
              </div>
              <h3 className="card-title h-card product-title m-0">{p.name}</h3>
              <p className="card-text product-desc m-0">{p.desc}</p>
              <ProductVis id={p.id} name={p.name} slides={p.slides} darkControls={p.darkControls} />
              <div className="card-footer product-card-foot d-flex align-items-center justify-content-between pt-3">
                <span className="muted" style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.04em' }}>
                  PRODUCT 0{p.id}
                </span>
                <a href="#" className="arrow-link">
                  Learn more
                  <ArrowIcon />
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -------- Animated clock hook -------- */
function useClock() {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf, start;
    function tick(now) {
      if (!start) start = now;
      setT((now - start) / 1000);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return t;
}

/* -------- Product visualizations — Bootstrap carousel of real product screenshots -------- */
function ProductVis({ id, name, slides, darkControls }) {
  const ref = useRef(null);
  const carouselId = `product-carousel-${id}`;

  // The page is rendered by React after Bootstrap's own load-time scan, so start the carousel here
  useEffect(() => {
    const carousel = bootstrap.Carousel.getOrCreateInstance(ref.current);
    return () => carousel.dispose();
  }, []);

  return (
    <div
      ref={ref}
      id={carouselId}
      className="product-vis product-vis-img carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="5000"
      data-bs-theme={darkControls ? 'dark' : undefined}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${name} screenshots`}
    >
      <div className="carousel-indicators">
        {slides.map((s, k) => (
          <button
            key={k}
            type="button"
            data-bs-target={`#${carouselId}`}
            data-bs-slide-to={k}
            className={k === 0 ? 'active' : ''}
            aria-current={k === 0 ? 'true' : undefined}
            aria-label={`Show ${name} screenshot ${k + 1}`}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {slides.map((s, k) => (
          <div className={`carousel-item${k === 0 ? ' active' : ''}`} key={s.src}>
            <img src={s.src} alt={s.alt} className="d-block w-100" />
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous screenshot</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next screenshot</span>
      </button>
    </div>
  );
}

/* Jobescape — week streak + progress bar */
function JobescapeVis() {
  const t = useClock();
  const days = ['M','T','W','T','F','S','S'];
  const activeIdx = Math.floor((t * 0.6) % 7);
  return (
    <div className="product-vis">
      <svg viewBox="0 0 320 140" width="100%" height="100%">
        {days.map((d, k) => {
          const x = 28 + k * 38;
          const isActive = k <= activeIdx;
          return (
            <g key={k}>
              <circle cx={x} cy={42} r={isActive ? 11 : 9}
                fill={isActive ? 'var(--accent)' : 'var(--bg-card)'}
                stroke={isActive ? 'var(--accent)' : 'var(--ink-3)'}
                strokeWidth="0.8"
              />
              {isActive && k === activeIdx && (
                <circle cx={x} cy={42} r={13 + (Math.sin(t * 4) + 1) * 3} fill="none" stroke="var(--accent)" strokeWidth="0.8" opacity={0.4}/>
              )}
              <text x={x} y={66} textAnchor="middle" fontFamily="var(--mono)" fontSize="8" fill="var(--ink-3)">{d}</text>
            </g>
          );
        })}
        <line x1="28" y1="96" x2="292" y2="96" stroke="var(--rule-2)" strokeWidth="3" strokeLinecap="round"/>
        <line x1="28" y1="96" x2={28 + (activeIdx + 1) * 38 - 10} y2="96" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="28" cy="96" r="5" fill="var(--accent)"/>
        <circle cx={28 + (activeIdx + 1) * 38 - 10} cy="96" r="5" fill="var(--accent)"/>
        <text x="28" y="122" fontFamily="var(--mono)" fontSize="9" fill="var(--ink-2)">DAY 01</text>
        <text x="292" y="122" textAnchor="end" fontFamily="var(--mono)" fontSize="9" fill="var(--ink-2)">PLATINUM</text>
      </svg>
    </div>
  );
}

/* Genescape — mosaic of app tiles, one highlighted at a time */
function GenescapeVis() {
  const t = useClock();
  const tiles = [
    { x: 16,  y: 14, w: 50, h: 56, hue: 0 },
    { x: 72,  y: 14, w: 50, h: 56, hue: 1 },
    { x: 128, y: 14, w: 50, h: 56, hue: 2 },
    { x: 184, y: 14, w: 50, h: 56, hue: 3 },
    { x: 240, y: 14, w: 64, h: 56, hue: 4 },
    { x: 16,  y: 76, w: 50, h: 50, hue: 5 },
    { x: 72,  y: 76, w: 50, h: 50, hue: 6 },
    { x: 128, y: 76, w: 64, h: 50, hue: 7 },
    { x: 198, y: 76, w: 50, h: 50, hue: 8 },
    { x: 254, y: 76, w: 50, h: 50, hue: 9 },
  ];
  const palette = ['#3a2519','#1f2a23','#1a1f2a','#2a1c2e','#2e2415','#152a2c','#3b1f2a','#1c2c1f','#1f1f2e','#2a2018'];
  const accent  = ['#D97757','#7BAF8A','#8aa1c4','#b58dc4','#d4a542','#5fb1b7','#c47d8c','#7caf6f','#7d8ec9','#c79c6a'];
  const activeIdx = Math.floor((t * 1.2) % tiles.length);
  return (
    <div className="product-vis">
      <svg viewBox="0 0 320 140" width="100%" height="100%">
        {tiles.map((tile, k) => {
          const isActive = k === activeIdx;
          return (
            <g key={k}>
              <rect x={tile.x} y={tile.y} width={tile.w} height={tile.h} rx="6"
                fill={palette[tile.hue]}
                stroke={isActive ? accent[tile.hue] : 'transparent'}
                strokeWidth="1.2"
                style={{ transition: 'stroke 0.3s ease' }}
              />
              <rect x={tile.x} y={tile.y} width={tile.w} height={tile.h * 0.5} rx="6"
                fill={accent[tile.hue]} opacity="0.18"/>
              <circle cx={tile.x + 10} cy={tile.y + 10} r="3" fill={accent[tile.hue]} opacity="0.7"/>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* Legacy vis kept (unused after product cut) */
function FlowVis() {
  const t = useClock();
  const rows = [20, 60, 100];
  return (
    <div className="product-vis">
      <svg viewBox="0 0 320 140" width="100%" height="100%">
        {rows.map((y, idx) => {
          const phase = (t * 0.45 + idx * 0.33) % 1;
          // 3 stages with 2 connector segments
          const segs = [
            { x1: 80, x2: 120 },  // after stage 1
            { x1: 180, x2: 220 }, // after stage 2
          ];
          return (
            <g key={idx} opacity={1 - idx * 0.12}>
              <rect x="20" y={y} width="60" height="20" rx="4" fill="var(--accent-tint)" stroke="var(--accent)" strokeWidth="0.8"/>
              <line x1="80" y1={y + 10} x2="120" y2={y + 10} stroke="var(--ink-3)" strokeDasharray="2 2"/>
              <rect x="120" y={y} width="60" height="20" rx="4" fill="var(--bg-card)" stroke="var(--ink-3)" strokeWidth="0.8"/>
              <line x1="180" y1={y + 10} x2="220" y2={y + 10} stroke="var(--ink-3)" strokeDasharray="2 2"/>
              <rect x="220" y={y} width="60" height="20" rx="4" fill="var(--ink)" stroke="var(--ink)" strokeWidth="0.8"/>
              {/* moving packet */}
              {(() => {
                const x = 20 + phase * 260;
                const inSeg = segs.some(s => x >= s.x1 && x <= s.x2);
                if (!inSeg) return null;
                return <circle cx={x} cy={y + 10} r="2.6" fill="var(--accent)" />;
              })()}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* Signal — animated line chart, bars rise/fall, latest point pulses */
function SignalVis() {
  const t = useClock();
  const N = 16;
  const xs = Array.from({ length: N }, (_, k) => 14 + k * (292 / (N - 1)));
  const ys = xs.map((_, k) => {
    const phase = t * 0.6 - k * 0.2;
    const v = Math.sin(phase) * 18 + Math.sin(phase * 0.5 + k) * 10;
    return 70 - v;
  });
  const path = xs.map((x, k) => `${k === 0 ? 'M' : 'L'}${x.toFixed(1)},${ys[k].toFixed(1)}`).join(' ');
  return (
    <div className="product-vis">
      <svg viewBox="0 0 320 140" width="100%" height="100%">
        {/* baseline grid */}
        {[40, 80, 120].map(y => (
          <line key={y} x1="10" y1={y} x2="310" y2={y} stroke="var(--rule-2)" strokeWidth="0.5"/>
        ))}
        <path d={path} fill="none" stroke="var(--accent)" strokeWidth="2"/>
        <path d={`${path} L${xs[N-1].toFixed(1)},130 L${xs[0].toFixed(1)},130 Z`} fill="var(--accent-tint)" opacity="0.5"/>
        {/* moving cursor at right edge */}
        <line x1={xs[N-1]} y1="20" x2={xs[N-1]} y2="130" stroke="var(--ink)" strokeWidth="0.5" strokeDasharray="2 3"/>
        <circle cx={xs[N-1]} cy={ys[N-1]} r={3.5 + Math.sin(t * 4) * 1} fill="var(--accent)" />
        <circle cx={xs[N-1]} cy={ys[N-1]} r={8 + (Math.sin(t * 4) + 1) * 4} fill="none" stroke="var(--accent)" strokeWidth="0.6" opacity={0.4}/>
      </svg>
    </div>
  );
}

/* Ops Engine — grid of cells; rolling wave activates them in sequence */
function OpsVis() {
  const t = useClock();
  const cols = 6, rows = 3;
  return (
    <div className="product-vis">
      <svg viewBox="0 0 320 140" width="100%" height="100%">
        {Array.from({ length: cols }).map((_, c) =>
          Array.from({ length: rows }).map((__, r) => {
            // wave activates a cell if (c+r) is near current wave-front
            const wave = (t * 1.6) % (cols + rows + 2);
            const dist = Math.abs((c + r) - wave);
            const active = dist < 0.7;
            const fill = active
              ? 'var(--accent)'
              : (c + r) % 5 === 0 ? 'var(--ink)' : 'var(--bg-card)';
            return (
              <rect
                key={`${c}-${r}`}
                x={20 + c * 48}
                y={20 + r * 32}
                width={40}
                height={24}
                rx={4}
                fill={fill}
                stroke="var(--ink-3)"
                strokeWidth="0.6"
                style={{ transition: 'fill 0.3s ease' }}
              />
            );
          })
        )}
      </svg>
    </div>
  );
}

/* Pulse — radar sweep + pinging satellites */
function PulseVis() {
  const t = useClock();
  const cx = 160, cy = 70;
  const sweepAngle = (t * 0.9) % (Math.PI * 2);
  const sats = [
    { angle: 0.6, r: 50 },
    { angle: 2.1, r: 36 },
    { angle: 3.8, r: 56 },
    { angle: 5.2, r: 42 },
  ];
  return (
    <div className="product-vis">
      <svg viewBox="0 0 320 140" width="100%" height="100%">
        <circle cx={cx} cy={cy} r="58" fill="none" stroke="var(--ink-3)" strokeWidth="0.5"/>
        <circle cx={cx} cy={cy} r="40" fill="none" stroke="var(--ink-3)" strokeWidth="0.5"/>
        <circle cx={cx} cy={cy} r="22" fill="none" stroke="var(--ink-3)" strokeWidth="0.5"/>
        {/* sweep wedge */}
        <defs>
          <radialGradient id="sweep-grad" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <path
          d={`M${cx},${cy} L${cx + Math.cos(sweepAngle) * 58},${cy + Math.sin(sweepAngle) * 58} A58,58 0 0 1 ${cx + Math.cos(sweepAngle - 0.5) * 58},${cy + Math.sin(sweepAngle - 0.5) * 58} Z`}
          fill="url(#sweep-grad)"
        />
        {/* satellites */}
        {sats.map((s, idx) => {
          const x = cx + Math.cos(s.angle) * s.r;
          const y = cy + Math.sin(s.angle) * s.r;
          // ping when sweep crosses near angle
          const diff = Math.abs(((sweepAngle - s.angle) + Math.PI * 2) % (Math.PI * 2));
          const ping = Math.min(diff, Math.PI * 2 - diff);
          const isPinging = ping < 0.4;
          return (
            <g key={idx}>
              <line x1={cx} y1={cy} x2={x} y2={y} stroke="var(--ink-3)" strokeWidth="0.4" opacity="0.5"/>
              {isPinging && (
                <circle cx={x} cy={y} r={4 + (1 - ping / 0.4) * 8} fill="none" stroke="var(--accent)" strokeWidth="1" opacity={1 - ping / 0.4}/>
              )}
              <circle cx={x} cy={y} r="3" fill={isPinging ? 'var(--accent)' : 'var(--ink)'}/>
            </g>
          );
        })}
        {/* core */}
        <circle cx={cx} cy={cy} r="6" fill="var(--accent)"/>
        <circle cx={cx} cy={cy} r={6 + (Math.sin(t * 3) + 1) * 3} fill="none" stroke="var(--accent)" strokeWidth="0.8" opacity="0.5"/>
      </svg>
    </div>
  );
}

/* -------- CAPABILITIES -------- */
function Capabilities() {
  const items = [
    { n: '01', title: 'AI automation systems',         desc: 'We automate repetitive work and cut operational load.' },
    { n: '02', title: 'Internal tools and platforms',  desc: 'We build custom tools that teams actually use daily.' },
    { n: '03', title: 'Data and decision systems',     desc: 'We turn data into systems that guide real decisions.' },
    { n: '04', title: 'Scalable product infrastructure', desc: 'We build foundations that grow with your business.' },
  ];

  return (
    <section className="section container" id="capabilities">
      <Reveal className="section-head d-flex align-items-end justify-content-between flex-wrap">
        <div className="section-head-text">
          <span className="eyebrow mb-3">Section 04 — Capabilities</span>
          <h2 className="h-section mt-3">What we do</h2>
        </div>
      </Reveal>
      <Reveal>
        <div className="cap-list">
          {items.map((it) => (
            <div className="cap-item" key={it.n}>
              <span className="cap-num">{it.n}</span>
              <span className="cap-title">{it.title}</span>
              <p className="cap-desc">{it.desc}</p>
              <span className="cap-arrow">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M5 10h10m0 0L10 5m5 5l-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* -------- HOW WE WORK -------- */
function HowWeWork() {
  const items = [
    'We build systems, not one-off solutions',
    'We ship fast and refine with real usage',
    'We prioritize clarity over complexity',
    'We focus on outcomes, not outputs',
  ];
  return (
    <section className="section container" id="how">
      <Reveal className="section-head d-flex align-items-end justify-content-between flex-wrap">
        <div className="section-head-text">
          <span className="eyebrow mb-3">Section 05 — Principles</span>
          <h2 className="h-section mt-3">How we work</h2>
        </div>
        <p className="lead" style={{ maxWidth: '36ch' }}>
          Four principles we keep coming back to. They shape what we say yes to — and what we don't.
        </p>
      </Reveal>
      <Reveal>
        <div className="row g-0 how-grid">
          {items.map((t, i) => (
            <div className="col-12 col-md-6 how-cell d-flex flex-column gap-3" key={i}>
              <span className="how-cell-num">— 0{i + 1}</span>
              <p className="how-cell-text">{t}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* -------- SOCIAL PROOF -------- */
function SocialProof() {
  const logos = ['Northwind', 'Atlas', 'Lumen', 'Helix', 'Verge', 'Orbit'];
  return (
    <section className="section container" id="proof">
      <Reveal>
        <div className="panel proof-panel text-center">
          <span className="eyebrow mb-4">Section 06 — Trust</span>
          <h2 className="h-section proof-title mt-3 mb-5 mx-auto">
            Trusted by teams<br/>building <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>real</em> products
          </h2>

          <div className="metrics">
            <div className="row g-4">
              <div className="col-12 col-md-4 metric text-center">
                <div className="metric-num"><span className="accent">50+</span></div>
                <p className="metric-label mx-auto my-0">Systems delivered to production</p>
              </div>
              <div className="col-12 col-md-4 metric text-center">
                <div className="metric-num">Fast-growing</div>
                <p className="metric-label mx-auto my-0">Used by teams scaling 3–10×</p>
              </div>
              <div className="col-12 col-md-4 metric text-center">
                <div className="metric-num"><span className="accent">M+</span></div>
                <p className="metric-label mx-auto my-0">Automated actions processed monthly</p>
              </div>
            </div>
          </div>

          <div className="row g-4 align-items-center logo-row">
            {logos.map(l => (
              <div className="col-4 col-md-2" key={l}>
                <div className="logo-placeholder">{l}</div>
              </div>
            ))}
          </div>
          <p className="muted mt-4" style={{ fontSize: 12, fontFamily: 'var(--mono)', letterSpacing: '0.04em' }}>
            CLIENT LOGOS — PLACEHOLDER
          </p>
        </div>
      </Reveal>
    </section>
  );
}

/* -------- CASE STUDIES -------- */
function CaseStudies() {
  const cases = [
    { n: '01', tag: 'E-commerce operations',  metric: <><>70<span className="small">%</span></></>, desc: 'Automated internal workflows and reduced manual processing time by 70%.' },
    { n: '02', tag: 'Product team',           metric: <><>5<span className="small">+</span></></>, desc: 'Built internal tools that replaced 5+ disconnected systems.' },
    { n: '03', tag: 'Data workflows',         metric: <><>sec<span className="small d-block mt-1" style={{ fontSize: 18 }}>was hours</span></></>, desc: 'Implemented real-time decision system reducing response time from hours to seconds.' },
  ];
  return (
    <section className="section container" id="cases">
      <Reveal className="section-head d-flex align-items-end justify-content-between flex-wrap">
        <div className="section-head-text">
          <span className="eyebrow mb-3">Section 07 — Case studies</span>
          <h2 className="h-section mt-3">What we've built</h2>
        </div>
      </Reveal>
      <div className="row g-4">
        {cases.map((c, i) => (
          <Reveal key={c.n} delay={i * 80} className="col-sm-12 col-md-6 col-lg-4 d-flex">
            <article className="card case-card w-100 h-100 gap-4">
              <span className="case-num">CASE {c.n}</span>
              <h3 className="card-title case-tag m-0">{c.tag}</h3>
              <div className="case-metric">{c.metric}</div>
              <p className="card-text case-desc m-0">{c.desc}</p>
              <div className="card-footer case-foot pt-3">
                <a href="#" className="arrow-link">
                  Read the case
                  <ArrowIcon />
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -------- TEAM -------- */
function Team() {
  const team = [
    { i: 1, role: 'Head of Product Engineering at NVS',  name: 'Alex Kim',   tone: 'warm' },
    { i: 2, role: 'Head of Systems Design at NVS',        name: 'Sara Chen',  tone: 'sage' },
    { i: 3, role: 'Lead AI Infrastructure at NVS',        name: 'Daniel Lee', tone: 'slate' },
    { i: 4, role: 'Head of Operations at NVS',            name: 'Nina Patel', tone: 'plum' },
    { i: 5, role: 'Senior Product Engineer at NVS',       name: 'Jordan Rios', tone: 'ochre' },
    { i: 6, role: 'Staff Designer at NVS',                name: 'Mira Solis',  tone: 'teal' },
  ];

  const railRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      const p = max > 0 ? el.scrollLeft / max : 0;
      setProgress(p);
      setAtStart(el.scrollLeft <= 4);
      setAtEnd(el.scrollLeft >= max - 4);
    };
    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollBy = (dir) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector('.team-card');
    const step = card ? card.getBoundingClientRect().width + 24 : 300;
    el.scrollBy({ left: dir * step * 1.5, behavior: 'smooth' });
  };

  return (
    <section className="section container team-section" id="team">
      <Reveal>
        <div className="team-panel">
          <div className="team-intro text-center mx-auto">
            <span className="eyebrow mb-4">Section 08 — Team</span>
            <h2 className="h-section mt-0 mb-4">The team building NVS</h2>
            <p className="lead mx-auto my-0">
              Small by design. Senior by default. We bring together engineers, designers, and operators who care about shipping systems that actually get used.
            </p>
            <div className="btn-cta mt-4">
              <a href="#careers" className="btn btn-light">
                Open roles
                <ArrowIcon />
              </a>
            </div>
          </div>

          <div className="team-rail-wrap">
            <div className="team-rail d-flex gap-4" ref={railRef}>
              {team.map((m, idx) => (
                <article className="card team-card border-0" key={m.name}>
                  <div className="team-portrait card-img" role="img" aria-label={`Portrait of ${m.name}`}>
                    <PortraitVis tone={m.tone} idx={idx} />
                  </div>
                  <div className="card-img-overlay team-card-overlay">
                    <div>
                      <h3 className="card-title team-card-role mt-0 mb-1">{m.role}</h3>
                      <p className="card-text team-card-name m-0">{m.name}</p>
                    </div>
                    <div className="team-card-arrow" aria-hidden="true">
                      <ArrowIcon />
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="team-rail-foot d-flex align-items-center justify-content-between gap-4">
              <div className="team-progress flex-grow-1" aria-hidden="true">
                <div className="team-progress-bar" style={{ width: `${30 + progress * 70}%`, transform: `translateX(${progress * 200}%)` }} />
              </div>
              <div className="team-controls btn-group gap-2" role="group" aria-label="Team carousel controls">
                <button type="button" className="btn btn-outline-secondary team-ctrl rounded-circle ms-0" onClick={() => scrollBy(-1)} disabled={atStart} aria-label="Previous team members">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M11 7H3m0 0l3.5-3.5M3 7l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button type="button" className="btn btn-outline-secondary team-ctrl rounded-circle ms-0" onClick={() => scrollBy(1)} disabled={atEnd} aria-label="Next team members">
                  <ArrowIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* Stylized portrait placeholders — abstract, animated, on-brand. Drop in real photos by replacing this component. */
function PortraitVis({ tone, idx }) {
  const t = useClock();
  const palettes = {
    warm:  { bg: '#3a2519', mid: '#7a4a30', hi: '#D97757', skin: '#e8b696' },
    sage:  { bg: '#1f2a23', mid: '#3e5a48', hi: '#7BAF8A', skin: '#d9c4a8' },
    slate: { bg: '#1a1f2a', mid: '#384458', hi: '#8aa1c4', skin: '#cbb39a' },
    plum:  { bg: '#2a1c2e', mid: '#4d3552', hi: '#b58dc4', skin: '#e0c4b0' },
    ochre: { bg: '#2e2415', mid: '#5d4720', hi: '#d4a542', skin: '#dcb594' },
    teal:  { bg: '#152a2c', mid: '#2c5256', hi: '#5fb1b7', skin: '#cdb4a0' },
  };
  const p = palettes[tone] || palettes.warm;
  const phase = Math.sin(t * 0.5 + idx) * 4;

  return (
    <svg viewBox="0 0 280 380" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`bg-${idx}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={p.bg}/>
          <stop offset="100%" stopColor={p.mid}/>
        </linearGradient>
        <radialGradient id={`light-${idx}`} cx="0.3" cy="0.25" r="0.7">
          <stop offset="0%" stopColor={p.hi} stopOpacity="0.4"/>
          <stop offset="100%" stopColor={p.hi} stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="280" height="380" fill={`url(#bg-${idx})`} />
      <rect width="280" height="380" fill={`url(#light-${idx})`} />

      {/* shoulders */}
      <path d={`M -20 380 Q 60 ${260 + phase} 140 ${265 + phase} Q 220 ${260 + phase} 300 380 Z`}
        fill={p.mid} opacity="0.95"/>
      <path d={`M 50 380 Q 95 ${300 + phase * 0.5} 140 ${290 + phase * 0.5} Q 185 ${300 + phase * 0.5} 230 380 Z`}
        fill={p.bg}/>

      {/* head silhouette */}
      <ellipse cx={140 + phase * 0.3} cy={170 + phase * 0.2} rx="58" ry="72" fill={p.skin} opacity="0.95"/>
      {/* hair / shadow on top */}
      <path d={`M ${82 + phase * 0.3} ${150 + phase * 0.2} Q ${140 + phase * 0.3} ${85 + phase * 0.2} ${198 + phase * 0.3} ${150 + phase * 0.2} Q ${190 + phase * 0.3} ${120 + phase * 0.2} ${140 + phase * 0.3} ${108 + phase * 0.2} Q ${90 + phase * 0.3} ${120 + phase * 0.2} ${82 + phase * 0.3} ${150 + phase * 0.2} Z`}
        fill={p.bg} opacity="0.85"/>
      {/* face shadow */}
      <ellipse cx={158 + phase * 0.3} cy={180 + phase * 0.2} rx="40" ry="60" fill={p.bg} opacity="0.18"/>

      {/* subtle film grain via dots */}
      {Array.from({ length: 40 }).map((_, k) => {
        const x = (k * 53.7) % 280;
        const y = (k * 91.3) % 380;
        return <circle key={k} cx={x} cy={y} r="0.5" fill="#fff" opacity="0.06"/>;
      })}

      {/* highlight scan line */}
      <rect
        x="0"
        y={((t * 60) % 460) - 80}
        width="280"
        height="40"
        fill={p.hi}
        opacity="0.04"
      />
    </svg>
  );
}

/* -------- CAREERS -------- */
function Careers() {
  return (
    <section className="section container" id="careers">
      <Reveal>
        <div className="panel careers-panel">
          <div className="row g-5 align-items-center">
            <div className="col-12 col-lg-7">
              <span className="eyebrow">Section 09 — Careers</span>
              <h2 className="h-section mt-3 mb-4">Join NVS</h2>
              <p className="lead careers-lead">
                We're building systems that change how work gets done. If you care about speed, clarity, and real impact — you'll fit here.
              </p>
              <a href="#" className="btn btn-primary btn-lg">
                View open roles
                <ArrowIcon />
              </a>
            </div>
            <div className="col-12 col-lg-5">
              <div className="careers-art" aria-hidden="true">
                <div className="careers-art-grid"></div>
                <div className="careers-art-text">
                  build<br/>
                  <span className="accent">real</span><br/>
                  things
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* -------- FINAL CTA -------- */
function FinalCTA() {
  return (
    <section className="section container" id="contact">
      <Reveal>
        <div className="panel final-panel text-center">
          <div className="final-bg-pattern"></div>
          <div className="position-relative">
            <span className="eyebrow final-eyebrow mb-4">
              <span style={{ background: 'var(--accent)', width: 6, height: 6, borderRadius: '50%' }}></span>
              Section 10 — Let's talk
            </span>
            <h2 className="h-display mt-4 mb-0 mx-auto" style={{ maxWidth: '14ch' }}>
              Let's build<br/>
              something <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>real</em>
            </h2>
            <p className="lead mt-4 mx-auto">
              Tell us what you're working on — we'll help you turn it into a system that scales.
            </p>
            <a href="#" className="btn btn-primary btn-lg">
              Work with us
              <ArrowIcon />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* -------- FOOTER -------- */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="row g-5">
          <div className="col-6 col-lg-5">
            <div className="footer-brand">
              <div className="nav-logo" style={{ color: 'var(--ink)' }}>
                <img src="assets/nvs-logo.svg" alt="NVS" className="nav-logo-flag" style={{ height: 26, width: 52 }} />
              </div>
              <p className="footer-tag mt-3">
                AI-native systems that automate real work. Built for teams who care about outcomes.
              </p>
            </div>
          </div>
          <nav className="col-6 col-lg footer-col" aria-label="Products">
            <h4 className="footer-col-title mt-0 mb-3">Products</h4>
            <ul className="list-unstyled d-flex flex-column gap-2 m-0">
              <li><a href="#">Jobescape</a></li>
              <li><a href="#">Genescape</a></li>
            </ul>
          </nav>
          <nav className="col-6 col-lg footer-col" aria-label="Company">
            <h4 className="footer-col-title mt-0 mb-3">Company</h4>
            <ul className="list-unstyled d-flex flex-column gap-2 m-0">
              <li><a href="#">About</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#cases">Case studies</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
          <nav className="col-6 col-lg footer-col" aria-label="Connect">
            <h4 className="footer-col-title mt-0 mb-3">Connect</h4>
            <ul className="list-unstyled d-flex flex-column gap-2 m-0">
              <li><a href="#">hello@nvs.team</a></li>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">X / Twitter</a></li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="footer-bottom d-flex justify-content-between align-items-center">
        <span>© NVS</span>
        <span className="footer-mono">NVS / 2026 / SHIPPING</span>
      </div>
    </footer>
  );
}

Object.assign(window, {
  Reveal, Nav, Hero, Products, Capabilities, HowWeWork,
  SocialProof, CaseStudies, Team, Careers, FinalCTA, Footer,
});
