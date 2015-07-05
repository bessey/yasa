import React from 'react';
import ReactRouter from 'react-router';

import Body from './components/body';

import Backlog from './components/backlog/backlog';
import StoryEditor from './components/backlog/story_editor';
import StoryList from './components/backlog/story_list';

let {HashLocation, Route, DefaultRoute} = ReactRouter;

export default  <Route handler={Body}>
  <DefaultRoute handler={Backlog}/>
  <Route name="backlog" path="backlog" handler={Backlog}>
    <DefaultRoute handler={StoryList}/>
    <Route name="stories" path="stories" handler={StoryList} />
    <Route name="new_story" path="story" handler={StoryEditor} />
  </Route>
</Route>;
