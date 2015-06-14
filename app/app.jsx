let React = require('react');
let ReactRouter = require('react-router');
let {HashLocation, Route, RouteHandler, DefaultRoute} = ReactRouter;
let Backlog = require('./components/backlog');
let Body = require('./components/body');

let TeamFetcher = require('./utils/team_fetcher');

TeamFetcher.subscribe();

let routes = <Route handler={Body}>
  <DefaultRoute handler={Backlog}/>
  <Route name="backlog" path="/backlog" handler={Backlog} />
</Route>;

ReactRouter.run(routes, HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});
