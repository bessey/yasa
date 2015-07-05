import Fetcher from './fetcher';

export default class TeamFetcher extends Fetcher {
  constructor(socket) {
    super(socket, "teams:mine");
  }
};
