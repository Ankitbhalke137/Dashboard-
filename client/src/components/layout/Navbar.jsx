import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const tabs = [
  { id: 'directory', label: 'Directory', icon: '👥' },
  { id: 'faculty', label: 'Faculty', icon: '👨‍🏫' },
  { id: 'campus', label: 'Campus Life', icon: '🎉' },
  { id: 'governance', label: 'Governance', icon: '⚖️' },
  { id: 'clubs', label: 'Clubs', icon: '🏛️' },
  { id: 'titles', label: 'Titles', icon: '🏅' },
  { id: 'leaderboard', label: 'Leaderboard', icon: '📊' },
  { id: 'messaging', label: 'Chat', icon: '💬' },
  { id: 'resume', label: 'Resume', icon: '📄' },
  { id: 'books', label: 'Books', icon: '📚' },
  { id: 'resources', label: 'Resources', icon: '🛠️' },
];

export default function Navbar({ activeTab, onNavigate }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user, isAuthenticated, login, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

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
      <nav className={`${collapsed ? 'w-16' : 'w-56'} transition-all duration-300 bg-dark-600 border-r border-neon-green/20 flex flex-col relative`}>
        <div className="p-3 border-b border-neon-green/20 flex items-center justify-between">
          {!collapsed && (
            <span className="neon-text font-bold text-sm tracking-wider">~/portal</span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-neon-green hover:text-white transition-colors text-lg"
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 border-l-2 ${
                activeTab === tab.id
                  ? 'bg-neon-green/10 border-neon-green text-neon-green shadow-[inset_0_0_10px_rgba(0,255,65,0.1)]'
                  : 'border-transparent text-gray-400 hover:text-white hover:bg-dark-700'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              {!collapsed && <span className="font-mono">{tab.label}</span>}
            </button>
          ))}
        </div>

        <div className="p-3 border-t border-neon-green/20">
          {isAuthenticated ? (
            <div className="text-xs text-gray-500">
              {!collapsed && (
                <div className="mb-2 truncate">{user?.email}</div>
              )}
              <button
                onClick={logout}
                className="text-neon-green/60 hover:text-neon-green transition-colors"
              >
                {collapsed ? '🚪' : '> logout'}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="text-neon-green/60 hover:text-neon-green transition-colors text-xs"
            >
              {collapsed ? '🔑' : '> login'}
            </button>
          )}
        </div>
      </nav>

      {showLogin && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setShowLogin(false)}>
          <div className="bg-dark-600 p-6 rounded neon-border w-80" onClick={(e) => e.stopPropagation()}>
            <h2 className="neon-text text-lg mb-4 font-mono">&gt; Authentication Required</h2>
            <form onSubmit={handleLogin} className="space-y-3">
              <input
                type="email"
                placeholder="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-dark-700 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:border-neon-green focus:outline-none font-mono"
                required
              />
              <input
                type="password"
                placeholder="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-dark-700 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:border-neon-green focus:outline-none font-mono"
                required
              />
              {loginError && <p className="text-red-500 text-xs">{loginError}</p>}
              <button
                type="submit"
                className="w-full bg-neon-green/20 border border-neon-green text-neon-green py-2 rounded hover:bg-neon-green/30 transition-colors font-mono text-sm"
              >
                &gt; authenticate
              </button>
            </form>
            <p className="text-gray-600 text-xs mt-3 text-center font-mono">
              Demo: admin@college.edu / admin123
            </p>
          </div>
        </div>
      )}
    </>
  );
}
