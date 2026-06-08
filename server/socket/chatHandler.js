const Message = require('../models/Message');
const ChatRoom = require('../models/ChatRoom');

const onlineUsers = new Map();

function setupChatHandler(io) {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-dm', ({ userId, contactId }) => {
      const roomId = [userId, contactId].sort().join('-');
      socket.join(roomId);
      socket.data.roomId = roomId;
    });

    socket.on('join-room', async ({ roomId }) => {
      socket.join(roomId);
      socket.data.roomId = roomId;
    });

    socket.on('send-message', async ({ senderId, receiverId, content, roomId }) => {
      try {
        const message = await Message.create({
          sender: senderId,
          receiver: receiverId,
          content,
          roomId,
        });
        const populated = await Message.findById(message._id)
          .populate('sender', 'name avatar')
          .populate('receiver', 'name avatar');
        io.to(roomId).emit('new-message', populated);
      } catch (error) {
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    socket.on('send-room-message', async ({ roomId, senderId, content }) => {
      try {
        const message = await Message.create({
          sender: senderId,
          content,
          roomId,
        });
        const populated = await Message.findById(message._id)
          .populate('sender', 'name avatar');
        io.to(roomId).emit('new-room-message', populated);
      } catch (error) {
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    socket.on('typing', ({ roomId, userId }) => {
      socket.to(roomId).emit('user-typing', { userId });
    });

    socket.on('stop-typing', ({ roomId, userId }) => {
      socket.to(roomId).emit('user-stop-typing', { userId });
    });

    socket.on('user-online', (userId) => {
      onlineUsers.set(userId, socket.id);
      io.emit('online-users', Array.from(onlineUsers.keys()));
    });

    socket.on('disconnect', () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
      io.emit('online-users', Array.from(onlineUsers.keys()));
      console.log('User disconnected:', socket.id);
    });
  });
}

module.exports = setupChatHandler;
