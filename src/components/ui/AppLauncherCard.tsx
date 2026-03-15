import { ExternalLink, Lock } from 'lucide-react';
import React from 'react';
import { usePortalStore } from '../../store/portalStore';
import { MiniApp } from '../../types';

interface Props { app: MiniApp; }

const AppLauncherCard: React.FC<Props> = ({ app }) => {
  const { openApp } = usePortalStore();
  const isComingSoon = app.type === 'coming-soon';

  return (
    <button
      onClick={() => !isComingSoon && openApp(app)}
      disabled={isComingSoon}
      className={`relative group flex flex-col p-4 rounded-xl text-left transition-all duration-200 overflow-hidden w-full
        ${isComingSoon ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:-translate-y-0.5'}`}
      style={{
        background:  'var(--bg-card)',
        border:      '1px solid var(--border)',
        boxShadow:   'var(--shadow-card)',
      }}
    >
      {/* Hover tint */}
      {!isComingSoon && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse at top left, ${app.color}0D 0%, transparent 70%)` }}
        />
      )}

      {/* Icon + badges */}
      <div className="flex items-start justify-between mb-3 relative z-10">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          style={{ background: app.bgColor, border: '1px solid var(--border)' }}
        >
          {app.icon}
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
          {app.new && !isComingSoon && (
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-accent/15 text-accent uppercase tracking-wide">
              new
            </span>
          )}
          {app.type === 'external'  && <ExternalLink size={11} style={{ color: 'var(--text-muted)' }} />}
          {isComingSoon             && <Lock          size={11} style={{ color: 'var(--text-muted)' }} />}
          {app.type === 'iframe'    && (
            <span className={`w-2 h-2 rounded-full ${
              app.status === 'online'   ? 'bg-green animate-pulse-dot' :
              app.status === 'degraded' ? 'bg-amber' : 'bg-muted'
            }`} />
          )}
        </div>
      </div>

      {/* Text */}
      <div className="relative z-10">
        <p className="text-sm font-semibold leading-none mb-1.5 transition-colors"
          style={{ color: isComingSoon ? 'var(--text-muted)' : 'var(--text-bright)' }}>
          {app.name}
        </p>
        <p className="text-[11px] leading-snug line-clamp-2" style={{ color: 'var(--text-dim)' }}>
          {isComingSoon ? 'Coming soon' : app.description}
        </p>
      </div>

      {/* Bottom accent */}
      {!isComingSoon && (
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: `linear-gradient(90deg, ${app.color}99, transparent)` }}
        />
      )}
    </button>
  );
};

export default AppLauncherCard;