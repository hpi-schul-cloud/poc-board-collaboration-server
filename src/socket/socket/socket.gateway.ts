import {
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  path: '/poc-board-collaboration-server',
  cors: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  },
})
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(SocketGateway.name);

  @WebSocketServer() io: Server;

  afterInit() {
    this.logger.log('Initialized');
  }

  handleConnection(client: any) {
    const { sockets } = this.io.sockets;

    this.logger.log(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Cliend id:${client.id} disconnected`);
  }

  @SubscribeMessage('update-card-request')
  handleUpdateCard(client: any, data: any) {
    this.logger.log(`Message received from client id: ${client.id}`);
    this.logger.debug(`Payload: ${data}`);
    client.broadcast.emit('update-card-success', data);
    client.emit('update-card-success', data);
  }

  @SubscribeMessage('lock-card-request')
  handleLockCard(client: any, data: any) {
    this.logger.log(`Message received from client id: ${client.id}`);
    this.logger.debug(`Payload: ${data}`);
    client.broadcast.emit('lock-card-success', data);
    client.emit('lock-card-success', data);
  }

  @SubscribeMessage('unlock-card-request')
  handleUnlockCard(client: any, data: any) {
    this.logger.log(`Message received from client id: ${client.id}`);
    this.logger.debug(`Payload: ${data}`);
    client.broadcast.emit('unlock-card-success', data);
    client.emit('unlock-card-success', data);
  }

  @SubscribeMessage('delete-card-request')
  handleDeleteCard(client: any, data: any) {
    this.logger.log(`Message received from client id: ${client.id}`);
    this.logger.debug(`Payload: ${data}`);
    client.broadcast.emit('delete-card-success', data);
    client.emit('delete-card-success', data);
  }

  @SubscribeMessage('create-card-request')
  handleCreateCard(client: any, data: any) {
    this.logger.log(`Message received from client id: ${client.id}`);
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);

    const cardId = `card${Math.floor(Math.random() * 1000)}`;
    const responsePayload = { ...data, cardId, text: '' };
    this.logger.debug(`Response Payload: ${JSON.stringify(responsePayload)}`);

    client.broadcast.emit('create-card-success', responsePayload);
    client.emit('create-card-success', responsePayload);
  }

  @SubscribeMessage('move-card-request')
  handleMoveCard(client: any, data: any) {
    this.logger.log(`Message received from client id: ${client.id}`);
    this.logger.debug(`Payload: ${data}`);
    client.broadcast.emit('move-card-success', data);
  }

  @SubscribeMessage('move-column-request')
  handleMoveColumn(client: any, data: any) {
    this.logger.log(`Message received from client id: ${client.id}`);
    this.logger.debug(`Payload: ${data}`);
    client.broadcast.emit('move-column-success', data);
  }
}
