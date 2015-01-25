var React = require('react'),
  StoryList = require('./story_list'),
  StoryStore = require('../stores/story_store'),
  StoryActions = require('../actions/story_actions'),
  StoryConstants = require('../constants/story_constants'),
  Dispatcher = require('../dispatcher');

function openEditor() {
  console.log("I OPENED");
}
function closeEditor() {
}

var StoryEditor = React.createClass({
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
      <div className="modal fade" id="add-story-dialogue">
        <div className="modal-dialog modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
            <h2 className="modal-title">Add a Story</h2>
          </div>
          <form onSubmit={this._save} className="modal-body">
            <div className="form-group">
              <label htmlFor="story-story-input">Story Title</label>
              <input 
                {...commonInputProps('story')}
                type="text"
                required="true"
                placeholder="As a user, I..." />
            </div>
            <div className="form-group">
              <label htmlFor="story-spec-input">Spec</label>
              <textarea 
                {...commonInputProps('spec')}></textarea>
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
                required="true"
                {...commonInputProps('points')}
                type="number" />
            </div>
            <div className="form-group">
              <input  type="submit"
                      value="Add story to top"
                      className="btn btn-primary"
                      />
              &nbsp;
              <button className="btn btn-danger" data-dismiss="modal">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
  },
  _save: function (event) {
    event.preventDefault();
    StoryActions.createStory(this.state);
    this.replaceState({});
  }
});

Dispatcher.register(function (action) {
  switch(action.actionType) {
    case StoryConstants.OPEN_EDITOR:
      openEditor(action.editMode);
      break;
    case StoryConstants.CLOSE_EDITOR:
      closeEditor();
      break;
    default:
  }
});

module.exports = StoryEditor;