import React from 'react';
import ReactRouter from 'react-router';

import Body from './components/body';

import Backlog from './components/backlog/backlog';
import StoryEditor from './components/backlog/story_editor';
import StoryList from './components/backlog/story_list';

import TeamFetcher from './utils/team_fetcher';
import StoryFetcher from './utils/team_fetcher';

import alt from './alt';

let {HashLocation, Route, DefaultRoute} = ReactRouter;
let {Socket} = Phoenix;

let socket = new Socket("ws://localhost:4000/ws");
socket.connect();

let teamFetcher = new TeamFetcher(socket).subscribe();
// let storyFetcher = new StoryFetcher(socket).subscribe();

let routes = <Route handler={Body}>
  <DefaultRoute handler={Backlog}/>
  <Route name="backlog" path="backlog" handler={Backlog}>
    <DefaultRoute handler={StoryList}/>
    <Route name="stories" path="stories" handler={StoryList} />
    <Route name="new_story" path="story" handler={StoryEditor} />
  </Route>
</Route>;

ReactRouter.run(routes, HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});
