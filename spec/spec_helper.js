var React = require('react');
var { func } = React.PropTypes;


let oldWarn = console.warn;
console.warn = function (args) {
  oldWarn(args);
  //// Uncoment to upgrade warnings to errors
  // throw new Error(`Failed due to console.warn: ${args}`);
}

// Via http://www.asbjornenge.com/wwc/testing_react_components.html
module.exports = {
  jsdom(markup = '<html><body></body></html>') {
    if (typeof document !== 'undefined') return;
    var jsdom = require("jsdom").jsdom;
    global.document = jsdom(markup || '');
    global.window = document.defaultView;
    global.navigator = {
      userAgent: 'node.js'
    };

    let chai = require('chai');
    global["jQuery"] = require('jquery');
    global["expect"] = chai.expect;

  },
  TestWrapper(WrappedClass, props) {
    return React.createClass({
      childContextTypes: {
        makePath: func,
        makeHref: func,
        transitionTo: func,
        replaceWith: func,
        goBack: func,
        getCurrentPath: func,
        getCurrentRoutes: func,
        getCurrentPathname: func,
        getCurrentParams: func,
        getCurrentQuery: func,
        isActive: func,
      },

      getChildContext () {
        return {
          makePath () {},
          makeHref () {},
          transitionTo () {},
          replaceWith () {},
          goBack () {},
          getCurrentPath () {},
          getCurrentRoutes () {},
          getCurrentPathname () {},
          getCurrentParams () {},
          getCurrentQuery () {},
          isActive () {},
        };
      },
      render () {
        return <div>
          <WrappedClass {...props} />
        </div>
      }
    })
  }
}
