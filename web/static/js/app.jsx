import React from 'react';
import ReactRouter from 'react-router';

import TeamFetcher from './utils/team_fetcher';
import StoryFetcher from './utils/story_fetcher';

import StoryActions from './actions/story_actions';

import alt from './alt';
import routes from './routes';

let {Socket} = Phoenix;
let {HashLocation} = ReactRouter;

let socket = new Socket("ws://localhost:4000/ws");
socket.connect();

let teamFetcher = new TeamFetcher(socket).subscribe();
let storyFetcher = new StoryFetcher(socket).subscribe(StoryActions.updateStories);

ReactRouter.run(routes, HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});
