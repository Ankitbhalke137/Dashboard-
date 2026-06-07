import { useState, useEffect } from 'react';
import { useSocket } from '../../context/SocketContext';
import ChatWindow from './ChatWindow';
import PublicChatRoom from './PublicChatRoom';
import api from '../../api';

export default function MessagingPage() {
  const { socket } = useSocket();
  const [activeView, setActiveView] = useState('rooms');
  const [activeRoom, setActiveRoom] = useState(null);
  const [activeContact, setActiveContact] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchRooms();
    fetchStudents();
  }, []);

  useEffect(() => {
    if (!socket) return;

    if (activeView === 'room' && activeRoom) {
      socket.emit('join-room', { roomId: activeRoom._id });
      socket.on('new-room-message', (msg) => {
        setMessages(prev => [...prev, msg]);
      });
    }

    if (activeView === 'dm' && activeContact) {
      const roomId = [activeContact._id, 'current'].sort().join('-');
      socket.emit('join-dm', { userId: 'current', contactId: activeContact._id });
      socket.on('new-message', (msg) => {
        setMessages(prev => [...prev, msg]);
      });
    }

    return () => {
      socket.off('new-room-message');
      socket.off('new-message');
    };
  }, [socket, activeView, activeRoom, activeContact]);

  const fetchRooms = async () => {
    try {
      const data = await api.messages.rooms();
      setRooms(data);
    } catch (err) {
      console.error('Failed to fetch rooms:', err);
    }
  };

  const fetchStudents = async () => {
    try {
      const data = await api.students.list({});
      // Store student list for contact search
      window.__students = data;
    } catch (err) {
      console.error('Failed to fetch students:', err);
    }
  };

  const handleSendMessage = (content) => {
    if (!socket || !content.trim()) return;

    if (activeView === 'room' && activeRoom) {
      socket.emit('send-room-message', {
        roomId: activeRoom._id,
        senderId: 'current',
        content,
      });
    } else if (activeView === 'dm' && activeContact) {
      const roomId = [activeContact._id, 'current'].sort().join('-');
      socket.emit('send-message', {
        senderId: 'current',
        receiverId: activeContact._id,
        content,
        roomId,
      });
    }
  };

  const handleSelectRoom = (room) => {
    setActiveRoom(room);
    setActiveView('room');
    setMessages([]);
  };

  const handleSelectContact = (student) => {
    setActiveContact(student);
    setActiveView('dm');
    setMessages([]);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      <div className="w-64 flex-shrink-0 space-y-2">
        <h2 className="text-sm font-mono font-bold text-white mb-3">
          <span className="neon-text">&gt;</span> Chat
        </h2>

        <button
          onClick={() => { setActiveView('rooms'); setActiveRoom(null); setActiveContact(null); }}
          className={`w-full text-left px-3 py-2 rounded text-sm font-mono transition-all ${
            activeView === 'rooms' ? 'bg-neon-green/10 text-neon-green border border-neon-green/30' : 'text-gray-400 hover:text-white hover:bg-dark-700 border border-transparent'
          }`}
        >
          🏠 Public Rooms
        </button>

        <div className="text-xs text-gray-600 font-mono mt-4 mb-2">— Public Rooms —</div>
        {rooms.map(room => (
          <button
            key={room._id}
            onClick={() => handleSelectRoom(room)}
            className={`w-full text-left px-3 py-2 rounded text-sm font-mono transition-all ${
              activeRoom?._id === room._id ? 'bg-neon-green/10 text-neon-green border border-neon-green/30' : 'text-gray-400 hover:text-white hover:bg-dark-700 border border-transparent'
            }`}
          >
            # {room.name}
          </button>
        ))}

        <div className="text-xs text-gray-600 font-mono mt-4 mb-2">— Direct Messages —</div>
        <button
          onClick={() => setActiveView('dm-search')}
          className="w-full text-left px-3 py-2 rounded text-sm font-mono text-gray-400 hover:text-white hover:bg-dark-700 border border-transparent transition-all"
        >
          🔍 Find a student...
        </button>
      </div>

      <div className="flex-1 bg-dark-600 rounded border border-gray-800 flex flex-col">
        {activeView === 'rooms' && (
          <div className="flex items-center justify-center h-full text-gray-500 font-mono text-sm">
            Select a room or start a conversation
          </div>
        )}

        {activeView === 'room' && activeRoom && (
          <PublicChatRoom
            room={activeRoom}
            messages={messages}
            onSend={handleSendMessage}
            onBack={() => setActiveView('rooms')}
          />
        )}

        {activeView === 'dm' && activeContact && (
          <ChatWindow
            contact={activeContact}
            messages={messages}
            onSend={handleSendMessage}
            onBack={() => setActiveView('rooms')}
          />
        )}

        {activeView === 'dm-search' && (
          <DMSearch onSelect={handleSelectContact} onBack={() => setActiveView('rooms')} />
        )}
      </div>
    </div>
  );
}

function DMSearch({ onSelect, onBack }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (val) => {
    setQuery(val);
    if (!val.trim()) { setResults([]); return; }
    try {
      const data = await api.students.list({ search: val });
      setResults(data.slice(0, 10));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 space-y-3">
      <button onClick={onBack} className="text-gray-500 hover:text-neon-green transition-colors font-mono text-sm">&lt; Back</button>
      <input
        type="text"
        placeholder="> search by name..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full bg-dark-700 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:border-neon-green focus:outline-none font-mono"
        autoFocus
      />
      <div className="space-y-2">
        {results.map(student => (
          <button
            key={student._id}
            onClick={() => onSelect(student)}
            className="w-full flex items-center gap-3 p-2 rounded hover:bg-dark-700 transition-colors"
          >
            <img src={student.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`} alt="" className="w-8 h-8 rounded-full" />
            <span className="text-sm text-white font-mono">{student.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
