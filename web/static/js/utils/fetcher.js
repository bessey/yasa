function noOp () {};

export default class Fetcher {
  constructor(socket, channel) {
    this.socket = socket;
    this.channel = channel;
  }

  subscribe(newDataCallback = noOp) {
    let chan = this.socket.chan(this.channel);
    chan.join()
      .receive('ok', () => {
        console.log(`joined ${this.channel} channel`);
      })
      .receive('error', () => {
        console.warn(`error joining ${this.channel} channel`);
      });

    chan.on('data', (payload) => {
      console.log(`${this.channel} data:`, payload.data);
      newDataCallback(payload.data);
    });
    return chan;
  }
};
