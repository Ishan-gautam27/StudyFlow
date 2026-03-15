import { gsap } from 'gsap';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePortalStore } from '../../store/portalStore';
import { MiniApp } from '../../types';
import './MagicBento.css';

const DEFAULT_PARTICLE_COUNT  = 10;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR       = '108, 142, 245';
const MOBILE_BREAKPOINT        = 768;

/* ── Helpers ────────────────────────────────────────── */

const createParticleElement = (x: number, y: number, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position:absolute;width:4px;height:4px;border-radius:50%;
    background:rgba(${color},1);box-shadow:0 0 6px rgba(${color},0.6);
    pointer-events:none;z-index:100;left:${x}px;top:${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius: number) => ({
  proximity:    radius * 0.5,
  fadeDistance: radius * 0.75,
});

const updateCardGlowProperties = (
  card: HTMLElement,
  mouseX: number, mouseY: number,
  glow: number, radius: number
) => {
  const rect     = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left)  / rect.width)  * 100;
  const relativeY = ((mouseY - rect.top)   / rect.height) * 100;
  card.style.setProperty('--glow-x',         `${relativeX}%`);
  card.style.setProperty('--glow-y',         `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius',    `${radius}px`);
};

/* ── ParticleCard ───────────────────────────────────── */

interface ParticleCardProps {
  children:          React.ReactNode;
  className?:        string;
  disableAnimations?: boolean;
  style?:            React.CSSProperties;
  particleCount?:    number;
  glowColor?:        string;
  enableTilt?:       boolean;
  clickEffect?:      boolean;
  enableMagnetism?:  boolean;
  onClick?:          () => void;
}

const ParticleCard: React.FC<ParticleCardProps> = ({
  children, className = '', disableAnimations = false,
  style, particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR, enableTilt = true,
  clickEffect = false, enableMagnetism = false, onClick,
}) => {
  const cardRef               = useRef<HTMLDivElement>(null);
  const particlesRef          = useRef<HTMLElement[]>([]);
  const timeoutsRef           = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isHoveredRef          = useRef(false);
  const memoizedParticles     = useRef<HTMLElement[]>([]);
  const particlesInitialized  = useRef(false);
  const magnetismAnimRef      = useRef<gsap.core.Tween | null>(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimRef.current?.kill();
    particlesRef.current.forEach(p => {
      gsap.to(p, {
        scale: 0, opacity: 0, duration: 0.3, ease: 'back.in(1.7)',
        onComplete: () => { p.parentNode?.removeChild(p); },
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    if (!particlesInitialized.current) initializeParticles();

    memoizedParticles.current.forEach((particle, index) => {
      const tid = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const clone = particle.cloneNode(true) as HTMLElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);
        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
        gsap.to(clone, { x: (Math.random()-0.5)*100, y: (Math.random()-0.5)*100, rotation: Math.random()*360, duration: 2+Math.random()*2, ease: 'none', repeat: -1, yoyo: true });
        gsap.to(clone, { opacity: 0.3, duration: 1.5, ease: 'power2.inOut', repeat: -1, yoyo: true });
      }, index * 100);
      timeoutsRef.current.push(tid);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;
    const el = cardRef.current;

    const onEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
      if (enableTilt) gsap.to(el, { rotateX: 5, rotateY: 5, duration: 0.3, ease: 'power2.out', transformPerspective: 1000 });
    };

    const onLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();
      if (enableTilt)      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.3, ease: 'power2.out' });
      if (enableMagnetism) gsap.to(el, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
    };

    const onMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      const cx = rect.width / 2,       cy = rect.height / 2;
      if (enableTilt) gsap.to(el, { rotateX: ((y-cy)/cy)*-10, rotateY: ((x-cx)/cx)*10, duration: 0.1, ease: 'power2.out', transformPerspective: 1000 });
      if (enableMagnetism) { magnetismAnimRef.current = gsap.to(el, { x: (x-cx)*0.05, y: (y-cy)*0.05, duration: 0.3, ease: 'power2.out' }); }
    };

    const onClick = (e: MouseEvent) => {
      if (!clickEffect) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      const maxD = Math.max(Math.hypot(x,y), Math.hypot(x-rect.width,y), Math.hypot(x,y-rect.height), Math.hypot(x-rect.width,y-rect.height));
      const ripple = document.createElement('div');
      ripple.style.cssText = `position:absolute;width:${maxD*2}px;height:${maxD*2}px;border-radius:50%;background:radial-gradient(circle,rgba(${glowColor},0.4) 0%,rgba(${glowColor},0.2) 30%,transparent 70%);left:${x-maxD}px;top:${y-maxD}px;pointer-events:none;z-index:1000;`;
      el.appendChild(ripple);
      gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => ripple.remove() });
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('mousemove',  onMove);
    el.addEventListener('click',      onClick);

    return () => {
      isHoveredRef.current = false;
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('mousemove',  onMove);
      el.removeEventListener('click',      onClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

  return (
    <div
      ref={cardRef}
      className={`${className} particle-container`}
      style={{ ...style, position: 'relative', overflow: 'hidden' }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

/* ── GlobalSpotlight ────────────────────────────────── */

interface GlobalSpotlightProps {
  gridRef:            React.RefObject<HTMLDivElement | null>;
  disableAnimations?: boolean;
  enabled?:           boolean;
  spotlightRadius?:   number;
  glowColor?:         string;
}

const GlobalSpotlight: React.FC<GlobalSpotlightProps> = ({
  gridRef, disableAnimations = false, enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS, glowColor = DEFAULT_GLOW_COLOR,
}) => {
  const spotlightRef    = useRef<HTMLDivElement | null>(null);
  const isInsideSection = useRef(false);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement('div') as HTMLDivElement;
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `
      position:fixed;width:600px;height:600px;border-radius:50%;pointer-events:none;
      background:radial-gradient(circle,rgba(${glowColor},0.12) 0%,rgba(${glowColor},0.06) 20%,rgba(${glowColor},0.03) 35%,rgba(${glowColor},0.01) 55%,transparent 70%);
      z-index:200;opacity:0;transform:translate(-50%,-50%);mix-blend-mode:screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const onMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;
      const section = gridRef.current.closest('.bento-section');
      const rect    = section?.getBoundingClientRect();
      const inside  = !!(rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom);
      isInsideSection.current = inside;

      const cards = gridRef.current.querySelectorAll<HTMLElement>('.magic-bento-card');

      if (!inside) {
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' });
        cards.forEach(c => c.style.setProperty('--glow-intensity', '0'));
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach(card => {
        const r  = card.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const d  = Math.max(0, Math.hypot(e.clientX - cx, e.clientY - cy) - Math.max(r.width, r.height) / 2);
        minDistance = Math.min(minDistance, d);
        const gi = d <= proximity ? 1 : d <= fadeDistance ? (fadeDistance - d) / (fadeDistance - proximity) : 0;
        updateCardGlowProperties(card, e.clientX, e.clientY, gi, spotlightRadius);
      });

      gsap.to(spotlightRef.current, { left: e.clientX, top: e.clientY, duration: 0.1, ease: 'power2.out' });
      const targetOpacity = minDistance <= proximity ? 0.8 : minDistance <= fadeDistance ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8 : 0;
      gsap.to(spotlightRef.current, { opacity: targetOpacity, duration: targetOpacity > 0 ? 0.2 : 0.5, ease: 'power2.out' });
    };

    const onLeave = () => {
      isInsideSection.current = false;
      gridRef.current?.querySelectorAll<HTMLElement>('.magic-bento-card').forEach(c => c.style.setProperty('--glow-intensity', '0'));
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' });
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

/* ── BentoCard content ──────────────────────────────── */

const BentoCardContent: React.FC<{ app: MiniApp }> = ({ app }) => (
  <>
    <div className="magic-bento-card__header">
      <span className="magic-bento-card__label">{app.category.replace('-', ' ')}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {app.new && <span className="magic-bento-card__new-badge">new</span>}
        {app.type === 'external' && <span className="magic-bento-card__external-icon">↗</span>}
        <span className={`magic-bento-card__status-dot magic-bento-card__status-dot--${app.status}`} />
      </div>
    </div>
    <div className="magic-bento-card__content">
      <span className="magic-bento-card__icon">{app.icon}</span>
      <h2 className="magic-bento-card__title">{app.name}</h2>
      <p className="magic-bento-card__description">{app.description}</p>
    </div>
  </>
);

/* ── MagicBento (main export) ───────────────────────── */

interface MagicBentoProps {
  apps:               MiniApp[];
  textAutoHide?:      boolean;
  enableStars?:       boolean;
  enableSpotlight?:   boolean;
  enableBorderGlow?:  boolean;
  disableAnimations?: boolean;
  spotlightRadius?:   number;
  particleCount?:     number;
  enableTilt?:        boolean;
  glowColor?:         string;
  clickEffect?:       boolean;
  enableMagnetism?:   boolean;
}

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

const MagicBento: React.FC<MagicBentoProps> = ({
  apps,
  textAutoHide      = true,
  enableStars       = true,
  enableSpotlight   = true,
  enableBorderGlow  = true,
  disableAnimations = false,
  spotlightRadius   = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount     = DEFAULT_PARTICLE_COUNT,
  enableTilt        = false,
  glowColor         = DEFAULT_GLOW_COLOR,
  clickEffect       = true,
  enableMagnetism   = true,
}) => {
  const gridRef              = useRef<HTMLDivElement>(null);
  const isMobile             = useMobileDetection();
  const shouldDisable        = disableAnimations || isMobile;
  const { openApp }          = usePortalStore();

  const baseClass = (extra = '') =>
    `magic-bento-card${textAutoHide ? ' magic-bento-card--text-autohide' : ''}${enableBorderGlow ? ' magic-bento-card--border-glow' : ''} ${extra}`.trim();

  return (
    <>
      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisable}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <div className="card-grid bento-section" ref={gridRef}>
        {apps.map((app, i) => {
          const cardStyle: React.CSSProperties = {
            backgroundColor: '#131720',
            '--glow-color':  glowColor,
          } as React.CSSProperties;

          if (enableStars) {
            return (
              <ParticleCard
                key={app.id}
                className={baseClass()}
                style={cardStyle}
                disableAnimations={shouldDisable}
                particleCount={particleCount}
                glowColor={glowColor}
                enableTilt={enableTilt}
                clickEffect={clickEffect}
                enableMagnetism={enableMagnetism}
                onClick={() => openApp(app)}
              >
                <BentoCardContent app={app} />
              </ParticleCard>
            );
          }

          return (
            <div
              key={app.id}
              className={baseClass()}
              style={cardStyle}
              onClick={() => openApp(app)}
            >
              <BentoCardContent app={app} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MagicBento;