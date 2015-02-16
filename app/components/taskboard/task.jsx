var React = require('react'),
  TaskActions = require('../../actions/task_actions'),
  UserStore = require('../../stores/user_store');

var ReactForms = require('react-forms'),
  Form = ReactForms.Form;

var Task = React.createClass({
  displayName: 'Task',
  propTypes: {
    taskboardId: React.PropTypes.any.isRequired,
    storyId: React.PropTypes.any.isRequired
  },
  getDefaultProps() {
    return {
      task: {
        description: null,
        assignee: null
      },
      userClass: 'new-task'
    };
  },
  getInitialState() {
    return {
      editing: (this._newTask() ? true : false),
    };
  },
  render() {
    var task = this.props.task, userClass = this.props.userClass;
    return <div className={`task ${userClass}`}>
      {this._renderViewOrEdit()}
      {this._renderMoveButtons()}
    </div>
  },
  _renderViewOrEdit() {
    if(this.state.editing) {
      return <form onSubmit={this._save}>
        <Form schema={this._schema()} ref="form" component="div"/>
        <button className="save-button" type="submit">Save</button>
      </form>
    } else {
      return <div className="description" onClick={this._toggleEditing}>
        { this.props.task.description }
      </div>
    }
  },
  _renderMoveButtons() {
    if(!this._newTask()) {
      return <span>
        <button onClick={this._moveBackward}>«</button>
        <button onClick={this._moveForward}>»</button>
      </span>
    }
  },
  _schema() {
    var Scalar = ReactForms.schema.Scalar,
      Mapping = ReactForms.schema.Mapping,
      List = ReactForms.schema.List;

    var user = UserStore.find(this.props.task.assigneeId), name;
    if(user) {
      name = user.name
    } else {
      name = null;
    }
    return Mapping({
      description: Scalar({
        name: 'description',
        required: true,
        defaultValue: this.props.task.description,
        input: <textarea />
      }),
      assignee:    Scalar({
        name: 'assignee',
        required: true,
        defaultValue: name
      })
    });
  },
  _newTask() {
    return this.props.userClass === 'new-task';
  },
  _save() {
    event.preventDefault();
    var form = this.refs.form;
    if (form.getValidation().isFailure)  {
      return; form.makeDirty();
    }
    var { taskboardId, storyId, id } = this.props, task = form.getValue().toJSON();
    var assigneeName = task.assignee;
    delete task.assignee;
    task.assigneeId = UserStore.findByName(assigneeName).key;
    if(this._newTask()) {
      task.state = 'pending';
      TaskActions.createTask(taskboardId, storyId, task);
      this._resetForm();
    } else {
      TaskActions.updateTask(taskboardId, storyId, id, task);
      this._toggleEditing();
    }
  },
  _resetForm() {
    this.refs.form.setValue({});
  },
  _moveForward(event) {
    event.preventDefault();
    var { taskboardId, storyId, id } = this.props, newState;
    switch(this.props.task.state) {
      case 'pending':
        newState = 'in-progress';
        break;
      case 'in-progress':
        newState = 'complete';
        break;
      case 'complete':
        newState = 'complete';
        break;
    }
    TaskActions.updateTask(taskboardId, storyId, id, {state: newState});
  },
  _moveBackward(event) {
    event.preventDefault();
    var { taskboardId, storyId, id } = this.props, newState;
    switch(this.props.task.state) {
      case 'pending':
        newState = 'pending';
        break;
      case 'in-progress':
        newState = 'pending';
        break;
      case 'complete':
        newState = 'in-progress';
        break;
    }
    TaskActions.updateTask(taskboardId, storyId, id, {state: newState});
  },
  _toggleEditing() {
    this.setState({editing: !this.state.editing});
  }
});

module.exports = Task;
