import { ArrowRight, ExternalLink, Search, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { apps } from '../../data/apps';
import { usePortalStore } from '../../store/portalStore';
import { MiniApp } from '../../types';

const GlobalSearch: React.FC = () => {
  const { searchOpen, searchQuery, setSearchQuery, closeSearch, openApp } = usePortalStore();
  const [highlighted, setHighlighted] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results: MiniApp[] = searchQuery.trim().length < 1
    ? apps.filter(a => a.pinned).slice(0, 6)
    : apps.filter(a =>
        a.type !== 'coming-soon' && (
          a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      ).slice(0, 8);

  useEffect(() => {
    if (searchOpen) { setTimeout(() => inputRef.current?.focus(), 50); setHighlighted(0); }
  }, [searchOpen]);

  useEffect(() => { setHighlighted(0); }, [searchQuery]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!searchOpen) {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); usePortalStore.getState().openSearch(); }
        return;
      }
      if (e.key === 'Escape')    { closeSearch(); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); setHighlighted(h => Math.min(h + 1, results.length - 1)); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setHighlighted(h => Math.max(h - 1, 0)); }
      if (e.key === 'Enter' && results[highlighted]) { openApp(results[highlighted]); closeSearch(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [searchOpen, results, highlighted, closeSearch, openApp]);

  if (!searchOpen) return null;

  const handleSelect = (app: MiniApp) => { openApp(app); closeSearch(); };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
      onClick={closeSearch}
    >
      <div className="w-full max-w-xl mx-4 animate-scale-in" onClick={e => e.stopPropagation()}>

        {/* Input */}
        <div className="flex items-center gap-3 rounded-xl px-4 py-3"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-bright)', boxShadow: 'var(--shadow-card)' }}>
          <Search size={16} style={{ color: 'var(--text-dim)' }} className="flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search apps, tools, services…"
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: 'var(--text-bright)' }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} style={{ color: 'var(--text-muted)' }} className="hover:opacity-80 transition-opacity">
              <X size={14} />
            </button>
          )}
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded flex-shrink-0"
            style={{ background: 'var(--border)', color: 'var(--text-dim)' }}>ESC</kbd>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-2 rounded-xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
            {!searchQuery && (
              <p className="text-[10px] font-mono px-4 pt-3 pb-1 uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                Pinned apps
              </p>
            )}
            {results.map((app, i) => (
              <button
                key={app.id}
                onClick={() => handleSelect(app)}
                onMouseEnter={() => setHighlighted(i)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
                style={{ background: highlighted === i ? 'var(--border)' : 'transparent' }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                  style={{ background: app.bgColor, border: '1px solid var(--border)' }}>
                  {app.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: 'var(--text-bright)' }}>{app.name}</p>
                  <p className="text-[11px] truncate" style={{ color: 'var(--text-dim)' }}>{app.description}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[10px] px-2 py-0.5 rounded-full capitalize"
                    style={{ background: app.bgColor, color: app.color }}>
                    {app.category.replace('-', ' ')}
                  </span>
                  {app.type === 'external'
                    ? <ExternalLink size={12} style={{ color: 'var(--text-dim)' }} />
                    : <ArrowRight   size={12} style={{ color: 'var(--text-dim)' }} />
                  }
                </div>
              </button>
            ))}
          </div>
        )}

        {searchQuery && results.length === 0 && (
          <div className="mt-2 rounded-xl px-4 py-8 text-center"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text-dim)' }}>
              No apps found for "<span style={{ color: 'var(--text-soft)' }}>{searchQuery}</span>"
            </p>
          </div>
        )}

        <p className="text-center text-[10px] font-mono mt-3" style={{ color: 'var(--text-muted)' }}>
          ↑↓ navigate · enter open · esc close
        </p>
      </div>
    </div>
  );
};

export default GlobalSearch;