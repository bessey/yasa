let React = require('react');
let ReactRouter = require('react-router');
let {HashLocation, Route, RouteHandler, DefaultRoute} = ReactRouter;

let Body = require('./components/body');

let Backlog = require('./components/backlog/backlog');
let StoryEditor = require('./components/backlog/story_editor');
let StoryList = require('./components/backlog/story_list');

let TeamFetcher = require('./utils/team_fetcher');

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
