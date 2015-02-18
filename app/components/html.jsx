var React = require('react');

// Handle the HTML rendering on the server
var Html = React.createClass({
render() {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Yasa</title>
        <link href="css/application.css" rel="stylesheet" />
        <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
      </head>
      <body>
        <div className="container-fluid">
          <div className="main-app" id="yasa-root" dangerouslySetInnerHTML={{__html: this.props.markup}} />
        </div>
        <script src="js/application.js"></script>
      </body>
    </html>
  );
}
});

module.exports = Html;
