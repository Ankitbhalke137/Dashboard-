import { useState, useRef, useEffect } from 'react';

export default function ChatWindow({ contact, messages, onSend, onBack }) {
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-3 border-b border-gray-800">
        <button onClick={onBack} className="text-gray-500 hover:text-neon-green transition-colors text-sm">&lt;</button>
        <img
          src={contact.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.name}`}
          alt=""
          className="w-8 h-8 rounded-full"
        />
        <span className="text-white font-mono text-sm font-semibold">{contact.name}</span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-gray-600 text-sm font-mono mt-10">
            Start a conversation with {contact.name}
          </div>
        )}
        {messages.map((msg, idx) => (
          <div
            key={msg._id || idx}
            className={`flex ${msg.sender === 'current' || msg.sender?.name === 'You' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[70%] p-2 rounded font-mono text-sm ${
              msg.sender === 'current' || msg.sender?.name === 'You'
                ? 'bg-neon-green/10 border border-neon-green/30 text-neon-green'
                : 'bg-dark-700 border border-gray-700 text-gray-300'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-800 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="> type a message..."
          className="flex-1 bg-dark-700 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:border-neon-green focus:outline-none font-mono"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-neon-green/20 border border-neon-green text-neon-green rounded hover:bg-neon-green/30 transition-colors font-mono text-sm"
        >
          Send
        </button>
      </form>
    </div>
  );
}
