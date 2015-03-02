var React = require('react'),
  TaskActions = require('../../actions/task_actions'),
  UserStore = require('../../stores/user_store');

var ReactForms = require('react-forms');
var Form = ReactForms.Form,
  Select = require('../forms/select');

var Task = React.createClass({
  displayName: 'Task',
  propTypes: {
    users: React.PropTypes.object.isRequired,
    taskboardId: React.PropTypes.string.isRequired,
    storyId: React.PropTypes.string.isRequired,
    task: React.PropTypes.object
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
      editing: false,
    };
  },
  render() {
    var task = this.props.task, userClass = this.props.userClass, editingClass;
    this.state.editing ? editingClass = "editing" : editingClass = "";
    return <div className={`task ${userClass} ${editingClass}`}>
      {this._renderViewOrEdit()}
    </div>
  },
  _renderViewOrEdit() {
    if(this.state.editing) {
      return <form onSubmit={this._save} >
        <Form schema={this._schema()} ref="form" component="div"/>
        <button className="save-button" type="submit">Save</button>&nbsp;
        <button className="cancel-button" onClick={this._toggleEditing}>Cancel</button>
      </form>
    } else {
      if(this._newTask()) {
        return <div className="create-placeholder" onClick={this._toggleEditing}>
          &#43;
        </div>
      } else {
        return <div className="description" onClick={this._toggleEditing}>
          { this.props.task.description }
          { this._renderMoveButtons() }
        </div>
      }
    }
  },
  _renderMoveButtons() {
    let buttons = [], newState = '';
    let backButton = <button key="fb" className="move-back" onClick={this._moveBackward}>«</button>;
    let forwardButton = <button key="bb" className="move-forward" onClick={this._moveForward}>»</button>
    switch(this.props.task.state) {
      case 'pending':
        buttons.push(forwardButton);
        newState = 'in-progress';
        break;
      case 'in-progress':
        buttons.push(backButton);
        buttons.push(forwardButton);
        newState = 'complete';
        break;
      case 'complete':
        buttons.push(backButton);
        newState = 'complete';
        break;
    }

    if(!this._newTask()) {
      return <span className="task-buttons">
        <span className="move-buttons">
          { buttons }
        </span>
        &nbsp;
        <button className="delete" onClick={this._deleteTask}>×</button>
      </span>
    }
  },
  _schema() {
    var Scalar = ReactForms.schema.Scalar,
      Mapping = ReactForms.schema.Mapping,
      List = ReactForms.schema.List;

    return Mapping({
      description: Scalar({
        name: 'description',
        required: true,
        defaultValue: this.props.task.description,
        input: <textarea />
      }),
      assigneeId:    Scalar({
        name: 'assigneeId',
        required: true,
        defaultValue: this.props.task.assigneeId,
        input: <Select required={true} options={this.props.users} />
      })
    });
  },
  _newTask() {
    return this.props.userClass === 'new-task';
  },
  _save(event) {
    if(event){
      event.preventDefault();
    }
    var form = this.refs.form;
    if (form.getValidation().isFailure)  {
      return; form.makeDirty();
    }
    var { taskboardId, storyId, id } = this.props, task = form.getValue().toJSON();
    if(this._newTask()) {
      task.state = 'pending';
      TaskActions.createTask(taskboardId, storyId, task);
      this._resetForm();
    } else {
      TaskActions.updateTask(taskboardId, storyId, id, task);
    }
    this._toggleEditing();
  },
  _resetForm() {
    this.refs.form.setValue({});
  },
  _deleteTask() {
    var { taskboardId, storyId, id } = this.props;
    TaskActions.deleteTask(taskboardId, storyId, id);
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
  _toggleEditing(event) {
    if(event) {
      event.preventDefault();
    }
    this.setState({editing: !this.state.editing}, () => {
      if(this.state.editing) {
        jQuery(this.refs.form.getDOMNode()).find('textarea').focus();
      }
    });
  }
});

module.exports = Task;
