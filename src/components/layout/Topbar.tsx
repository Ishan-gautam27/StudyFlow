import { ArrowLeft, ExternalLink, Maximize2, Moon, RefreshCw, Search, Sun } from 'lucide-react';
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { usePortalStore } from '../../store/portalStore';

const Topbar: React.FC = () => {
  const { openSearch, activeApp, closeApp, currentPage } = usePortalStore();
  const { isDark, toggle } = useTheme();

  return (
    <header
      className="flex items-center h-14 px-4 gap-4 flex-shrink-0 z-10"
      style={{ background: 'var(--topbar-bg)', borderBottom: '1px solid var(--border)' }}
    >
      {/* Left */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {activeApp ? (
          <>
            <button
              onClick={closeApp}
              className="flex items-center gap-1.5 transition-colors hover:opacity-80"
              style={{ color: 'var(--text-dim)' }}
            >
              <ArrowLeft size={15} />
              <span className="text-xs">Dashboard</span>
            </button>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-sm flex-shrink-0">{activeApp.icon}</span>
              <span className="text-sm font-medium truncate" style={{ color: 'var(--text-bright)' }}>{activeApp.name}</span>
              <span className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium flex-shrink-0
                ${activeApp.status === 'online'   ? 'bg-green/10 text-green' :
                  activeApp.status === 'degraded' ? 'bg-amber/10 text-amber' : 'bg-red/10 text-red'}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${
                  activeApp.status === 'online'   ? 'bg-green animate-pulse-dot' :
                  activeApp.status === 'degraded' ? 'bg-amber' : 'bg-red'
                }`} />
                {activeApp.status}
              </span>
            </div>
          </>
        ) : (
          <span className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
            {currentPage === 'profile' ? '~/profile' : '~/dashboard'}
          </span>
        )}
      </div>

      {/* Center: URL bar */}
      {activeApp?.url && activeApp.type === 'iframe' && (
        <div className="flex items-center gap-2 rounded-lg px-3 py-1.5 max-w-xs w-full"
          style={{ background: 'var(--bg-base)', border: '1px solid var(--border)' }}>
          <span className="w-2 h-2 rounded-full bg-green flex-shrink-0" />
          <span className="text-[11px] font-mono truncate flex-1" style={{ color: 'var(--text-dim)' }}>{activeApp.url}</span>
        </div>
      )}

      {/* Right */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {activeApp?.type === 'iframe' && (
          <>
            <button
              onClick={() => {
                const iframe = document.getElementById('app-iframe') as HTMLIFrameElement;
                if (iframe) { const src = iframe.src; iframe.src = ''; iframe.src = src; }
              }}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
              style={{ background: 'var(--border)', color: 'var(--text-dim)' }}
              title="Reload"
            >
              <RefreshCw size={13} />
            </button>
            <button
              onClick={() => activeApp.url && window.open(activeApp.url, '_blank')}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
              style={{ background: 'var(--border)', color: 'var(--text-dim)' }}
              title="Open in new tab"
            >
              <ExternalLink size={13} />
            </button>
            <button
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
              style={{ background: 'var(--border)', color: 'var(--text-dim)' }}
              title="Fullscreen"
            >
              <Maximize2 size={13} />
            </button>
            <div className="w-px h-5 mx-1" style={{ background: 'var(--border)' }} />
          </>
        )}

        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:opacity-80 relative overflow-hidden"
          style={{ background: 'var(--border)', color: 'var(--text-dim)' }}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <span key={isDark ? 'moon' : 'sun'} className="animate-theme-in">
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </span>
        </button>

        {/* Search */}
        <button
          onClick={openSearch}
          className="flex items-center gap-2 rounded-lg px-3 h-8 transition-all hover:opacity-80"
          style={{ background: 'var(--bg-base)', border: '1px solid var(--border)', color: 'var(--text-dim)' }}
        >
          <Search size={13} />
          <span className="text-xs hidden sm:block">Search apps</span>
          <kbd className="hidden sm:flex items-center text-[10px] font-mono px-1 py-0.5 rounded ml-1"
            style={{ background: 'var(--border)' }}>
            ⌘K
          </kbd>
        </button>
      </div>
    </header>
  );
};

export default Topbar;