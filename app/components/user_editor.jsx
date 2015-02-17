var React = require('react'),
  UserActions = require('../actions/user_actions'),
  UserStore = require('../stores/user_store');

var ReactForms = require('react-forms'),
  Form = ReactForms.Form;

var UserEditor = React.createClass({
  displayName: 'UserEditor',
  propTypes: {
    user: React.PropTypes.any.isRequired
  },
  getDefaultProps() {
    return {
      id: null,
      user: {
        color: null,
        name: null
      }
    };
  },
  render() {
    var user = this.props.user;
    return <div className={`user ${user.color}`}>
      <form className='form-inline' onSubmit={this._save}>
        <Form schema={this._schema()} ref="form" component="div">
        </Form>
        <button className="save-button" type="submit">Save</button>
      </form>
      {this._renderDeleteButton()}
    </div>
  },
  _renderDeleteButton() {
    if(!this._newUser()) {
      return <button className="delete-button" onClick={this._delete}>Delete</button>
    }
  },
  _schema() {
    var Scalar = ReactForms.schema.Scalar,
      Mapping = ReactForms.schema.Mapping,
      List = ReactForms.schema.List;

    return Mapping({
      name: Scalar({
        label: 'Name',
        name: 'name',
        required: true,
        defaultValue: this.props.user.name
      }),
      color:    Scalar({
        label: 'Color',
        name: 'color',
        required: true,
        defaultValue: this.props.user.color
      })
    });
  },
  _save() {
    event.preventDefault();
    var form = this.refs.form;
    if (form.getValidation().isFailure)  {
      return; form.makeDirty();
    }
    var { id } = this.props, user = form.getValue().toJSON();
    if(this._newUser()) {
      UserActions.createUser(user);
      this._resetForm();
    } else {
      UserActions.updateUser(id, user);
    }
  },
  _delete() {
    event.preventDefault();
    UserActions.deleteUser(this.props.id);
  },
  _resetForm() {
    this.refs.form.setValue({});
  },
  _newUser() {
    return this.props.id === 'new-user';
  }
});

module.exports = UserEditor;
