import React from 'react';
import ReactRouter from 'react-router';

import Body from './components/body';

import Backlog from './components/backlog/backlog';
import StoryEditor from './components/backlog/story_editor';
import StoryList from './components/backlog/story_list';

import TeamFetcher from './utils/team_fetcher';
import alt from './yasa_alt';

let {HashLocation, Route, RouteHandler, DefaultRoute} = ReactRouter;


TeamFetcher.subscribe();

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
