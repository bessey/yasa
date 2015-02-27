var React = require('react');

// Handle the HTML rendering on the server
var Html = React.createClass({
  render() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Yasa</title>
          <link href="/css/application.css" rel="stylesheet" />
          <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
          <script dangerouslySetInnerHTML={{__html: this._renderJson() }}></script>
          <script src="/js/application.js"></script>
        </head>
        <body dangerouslySetInnerHTML={{__html: this.props.markup}}>
        </body>
      </html>
    );
  },
  _renderJson() {
    return `window.DATA = ${JSON.stringify(this.props.dependencies)};`
  }
});

module.exports = Html;
