import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;
    const newSocket = io('/', {
      auth: { token },
      transports: ['websocket', 'polling'],
    });
    setSocket(newSocket);
    newSocket.on('online-users', setOnlineUsers);
    return () => newSocket.close();
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);

export default SocketContext;
