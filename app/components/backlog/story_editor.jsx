let React = require('react');
let {Link} = require('react-router');
let {Form} = require('formsy-react');
let {Input, Textarea} = require('formsy-react-components');
let exposeRouter = require('../utils/expose_router');

class StoryEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      canSubmit: false
    };
  }
  enableButton() {
    this.setState({canSubmit: true});
  }
  disableButton() {
    this.setState({canSubmit: false});
  }
  submit() {
    this.props.router.transitionTo('stories');
  }
  render() {
    return <div>
      <Link to='stories'>Back to Stories</Link>
      <Form
        onValidSubmit={this.submit.bind(this)}
        onValid={this.enableButton.bind(this)}
        onInvalid={this.disableButton.bind(this)}>
          <Input name="title" label="Title" required={true}></Input>
          <Textarea name="description" label="Description"></Textarea>
          <button type="submit" disabled={!this.state.canSubmit}>Add Story</button>
      </Form>
    </div>;
  }
}

module.exports = exposeRouter(StoryEditor);
