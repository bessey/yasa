var React = require('react'),
  TaskActions = require('../../actions/task_actions');

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
  render() {
    var task = this.props.task, userClass = this.props.userClass;
    return <div className={`task ${userClass}`}>
      <form onSubmit={this._save}>
        <Form schema={this._schema()} ref="form" component="div"/>
        <button type="submit">Save</button>
      </form>
    </div>
  },
  _schema() {
    var Scalar = ReactForms.schema.Scalar,
      Mapping = ReactForms.schema.Mapping,
      List = ReactForms.schema.List;
    return Mapping({
      description: Scalar({
        name: 'description',
        required: true,
        defaultValue: this.props.task.description
      }),
      assignee:    Scalar({
        name: 'assignee',
        required: true,
        defaultValue: this.props.task.assignee
      })
    });
  },
  _editing() {
    return this.props.userClass !== 'new-task';
  },
  _save() {
    event.preventDefault();
    var form = this.refs.form;
    if (form.getValidation().isFailure)  {
      return; form.makeDirty();
    }
    var { taskboardId, storyId, id } = this.props, task = form.getValue().toJSON();
    if(this._editing()) {
      TaskActions.updateTask(taskboardId, storyId, id, task);
    } else {
      task.state = 'pending';
      TaskActions.createTask(taskboardId, storyId, task);
      this._resetForm();
    }
    jQuery('#add-story-dialogue').modal('hide');
  },
  _resetForm() {
    this.refs.form.setValue({});
  }
});

module.exports = Task;
