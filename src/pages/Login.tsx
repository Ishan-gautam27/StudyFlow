import { ArrowRight, Eye, EyeOff, Loader } from 'lucide-react';
import React, { useState } from 'react';
import { currentUser } from '../data/apps';
import { usePortalStore } from '../store/portalStore';

const Login: React.FC = () => {
  const { login } = usePortalStore();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setError(''); setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    login(currentUser);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(108,142,245,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(108,142,245,0.05) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #6C8EF5, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #2DD4BF, transparent 70%)' }} />

      <div className="relative z-10 w-full max-w-sm animate-slide-up">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-accent mx-auto flex items-center justify-center mb-4">
            <span className="text-2xl font-mono font-bold text-white">U</span>
          </div>
          <h1 className="text-xl font-semibold text-bright">UniPortal</h1>
          <p className="text-sm text-dim mt-1">Campus Operating System</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse-dot" />
            <span className="text-xs font-mono text-dim">All systems operational</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
          <p className="text-xs font-mono text-dim mb-5 uppercase tracking-widest">Student Sign In</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-dim">University Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@university.edu" className="w-full bg-base border border-border focus:border-accent rounded-xl px-3.5 py-2.5 text-sm text-bright placeholder-muted outline-none transition-colors" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-dim">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-base border border-border focus:border-accent rounded-xl px-3.5 py-2.5 text-sm text-bright placeholder-muted outline-none transition-colors pr-10" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-dim transition-colors">
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
            {error && <p className="text-xs text-red font-mono bg-red/5 border border-red/20 rounded-lg px-3 py-2">{error}</p>}
            <button type="submit" disabled={loading} className="w-full py-2.5 bg-accent hover:bg-accent-bright disabled:opacity-60 rounded-xl text-sm font-semibold text-white transition-all flex items-center justify-center gap-2 mt-2">
              {loading ? <><Loader size={14} className="animate-spin" />Signing in…</> : <>Sign In<ArrowRight size={14} /></>}
            </button>
          </form>
          <div className="mt-5 pt-4 border-t border-border text-center">
            <p className="text-xs text-muted">Trouble logging in? Contact <span className="text-accent cursor-pointer hover:underline">IT Helpdesk</span></p>
          </div>
        </div>
        <div className="mt-4 bg-accent/5 border border-accent/20 rounded-xl px-4 py-3 text-center">
          <p className="text-xs font-mono text-dim">Demo mode — any email + password works</p>
        </div>
        <p className="text-center text-xs font-mono text-muted mt-6">UniPortal v2.0 · Docker + React</p>
      </div>
    </div>
  );
};

export default Login;