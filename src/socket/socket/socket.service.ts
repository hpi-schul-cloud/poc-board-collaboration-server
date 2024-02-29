import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class SocketService {
  private readonly connectedClients: Map<string, Socket> = new Map();

  handleConnection(socket: Socket): void {
    const clientId = socket.id;
    this.connectedClients.set(clientId, socket);
    socket.onAny((evt) => {
      console.log('evt', evt);
    });
    socket.on('disconnect', () => {
      this.connectedClients.delete(clientId);
    });

    socket.on('update-card', function (req) {
      console.log('update-card', req);
      socket.broadcast.emit('update-card-replay', req);
    });

    socket.emit('update-card-replay', { message: 'Hello from server' });
  }

  // Add more methods for handling events, messages, etc.
}
