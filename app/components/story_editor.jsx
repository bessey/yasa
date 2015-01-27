var React = require('react'),
  StoryList = require('./story_list'),
  StoryStore = require('../stores/story_store'),
  StoryActions = require('../actions/story_actions'),
  StoryConstants = require('../constants/story_constants'),
  Dispatcher = require('../dispatcher');

var StoryEditor = React.createClass({
  getInitialState: function () {
    return {
      story: {}
    };
  },
  handleChange: function(event) {
    var keyValue = {story: this.state.story};
    keyValue.story[event.target.name] = event.target.value;

    this.setState(keyValue);
  },
  componentDidMount: function () {
    var _this = this;
    Dispatcher.register(function (action) {
      switch(action.actionType) {
        case StoryConstants.OPEN_EDITOR:
          _this.setState({id: action.id, story: action.story});
          break;
        case StoryConstants.CLOSE_EDITOR:
          break;
        default:
      }
    });
  },
  render: function () {
    var _this = this, title, submitText;
    var commonInputProps = function (name) {
      return {
        name: name,
        value: (_this.state.story[name] || ""),
        onChange: _this.handleChange,
        className: 'form-control',
        id: ("story-" + name + "-input")
      }
    };
    if(this._editingStory()){
      title = "Edit a Story";
      submitText = "Save";
    } else {
      title = "Add a Story";
      submitText = "Add story";
    }
    return (
      <div className="modal fade" id="add-story-dialogue">
        <div className="modal-dialog modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
            <h2 className="modal-title">{title}</h2>
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
              <label htmlFor="story-spec-input">Spec URL</label>
              <input
                type="text"
                {...commonInputProps('spec')} />
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
                      value={submitText}
                      className="btn btn-primary"
                      />
              &nbsp;
              <button className="btn btn-default" data-dismiss="modal">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
  },
  _save: function (event) {
    event.preventDefault();
    if(this._editingStory()) {
      StoryActions.updateStory(this.state.id, this.state.story);
    } else {
      StoryActions.createStory(this.state.story);
    }
    jQuery('#add-story-dialogue').modal('hide');
    this.replaceState(this.getInitialState());
  },
  _editingStory: function () {
    return !!this.state.id;
  }
});

module.exports = StoryEditor;