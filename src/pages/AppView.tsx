import { AlertTriangle, ExternalLink, RefreshCw } from 'lucide-react';
import React, { useState } from 'react';
import { usePortalStore } from '../store/portalStore';

const AppView: React.FC = () => {
  const { activeApp, closeApp } = usePortalStore();
  const [loading, setLoading]   = useState(true);
  const [errored, setErrored]   = useState(false);

  if (!activeApp) return null;

  // External link interstitial
  if (activeApp.type === 'external') {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-sm w-full bg-card border border-border rounded-2xl p-8 text-center animate-scale-in">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5 border border-border"
            style={{ background: activeApp.bgColor }}
          >
            {activeApp.icon}
          </div>
          <h2 className="text-lg font-semibold text-bright mb-2">{activeApp.name}</h2>
          <p className="text-sm text-dim mb-2">{activeApp.description}</p>
          <div className="flex items-center justify-center gap-2 mb-6">
            <AlertTriangle size={12} className="text-amber flex-shrink-0" />
            <p className="text-xs text-dim font-mono break-all">{activeApp.url}</p>
          </div>
          <p className="text-xs text-muted mb-6">
            This is an external service not hosted on UniPortal. You'll be taken to the official university system in a new tab.
          </p>
          <div className="flex gap-3">
            <button
              onClick={closeApp}
              className="flex-1 py-2.5 rounded-xl border border-border text-sm text-dim hover:text-soft hover:bg-border/50 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={() => { window.open(activeApp.url, '_blank', 'noopener,noreferrer'); closeApp(); }}
              className="flex-1 py-2.5 rounded-xl bg-accent hover:bg-accent-bright text-white text-sm font-medium transition-all flex items-center justify-center gap-2"
            >
              <ExternalLink size={14} />
              Open
            </button>
          </div>
        </div>
      </div>
    );
  }

  // iframe app
  return (
    <div className="flex-1 relative overflow-hidden">
      {/* Loading shimmer */}
      {loading && !errored && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10" style={{ background: '#0D0F14' }}>
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border border-border"
            style={{ background: activeApp.bgColor }}
          >
            {activeApp.icon}
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm font-medium text-soft">Loading {activeApp.name}…</p>
            <p className="text-[11px] font-mono text-muted">{activeApp.url}</p>
          </div>
          <div className="flex gap-1.5 mt-2">
            {[0,1,2].map(i => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot"
                style={{ animationDelay: `${i * 200}ms` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Error state */}
      {errored && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10" style={{ background: '#0D0F14' }}>
          <div className="w-14 h-14 rounded-2xl bg-red/10 border border-red/20 flex items-center justify-center">
            <AlertTriangle size={24} className="text-red" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-bright mb-1">Can't reach {activeApp.name}</p>
            <p className="text-xs text-dim font-mono mb-1">{activeApp.url}</p>
            <p className="text-xs text-muted">The service may be down or not running on this port.</p>
          </div>
          <div className="flex gap-3 mt-2">
            <button
              onClick={closeApp}
              className="px-4 py-2 rounded-xl border border-border text-sm text-dim hover:text-soft transition-all"
            >
              Go back
            </button>
            <button
              onClick={() => { setErrored(false); setLoading(true); }}
              className="px-4 py-2 rounded-xl bg-accent/10 border border-accent/30 text-sm text-accent hover:bg-accent/20 transition-all flex items-center gap-2"
            >
              <RefreshCw size={13} />
              Retry
            </button>
          </div>
        </div>
      )}

      {/* The actual iframe */}
      {!errored && (
        <iframe
          id="app-iframe"
          src={activeApp.url}
          title={activeApp.name}
          className="w-full h-full border-0"
          onLoad={() => setLoading(false)}
          onError={() => { setLoading(false); setErrored(true); }}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
      )}
    </div>
  );
};

export default AppView;