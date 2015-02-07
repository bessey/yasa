var React = require('react'),
  StoryList = require('./story_list'),
  StoryStore = require('../stores/story_store'),
  StoryActions = require('../actions/story_actions'),
  StoryConstants = require('../constants/story_constants'),
  Dispatcher = require('../dispatcher');

var ReactForms = require('react-forms'),
  Form = ReactForms.Form;

var StoryEditor = React.createClass({
  displayName: 'StoryEditor',
  getInitialState: function () {
    return {
      story: {}
    };
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
    var schema = this._formSchema();
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
            <Form key={this.state.id} schema={schema} ref="form" component="div"/>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">{submitText}</button>
              &nbsp;
              <button className="btn btn-default" data-dismiss="modal">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
  },
  _formSchema: function () {
    var Scalar = ReactForms.schema.Scalar,
      Mapping = ReactForms.schema.Mapping,
      List = ReactForms.schema.List;
    return Mapping({
      story:    Scalar({
        name: 'story',
        label: 'Story Title',
        required: true,
        type: 'string',
        defaultValue: this.state.story.story
      }),
      spec:     Scalar({
        name: 'spec',
        label: 'Spec URL',
        required: true,
        type: 'string',
        defaultValue: this.state.story.spec
      }),
      tech:     Scalar({
        name: 'tech',
        label: 'Tech',
        required: true,
        type: 'string',
        defaultValue: this.state.story.tech
      }),
      manager:  Scalar({
        name: 'manager',
        label: 'Manager',
        type: 'string',
        defaultValue: this.state.story.manager
      }),
      epic:     Scalar({
        name: 'epic',
        label: 'Epic',
        type: 'string',
        defaultValue: this.state.story.epic
      }),
      points:   Scalar({
        name: 'points',
        label: 'Points',
        type: 'number',
        defaultValue: this.state.story.points
      }),
    });
  },
  _save: function (event) {
    event.preventDefault();
    var form = this.refs.form;
    if (form.getValidation().isFailure)  {
      // force rendering all validation errors
      form.makeDirty();
    } else {
      if(this._editingStory()) {
        StoryActions.updateStory(this.state.id, this.state.story);
      } else {
        StoryActions.createStory(this.state.story);
      }
      jQuery('#add-story-dialogue').modal('hide');
      this.replaceState(this.getInitialState());
    }
  },
  _editingStory: function () {
    return !!this.state.id;
  }
});

module.exports = StoryEditor;
