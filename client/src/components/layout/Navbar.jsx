import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { id: 'directory', label: 'Directory', icon: 'groups' },
  { id: 'faculty', label: 'Faculty', icon: 'school' },
  { id: 'campus', label: 'Campus Life', icon: 'event_upcoming' },
  { id: 'governance', label: 'Governance', icon: 'gavel' },
  { id: 'clubs', label: 'Clubs', icon: 'diversity_3' },
  { id: 'titles', label: 'Titles', icon: 'workspace_premium' },
  { id: 'leaderboard', label: 'Leaderboard', icon: 'leaderboard' },
  { id: 'messaging', label: 'Messages', icon: 'forum' },
  { id: 'resume', label: 'Resume', icon: 'description' },
  { id: 'books', label: 'Books', icon: 'menu_book' },
  { id: 'resources', label: 'Resources', icon: 'lab_profile' },
];

const iconMap = {
  groups: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
  school: 'M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z',
  event_upcoming: 'M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z',
  gavel: 'M1 21h12v2H1v-2zM5.24 8.07l2.83-2.83 14.14 14.14-2.83 2.83L5.24 8.07zM12.32 1l5.66 5.66-2.83 2.83-5.66-5.66L12.32 1zM3.83 9.48l5.66 5.66-2.83 2.83L1 12.31l2.83-2.83z',
  diversity_3: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z',
  workspace_premium: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  leaderboard: 'M7.5 21H2V9h5.5v12zm7.25 0H9.25V3h5.5v18zm7.25 0H16.5V13h5.5v8z',
  forum: 'M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z',
  description: 'M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z',
  menu_book: 'M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.5.85.15.1.3.15.5.15.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zM6.5 18c-1.1 0-2.63.25-4 .85V6.5c1.35-.6 2.9-1 4-1 1.1 0 2.65.4 4 1v12.35c-1.35-.6-2.9-.85-4-.85zM20 18.85c-1.37-.6-2.9-.85-4-.85-1.1 0-2.65.4-4 1V6.5c1.35-.6 2.9-1 4-1 1.1 0 2.65.4 4 1v12.35z',
  lab_profile: 'M21 21v-2H3v2h18zM13.5 3h-3C9.67 3 9 3.67 9 4.5V11H5.5c-.83 0-1.5.67-1.5 1.5v1c0 .83.67 1.5 1.5 1.5h13c.83 0 1.5-.67 1.5-1.5v-1c0-.83-.67-1.5-1.5-1.5H15V4.5c0-.83-.67-1.5-1.5-1.5zM13 11h-2V6h2v5z',
};

function SvgIcon({ path, size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d={path} />
    </svg>
  );
}

export default function Navbar({ activeTab, onNavigate }) {
  const { user, isAuthenticated, login, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(loginEmail, loginPassword);
      setShowLogin(false);
      setLoginError('');
    } catch (err) {
      setLoginError('Invalid credentials');
    }
  };

  return (
    <>
      <TopNav
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onNavigate={onNavigate}
        isAuthenticated={isAuthenticated}
        user={user}
        logout={logout}
        setShowLogin={setShowLogin}
      />
      <SideNav
        activeTab={activeTab}
        onNavigate={(tab) => { onNavigate(tab); setMobileMenuOpen(false); }}
        isAuthenticated={isAuthenticated}
        user={user}
        logout={logout}
        setShowLogin={setShowLogin}
        mobileMenuOpen={mobileMenuOpen}
      />

      {showLogin && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setShowLogin(false)}>
          <div className="glass-card rounded-xl p-6 w-80 border-primary-container/30" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-mono font-semibold text-primary-container mb-4">&gt; Authentication Required</h2>
            <form onSubmit={handleLogin} className="space-y-3">
              <input
                type="email"
                placeholder="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="input-glass w-full text-sm font-sans"
                required
              />
              <input
                type="password"
                placeholder="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="input-glass w-full text-sm font-sans"
                required
              />
              {loginError && <p className="text-error text-xs">{loginError}</p>}
              <button type="submit" className="w-full bg-primary-container text-on-primary rounded-lg py-3 font-mono font-medium hover:brightness-110 transition-all text-sm">
                &gt; authenticate
              </button>
            </form>
            <p className="text-outline text-xs mt-3 text-center font-mono">
              Demo: admin@college.edu / admin123
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function TopNav({ mobileMenuOpen, setMobileMenuOpen, onNavigate, isAuthenticated, user, logout, setShowLogin }) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-40 glass-card rounded-none border-b border-white/10 border-t-0 border-l-0 border-r-0">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button className="md:hidden text-on-surface" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              {mobileMenuOpen
                ? <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                : <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              }
            </svg>
          </button>
          <button onClick={() => onNavigate('directory')} className="flex items-center gap-2">
            <span className="text-lg font-mono font-bold text-primary-container tracking-tight">KINETIC_ACADEMY</span>
            <span className="hidden sm:inline-block text-[10px] font-mono text-on-surface-variant border border-outline-variant/30 rounded px-2 py-0.5">v2.4.9</span>
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1 bg-surface-low rounded-lg p-0.5 border border-white/5">
            {['directory', 'faculty', 'campus'].map(tab => (
              <button key={tab} onClick={() => onNavigate(tab)}
                className="px-3 py-1.5 text-xs font-mono rounded-md transition-all text-on-surface-variant hover:text-on-surface">
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="w-px h-6 bg-white/10" />
          <button className="text-on-surface-variant hover:text-primary-container transition-colors" title="Notifications">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
            </svg>
          </button>
          <button className="text-on-surface-variant hover:text-primary-container transition-colors" title="Settings">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
            </svg>
          </button>
          {isAuthenticated ? (
            <button onClick={logout} className="text-xs text-on-surface-variant hover:text-error font-mono transition-colors" title="Logout">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
              </svg>
            </button>
          ) : (
            <button onClick={() => setShowLogin(true)} className="text-xs border border-primary-container/30 text-primary-container px-3 py-1.5 rounded-lg hover:bg-primary-container/10 transition-all font-mono">
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

function SideNav({ activeTab, onNavigate, isAuthenticated, user, logout, setShowLogin, mobileMenuOpen }) {
  return (
    <>
      <aside className={`fixed top-16 left-0 bottom-0 w-64 z-30 bg-surface-dim/95 backdrop-blur-xl border-r border-white/5 overflow-y-auto transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center border border-primary-container/30">
              <span className="text-primary-container font-mono font-bold text-sm">K</span>
            </div>
            <div>
              <div className="text-sm font-mono font-semibold text-on-surface">OPERATOR_01</div>
              <div className="text-[10px] font-mono text-primary-container">Rank: Elite</div>
            </div>
          </div>
        </div>

        <nav className="p-3 space-y-0.5">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all ${
                activeTab === item.id
                  ? 'bg-primary-container/15 text-primary-container font-medium'
                  : 'text-on-surface-variant hover:bg-white/5 hover:text-on-surface'
              }`}
            >
              <span className="w-5 h-5 flex items-center justify-center">
                <SvgIcon path={iconMap[item.icon]} size={18} />
              </span>
              <span className="font-mono text-xs">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
          <button
            onClick={() => onNavigate('directory')}
            className="w-full py-2.5 rounded-lg bg-primary-container text-on-primary font-mono text-xs font-medium hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
            </svg>
            DEPLOY SYSTEM
          </button>
          <div className="flex items-center justify-between mt-3 text-xs">
            {isAuthenticated ? (
              <button onClick={logout} className="text-outline hover:text-on-surface-variant transition-colors font-mono flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                </svg>
                Logout
              </button>
            ) : (
              <button onClick={() => setShowLogin(true)} className="text-outline hover:text-on-surface-variant transition-colors font-mono">Login</button>
            )}
            <a href="#" className="text-outline hover:text-on-surface-variant transition-colors font-mono">Docs</a>
          </div>
        </div>
      </aside>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}
    </>
  );
}
