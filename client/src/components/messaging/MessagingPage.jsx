import { useState, useEffect } from 'react';
import { useSocket } from '../../context/SocketContext';
import api from '../../api';

export default function MessagingPage() {
  const { socket } = useSocket();
  const [activeView, setActiveView] = useState('rooms');
  const [activeRoom, setActiveRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => { fetchRooms(); }, []);

  useEffect(() => {
    if (!socket) return;
    if (activeView === 'room' && activeRoom) {
      socket.emit('join-room', { roomId: activeRoom._id });
      socket.on('new-room-message', msg => setMessages(prev => [...prev, msg]));
    }
    return () => { socket.off('new-room-message'); };
  }, [socket, activeView, activeRoom]);

  const fetchRooms = async () => {
    try {
      const data = await api.messages.rooms();
      setRooms(data);
    } catch (err) { console.error(err); }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!socket || !input.trim() || !activeRoom) return;
    socket.emit('send-room-message', { roomId: activeRoom._id, senderId: 'current', content: input });
    setMessages(prev => [...prev, { _id: Date.now(), content: input, sender: { name: 'You' } }]);
    setInput('');
  };

  const handleSelectRoom = (room) => {
    setActiveRoom(room);
    setActiveView('room');
    setMessages([]);
  };

  const voteOptions = [
    { text: 'Generative AI Systems', votes: 64, color: 'bg-primary-container' },
    { text: 'Web3 Infrastructure', votes: 22, color: 'bg-on-surface-variant/30' },
    { text: 'Low-level OS Dev', votes: 14, color: 'bg-on-surface-variant/30' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <span className="text-label-sm text-primary-container">TERMINAL</span>
        <h1 className="text-headline-lg font-mono text-on-surface mt-1">Messages</h1>
      </div>

      <div className="flex h-[calc(100vh-16rem)] gap-4">
        <div className="w-64 flex-shrink-0 glass-card rounded-xl p-3 space-y-1 overflow-y-auto">
          <div className="text-label-sm text-on-surface-variant px-2 mb-2">PUBLIC CHANNELS</div>
          {rooms.map(room => (
            <button key={room._id} onClick={() => handleSelectRoom(room)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono transition-all ${
                activeRoom?._id === room._id ? 'bg-primary-container/15 text-primary-container' : 'text-on-surface-variant hover:bg-white/5 hover:text-on-surface'
              }`}>
              <span className="text-primary-container">#</span>
              {room.name}
              {room.name === 'leapx-code' && <span className="w-2 h-2 rounded-full bg-secondary-container ml-auto" />}
            </button>
          ))}
          <div className="text-label-sm text-on-surface-variant px-2 mt-4 mb-2">DIRECT MESSAGES</div>
          {['AX', 'SK', 'MR'].map((initials, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/5 transition-all">
              <div className="w-6 h-6 rounded-full bg-primary-container/20 flex items-center justify-center text-[10px] font-mono text-primary-container">{initials}</div>
              <span className="text-xs font-mono text-on-surface-variant">{['Alex Chen', 'Sarah Kim', 'Marcus Reed'][i]}</span>
              <span className={`w-2 h-2 rounded-full ml-auto ${i < 2 ? 'bg-secondary-container' : 'bg-outline-variant'}`} />
            </div>
          ))}
        </div>

        <div className="flex-1 glass-card rounded-xl flex flex-col">
          {activeView === 'rooms' ? (
            <div className="flex items-center justify-center h-full text-on-surface-variant font-mono text-sm">
              Select a channel to start messaging
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
                <span className="text-primary-container text-sm">#</span>
                <span className="text-sm font-mono font-semibold text-on-surface">{activeRoom?.name}</span>
                <span className="text-xs text-on-surface-variant font-mono ml-auto">1,248 members active</span>
                <button className="text-on-surface-variant hover:text-primary-container"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg></button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-10">
                    <div className="text-on-surface-variant font-mono text-sm">Start the conversation in #{activeRoom?.name}</div>
                  </div>
                )}

                {messages.length === 0 && activeRoom?.name !== 'General' && (
                  <div className="glass-card rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center text-xs font-mono text-primary-container">josh_stack</span>
                      <span className="text-xs font-mono text-on-surface-variant">josh_stack</span>
                      <span className="text-[10px] text-outline">2h ago</span>
                    </div>
                    <p className="text-sm text-on-surface font-sans">Hey team! The hackathon submissions are looking incredible this year. Make sure to check the guidelines before Friday.</p>
                  </div>
                )}

                {activeRoom?.name === 'General' && (
                  <>
                    <div className="glass-card rounded-xl p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center text-xs font-mono text-primary-container">josh_stack</span>
                        <span className="text-xs font-mono text-on-surface-variant">josh_stack</span>
                        <span className="text-[10px] text-outline">2h ago</span>
                      </div>
                      <p className="text-sm text-on-surface font-sans">Next hackathon theme poll is live! Cast your vote below 🎯</p>
                      
                      <div className="bg-surface-low rounded-lg p-4 space-y-3 border border-white/5">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-mono font-semibold text-on-surface">Next Hackathon Theme?</span>
                          <span className="text-xs text-on-surface-variant font-mono">Ends in 2h 15m</span>
                        </div>
                        {voteOptions.map((opt, i) => (
                          <button key={i} className="w-full relative h-10 rounded-lg bg-surface border border-white/5 overflow-hidden hover:border-primary-container/50 transition-all group">
                            <div className={`absolute inset-0 ${opt.color} opacity-20`} style={{ width: `${opt.votes}%` }} />
                            <div className="relative flex items-center justify-between h-full px-3">
                              <span className="text-xs font-mono text-on-surface">{opt.text}</span>
                              <span className="text-xs font-mono text-on-surface-variant">{opt.votes}%</span>
                            </div>
                          </button>
                        ))}
                        <button className="text-xs font-mono text-primary-container border border-primary-container/30 px-3 py-1 rounded-lg hover:bg-primary-container/10">Vote Now</button>
                      </div>
                    </div>

                    <div className="glass-card rounded-xl p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center text-xs font-mono text-primary-container">sys</span>
                        <span className="text-xs font-mono text-on-surface-variant" style={{ color: '#c3f400' }}>sys</span>
                        <span className="text-[10px] text-outline">1h ago</span>
                      </div>
                      <p className="text-sm text-on-surface font-sans">📢 CyberNexus Workshop is happening this Friday at 4 PM in Lab 7. RSVP to secure your spot!</p>
                      <div className="flex gap-2 mt-2">
                        <button className="text-xs font-mono text-secondary-container border border-secondary-container/30 px-3 py-1 rounded-lg hover:bg-secondary-container/10">✓ Accept</button>
                        <button className="text-xs font-mono text-error border border-error/30 px-3 py-1 rounded-lg hover:bg-error/10">✗ Decline</button>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <span className="text-[10px] font-mono text-on-surface-variant bg-surface-low px-3 py-1 rounded-full border border-white/5">
                        Terminal bot updated channel permissions
                      </span>
                    </div>

                    <div className="glass-card rounded-xl p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center text-xs font-mono text-primary-container">elara_dev</span>
                        <span className="text-xs font-mono text-primary-container">elara_dev</span>
                        <span className="text-[10px] text-outline">30m ago</span>
                      </div>
                      <p className="text-sm text-on-surface font-sans">Just deployed the new async handler:</p>
                      <pre className="bg-surface-low rounded-lg p-3 text-xs font-mono text-primary-container overflow-x-auto border border-white/5">
                        <code>{`async function deploySystem() {\n  const phase = await getCurrentPhase();\n  return phase === 'READY' ? deploy() : halt();\n}`}</code>
                      </pre>
                    </div>
                  </>
                )}
              </div>

              <form onSubmit={handleSend} className="p-3 border-t border-white/5">
                <div className="flex items-center gap-2 bg-surface-low rounded-lg px-3 py-2 border border-white/5">
                  <button type="button" className="text-on-surface-variant hover:text-primary-container"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42z"/></svg></button>
                  <button type="button" className="text-on-surface-variant hover:text-primary-container"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"/></svg></button>
                  <span className="text-[10px] font-mono text-primary-container bg-primary-container/10 px-2 py-0.5 rounded">Markdown Active</span>
                  <input type="text" value={input} onChange={e => setInput(e.target.value)}
                    placeholder={`Message #${activeRoom?.name || 'channel'}...`}
                    className="flex-1 bg-transparent text-sm text-on-surface placeholder-on-surface-variant focus:outline-none font-sans" />
                  <button type="button" className="text-on-surface-variant hover:text-primary-container"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg></button>
                  <button type="submit" className="text-on-primary bg-primary-container rounded-lg p-1.5 hover:brightness-110 transition-all">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
