import { useState, useEffect, useRef } from 'react';
import { useSocket } from '../../context/SocketContext';
import api from '../../api';

export default function MessagingPage() {
  const { socket } = useSocket();
  const [activeView, setActiveView] = useState('rooms');
  const [activeRoom, setActiveRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // useEffect moved below definition

  useEffect(() => {
    if (!socket) return;
    if (activeView === 'room' && activeRoom) {
      socket.emit('join-room', { roomId: activeRoom._id });
      socket.on('new-room-message', msg => setMessages(prev => [...prev, msg]));
    }
    return () => { socket.off('new-room-message'); };
  }, [socket, activeView, activeRoom]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    api.messages.rooms().then(setRooms).catch(err => console.error(err));
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || !activeRoom) return;
    if (socket) {
      socket.emit('send-room-message', { roomId: activeRoom._id, senderId: 'current', content: input });
    }
    setMessages(prev => [...prev, { _id: Date.now(), content: input, sender: { name: 'You' }, createdAt: new Date().toISOString() }]);
    setInput('');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && activeRoom) {
      const fileMsg = `📁 Uploaded file: ${file.name}`;
      if (socket) {
        socket.emit('send-room-message', { roomId: activeRoom._id, senderId: 'current', content: fileMsg });
      }
      setMessages(prev => [...prev, { _id: Date.now(), content: fileMsg, sender: { name: 'You' }, createdAt: new Date().toISOString() }]);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const addEmoji = (emoji) => {
    setInput(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleSelectRoom = (room) => {
    setActiveRoom(room);
    setActiveView('room');
    setMessages([]);
    setShowSearch(false);
    setShowSettings(false);
  };

  const voteOptions = [
    { text: 'Generative AI Systems', votes: 64, color: 'bg-primary-container' },
    { text: 'Web3 Infrastructure', votes: 22, color: 'bg-on-surface-variant/30' },
    { text: 'Low-level OS Dev', votes: 14, color: 'bg-on-surface-variant/30' },
  ];

  const formatTime = (isoString) => {
    if (!isoString) return 'Just now';
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div>
        <h1 className="text-headline-lg font-mono text-on-surface pt-12">Messages</h1>
      </div>

      <div className="flex h-[calc(100vh-14rem)] gap-6">
        {/* Sidebar */}
        <div className="w-72 flex-shrink-0 glass-card rounded-2xl p-4 space-y-2 overflow-y-auto border border-white/10 shadow-xl backdrop-blur-xl bg-white/5">
          <div className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant px-2 mb-3 mt-1">Public Channels</div>
          {rooms.map(room => (
            <button key={room._id} onClick={() => handleSelectRoom(room)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-sans font-medium transition-all duration-300 ${
                activeRoom?._id === room._id 
                  ? 'bg-primary-container text-on-primary shadow-[0_0_15px_rgba(0,219,233,0.3)]' 
                  : 'text-on-surface-variant hover:bg-white/10 hover:text-on-surface'
              }`}>
              <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${activeRoom?._id === room._id ? 'bg-black/20 text-white' : 'bg-surface-low text-primary-container'}`}>
                <span className="font-mono text-lg">#</span>
              </div>
              <span className="truncate">{room.name}</span>
              {room.name === 'General' && <span className="w-2 h-2 rounded-full bg-secondary-container ml-auto shadow-[0_0_8px_rgba(195,244,0,0.8)]" />}
            </button>
          ))}
          
          <div className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant px-2 mt-6 mb-3">Direct Messages</div>
          {['Alex Chen', 'Sarah Kim', 'Marcus Reed'].map((name, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-white/10 transition-all duration-300 group">
              <div className="relative">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name.replace(' ', '')}`} alt={name} className="w-8 h-8 rounded-full bg-surface-low object-cover border border-white/10 group-hover:border-primary-container/50 transition-colors" />
                <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#121212] ${i < 2 ? 'bg-secondary-container shadow-[0_0_8px_rgba(195,244,0,0.8)]' : 'bg-outline-variant'}`} />
              </div>
              <span className="text-sm font-sans font-medium text-on-surface-variant group-hover:text-on-surface transition-colors">{name}</span>
            </div>
          ))}
        </div>

        {/* Chat Area */}
        <div className="flex-1 glass-card rounded-2xl flex flex-col border border-white/10 shadow-2xl overflow-hidden relative backdrop-blur-xl bg-white/5">
          {/* Subtle Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
             <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-primary-container rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse-slow"></div>
             <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-secondary-container rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          </div>

          {activeView === 'rooms' ? (
            <div className="flex flex-col items-center justify-center h-full text-on-surface-variant z-10 space-y-4">
              <div className="w-20 h-20 rounded-full bg-surface-low border border-white/10 flex items-center justify-center text-4xl shadow-inner">
                💬
              </div>
              <p className="font-mono text-sm">Select a channel to start messaging</p>
            </div>
          ) : (
            <div className="flex flex-col h-full z-10">
              {/* Chat Header */}
              <div className="flex items-center gap-4 px-6 py-4 border-b border-white/10 bg-black/20 backdrop-blur-md">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary-container border border-primary-container/30">
                   <span className="font-mono text-xl">#</span>
                </div>
                <div>
                  <h2 className="text-base font-sans font-bold text-on-surface tracking-wide">{activeRoom?.name}</h2>
                  <p className="text-xs text-on-surface-variant font-mono mt-0.5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse"></span>
                    1,248 members active
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-3 relative">
                  {showSearch && (
                    <div className="absolute right-full mr-2 flex items-center bg-[#1A1A1A] border border-white/10 rounded-full px-3 py-1 animate-[fadeInUp_0.2s_ease-out]">
                      <input 
                        type="text" 
                        autoFocus
                        placeholder="Search messages..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent text-sm text-white placeholder-white/40 focus:outline-none w-48 font-sans"
                      />
                    </div>
                  )}
                  <button onClick={() => setShowSearch(!showSearch)} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border ${showSearch ? 'bg-primary-container/20 text-primary-container border-primary-container/30' : 'bg-white/5 hover:bg-primary-container/20 text-on-surface-variant hover:text-primary-container border-transparent hover:border-primary-container/30'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </button>
                  <div className="relative">
                    <button onClick={() => setShowSettings(!showSettings)} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border ${showSettings ? 'bg-primary-container/20 text-primary-container border-primary-container/30' : 'bg-white/5 hover:bg-primary-container/20 text-on-surface-variant hover:text-primary-container border-transparent hover:border-primary-container/30'}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
                    </button>
                    
                    {showSettings && (
                      <div className="absolute right-0 mt-2 w-48 bg-[#1A1A1A] border border-white/10 rounded-xl py-2 shadow-2xl z-50 animate-[fadeInUp_0.2s_ease-out]">
                        <button className="w-full text-left px-4 py-2 text-sm text-on-surface-variant hover:bg-white/5 hover:text-primary-container transition-colors flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                          Notifications
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-on-surface-variant hover:bg-white/5 hover:text-primary-container transition-colors flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                          Copy Link
                        </button>
                        <div className="h-px bg-white/10 my-1"></div>
                        <button className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error/10 transition-colors flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                          Leave Channel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
                {messages.length === 0 && (
                  <div className="text-center py-10 opacity-60">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-on-surface-variant">
                      Start of conversation in #{activeRoom?.name}
                    </div>
                  </div>
                )}

                {/* Legacy Mock Messages Rendering (for demonstration) */}
                {messages.length === 0 && activeRoom?.name !== 'General' && (
                  <div className="flex gap-4 animate-[fadeInUp_0.5s_ease-out]">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=josh" alt="josh_stack" className="w-10 h-10 rounded-full border border-white/10 shadow-sm" />
                    <div className="flex flex-col items-start gap-1 max-w-[80%]">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-bold font-sans text-primary-container">josh_stack</span>
                        <span className="text-[10px] text-on-surface-variant font-mono">2h ago</span>
                      </div>
                      <div className="bg-surface-low border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 shadow-md">
                        <p className="text-sm text-on-surface font-sans leading-relaxed">Hey team! The hackathon submissions are looking incredible this year. Make sure to check the guidelines before Friday.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* General Channel Mock State */}
                {activeRoom?.name === 'General' && messages.length === 0 && (
                  <>
                    {/* Message 1: Poll */}
                    <div className="flex gap-4 animate-[fadeInUp_0.5s_ease-out]">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=josh" alt="josh_stack" className="w-10 h-10 rounded-full border border-white/10 shadow-sm" />
                      <div className="flex flex-col items-start gap-1 w-full max-w-xl">
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-bold font-sans text-primary-container">josh_stack</span>
                          <span className="text-[10px] text-on-surface-variant font-mono">2h ago</span>
                        </div>
                        <div className="bg-surface-low border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 shadow-md w-full space-y-4">
                          <p className="text-sm text-on-surface font-sans">Next hackathon theme poll is live! Cast your vote below 🎯</p>
                          
                          <div className="bg-black/30 rounded-xl p-4 space-y-3 border border-white/5">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-mono font-bold text-on-surface">Next Hackathon Theme?</span>
                              <span className="text-[10px] text-secondary-container font-mono bg-secondary-container/10 px-2 py-0.5 rounded-full border border-secondary-container/20">Ends in 2h 15m</span>
                            </div>
                            <div className="space-y-2">
                              {voteOptions.map((opt, i) => (
                                <button key={i} className="w-full relative h-10 rounded-lg bg-surface border border-white/10 overflow-hidden hover:border-primary-container transition-all group">
                                  <div className={`absolute left-0 top-0 bottom-0 ${opt.color} opacity-20`} style={{ width: `${opt.votes}%` }} />
                                  <div className="relative flex items-center justify-between h-full px-4">
                                    <span className="text-sm font-sans font-medium text-on-surface">{opt.text}</span>
                                    <span className="text-xs font-mono font-bold text-on-surface-variant">{opt.votes}%</span>
                                  </div>
                                </button>
                              ))}
                            </div>
                            <div className="pt-2">
                              <button className="w-full text-xs font-mono font-bold text-black bg-primary-container hover:bg-[#00e5f5] py-2.5 rounded-lg transition-colors shadow-lg">Submit Vote</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Message 2: System alert */}
                    <div className="flex gap-4 animate-[fadeInUp_0.5s_ease-out]" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                      <div className="w-10 h-10 rounded-full border border-secondary-container/50 bg-secondary-container/10 flex items-center justify-center text-secondary-container shadow-[0_0_10px_rgba(195,244,0,0.2)]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      </div>
                      <div className="flex flex-col items-start gap-1 max-w-[80%]">
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-bold font-sans text-secondary-container">sys_admin</span>
                          <span className="text-[10px] text-on-surface-variant font-mono">1h ago</span>
                        </div>
                        <div className="bg-secondary-container/5 border border-secondary-container/20 rounded-2xl rounded-tl-sm px-4 py-3 shadow-md">
                          <p className="text-sm text-on-surface font-sans">📢 CyberNexus Workshop is happening this Friday at 4 PM in Lab 7. RSVP to secure your spot!</p>
                          <div className="flex gap-3 mt-3">
                            <button className="text-xs font-sans font-bold text-black bg-secondary-container hover:brightness-110 px-4 py-1.5 rounded-full shadow-lg transition-all">✓ Accept</button>
                            <button className="text-xs font-sans font-bold text-error border border-error/50 bg-error/10 hover:bg-error/20 px-4 py-1.5 rounded-full transition-all">✗ Decline</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="flex justify-center my-6">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/5">
                        Terminal bot updated channel permissions
                      </span>
                    </div>

                    {/* Message 3: Code Snippet */}
                    <div className="flex gap-4 animate-[fadeInUp_0.5s_ease-out]" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=elara" alt="elara_dev" className="w-10 h-10 rounded-full border border-white/10 shadow-sm" />
                      <div className="flex flex-col items-start gap-1 max-w-[80%]">
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-bold font-sans text-[#FF9900]">elara_dev</span>
                          <span className="text-[10px] text-on-surface-variant font-mono">30m ago</span>
                        </div>
                        <div className="bg-surface-low border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 shadow-md w-full">
                          <p className="text-sm text-on-surface font-sans mb-2">Just deployed the new async handler:</p>
                          <div className="relative group">
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="bg-white/10 hover:bg-white/20 p-1.5 rounded text-xs text-white backdrop-blur-md border border-white/20">Copy</button>
                            </div>
                            <pre className="bg-[#0D0D0D] rounded-xl p-4 text-xs font-mono text-primary-container overflow-x-auto border border-white/5 shadow-inner">
                              <code><span className="text-pink-400">async function</span> <span className="text-blue-400">deploySystem</span>() {'{\n'}  <span className="text-pink-400">const</span> phase = <span className="text-pink-400">await</span> <span className="text-blue-400">getCurrentPhase</span>();{'\n'}  <span className="text-pink-400">return</span> phase === <span className="text-green-300">'READY'</span> ? <span className="text-blue-400">deploy</span>() : <span className="text-blue-400">halt</span>();{'\n}'}</code>
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Actual Real-Time Messages */}
                {messages.map((msg, idx) => {
                  const isMe = msg.sender?.name === 'You' || msg.senderId === 'current';
                  return (
                    <div key={msg._id || idx} className={`flex gap-4 animate-[fadeInUp_0.3s_ease-out] ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                      <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.sender?.name || 'unknown'}`} 
                        alt={msg.sender?.name} 
                        className="w-10 h-10 rounded-full border border-white/10 shadow-sm bg-surface-low" 
                      />
                      <div className={`flex flex-col gap-1 max-w-[75%] ${isMe ? 'items-end' : 'items-start'}`}>
                        <div className={`flex items-baseline gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                          <span className={`text-sm font-bold font-sans ${isMe ? 'text-white' : 'text-primary-container'}`}>
                            {msg.sender?.name || 'User'}
                          </span>
                          <span className="text-[10px] text-on-surface-variant font-mono">
                            {formatTime(msg.createdAt)}
                          </span>
                        </div>
                        <div className={`px-5 py-3 shadow-md break-words font-sans text-sm ${
                          isMe 
                            ? 'bg-primary-container text-black rounded-2xl rounded-tr-sm' 
                            : 'bg-surface-low border border-white/10 text-on-surface rounded-2xl rounded-tl-sm'
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-white/10 bg-black/20 backdrop-blur-md relative">
                {showEmojiPicker && (
                  <div className="absolute bottom-full mb-2 left-4 bg-[#1A1A1A] border border-white/10 rounded-xl p-2 shadow-xl flex gap-2 animate-[fadeInUp_0.2s_ease-out]">
                    {['👍', '🔥', '🚀', '💯', '😂', '👀', '🎉'].map(emoji => (
                      <button key={emoji} type="button" onClick={() => addEmoji(emoji)} className="w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center text-xl transition-colors">
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
                
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={handleFileUpload} 
                />

                <form onSubmit={handleSend} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-container to-secondary-container rounded-xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
                  <div className="relative flex items-center gap-3 bg-[#1A1A1A] rounded-xl px-4 py-2.5 border border-white/10 focus-within:border-primary-container/50 transition-colors">
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="text-on-surface-variant hover:text-primary-container transition-colors" title="Attach File">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                    </button>
                    <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)} className={`transition-colors hidden sm:block ${showEmojiPicker ? 'text-primary-container' : 'text-on-surface-variant hover:text-primary-container'}`} title="Add Emoji">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </button>
                    <input type="text" value={input} onChange={e => setInput(e.target.value)}
                      placeholder={`Message #${activeRoom?.name || 'channel'}...`}
                      className="flex-1 bg-transparent text-sm font-sans text-white placeholder-white/40 focus:outline-none" />
                    
                    <button type="submit" disabled={!input.trim()} className={`rounded-lg p-2 transition-all flex items-center justify-center ${input.trim() ? 'bg-primary-container text-black hover:bg-[#00e5f5] shadow-lg shadow-primary-container/20' : 'bg-white/5 text-white/30 cursor-not-allowed'}`}>
                      <svg className="w-4 h-4 translate-x-px" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                    </button>
                  </div>
                </form>
                <div className="flex justify-center mt-2">
                  <p className="text-[9px] text-on-surface-variant font-mono">
                    <span className="font-bold">Enter</span> to send, <span className="font-bold">Shift+Enter</span> for new line • Markdown supported
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
