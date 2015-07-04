import config from '../config';
import io from 'socket.io-client';

export default class TeamFetcher {
  static fetch() {
    return $.get(`${config.apiUrl}/teams/me`);
  }

  static subscribe() {
    let socket = io.connect(`${config.socketUrl}`);
    socket.on('team', (data) => {
      console.log(data);
    });
    return socket;
  }
};
