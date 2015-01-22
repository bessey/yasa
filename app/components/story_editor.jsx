var React = require('react');
var StoryList = require('./story_list');
var StoryEditor = require('./story_editor');
var StoryStore = require('../stores/story_store');


module.exports = React.createClass({
  getInitialState: function() {
    return {};
  },
  handleChange: function(event) {
    var keyValue = {}
    keyValue[event.target.name] = event.target.value;
    this.setState(keyValue);
  },
  render: function () {
    var _this = this;
    var commonInputProps = function (name) { 
      return {
        name: name,
        value: _this.state[name],
        onChange: _this.handleChange,
        className: 'form-control',
        id: ("story-" + name + "-input")
      }
    };
    return (
      <div className="row">
        <form className="col-md-6">
          <h2>Add a Story</h2>
          <div className="form-group">
            <label htmlFor="story-story-input">Story Title</label>
            <input 
              {...commonInputProps('story')}
              type="text"
              placeholder="As a user, I..." />
          </div>
          <div className="form-group">
            <label htmlFor="story-spec-input">Spec</label>
            <textarea 
              {...commonInputProps('spec')}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="story-sort-input">Sort</label>
            <input 
              {...commonInputProps('sort')}
              type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="story-tech-input">Tech</label>
            <input 
              {...commonInputProps('tech')}
              type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="story-manager-input">Manager</label>
            <input 
              {...commonInputProps('manager')}
              type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="story-epic-input">Epic</label>
            <input 
              {...commonInputProps('epic')}
              type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="story-points-input">Points</label>
            <input 
              {...commonInputProps('points')}
              type="number" />
          </div>
          <div className="form-group">
            <input type="submit" value="Add story to top" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
});