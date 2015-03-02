var React = require('react'),
  StoryList = require('./backlog/story_list'),
  StoryStore = require('../stores/story_store'),
  StoryActions = require('../actions/story_actions'),
  StoryConstants = require('../constants/story_constants'),
  Dispatcher = require('../dispatcher');

var ReactForms = require('react-forms');
var Form = ReactForms.Form,
  Select = require('./forms/select');

var dispatcherId;

var StoryEditor = React.createClass({
  displayName: 'StoryEditor',
  propTypes: {
    users: React.PropTypes.object.isRequired
  },
  getInitialState() {
    return {
      key: "new-0",
      story: {}
    };
  },
  componentDidMount() {
    dispatcherId = Dispatcher.register((action) => {
      switch(action.actionType) {
        case StoryConstants.OPEN_EDITOR:
          let id  = action.id;
          let key = id || `new-${Math.floor(Math.random() * (10000 - 100))}`;
          this.setState({key: key, id: action.id, story: action.story});
          break;
        case StoryConstants.CLOSE_EDITOR:
          break;
        default:
      }
    });
  },
  componentWillUnmount() {
    Dispatcher.unregister(dispatcherId);
  },
  render() {
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
            <Form className="col-xs-12" key={this.state.key} schema={schema} ref="form" component="div"/>
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
  _formSchema() {
    var Scalar = ReactForms.schema.Scalar,
      Mapping = ReactForms.schema.Mapping,
      List = ReactForms.schema.List;
    return Mapping({
      story:    Scalar({
        name: 'story',
        label: 'Story Title',
        required: true,
        type: 'string',
        defaultValue: this.state.story.story,
        input: <textarea />
      }),
      spec:     Scalar({
        name: 'spec',
        label: 'Spec URL',
        type: 'string',
        defaultValue: this.state.story.spec
      }),
      techId:     Scalar({
        name: 'techId',
        label: 'Tech',
        type: 'string',
        defaultValue: this.state.story.techId,
        input: <Select options={this.props.users} />
      }),
      managerId:  Scalar({
        name: 'managerId',
        label: 'Manager',
        type: 'string',
        defaultValue: this.state.story.managerId,
        input: <Select options={this.props.users} />
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
        required: true,
        defaultValue: (this.state.story.points || 0)
      }),
    });
  },
  _save(event) {
    event.preventDefault();
    var form = this.refs.form,
      values = form.getValue().toJSON();
    if (form.getValidation().isFailure) {
      // force rendering all validation errors
      form.makeDirty();
    } else {
      if(this._editingStory()) {
        StoryActions.updateStory(this.state.id, values);
      } else {
        StoryActions.createStory(values);
        this.replaceState(this.getInitialState());
      }
      jQuery('#add-story-dialogue').modal('hide');
    }
  },
  _editingStory() {
    return !!this.state.id;
  }
});

module.exports = StoryEditor;
