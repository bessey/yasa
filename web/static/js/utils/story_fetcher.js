import Fetcher from './fetcher';

export default class StoryFetcher extends Fetcher {
  constructor(socket) {
    super(socket, "stories:mine");
  }
};
