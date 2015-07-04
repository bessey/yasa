import React from 'react';
import {Link} from 'react-router';
import {Form} from 'formsy-react';
import {Input, Textarea} from 'formsy-react-components';
import exposeRouter from '../../components/utils/expose_router';
import StoryActions from '../../actions/story_actions';

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
    let model = this.refs.form.model;
    StoryActions.createStory(model);
    this.props.router.transitionTo('stories');
  }
  render() {
    return <div>
      <Link to='stories'>Back to Stories</Link>
      <Form
        ref="form"
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

export default exposeRouter(StoryEditor);
