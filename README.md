# [Yasa](http://yasa.bessey.io)
###  Yet Another Scrum App

## Development Setup

Prerequisites: `node.js`

1. Install all the dependencies
    - `npm install && bower install`
2. Install command line interfaces for convenience
    - `npm install -g broccoli-cli`
    - `npm install -g grunt-cli`
    - `npm install -g nodemon`
3. To build the app at `http://localhost:4200` run
    - `nodemon app.js`
4. To watch and build the assets run
    - `grunt assets`
5. To start the test suite up (in another terminal) run
    - `grunt test`
