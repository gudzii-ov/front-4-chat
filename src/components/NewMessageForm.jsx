import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions';
import UserContext from '../user-context';

const mapStateToProps = (state) => {
  const props = {
    text: state.text,
  };
  return props;
};

const actionCreators = {
  addMessageRequest: actions.addMessageRequest,
};

class NewMessageForm extends React.Component {
  handleSubmit = async (values) => {
    const { addMessageRequest, reset } = this.props;
    const userName = this.context;
    const message = { ...values, user: userName };
    try {
      await addMessageRequest({ message });
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
    reset();
  }

  render() {
    const {
      handleSubmit, submitting, pristine, error,
    } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="input-group mb-3">
          <Field
            type="text"
            required
            disabled={submitting}
            className="form-control"
            placeholder="message"
            aria-label="Message"
            aria-describedby="basic-addon2"
            component="input"
            name="text"
          />
          <div className="input-group-append">
            <button className="input-group-text" id="basic-addon2" type="submit" disabled={pristine || submitting}>Send</button>
          </div>
        </div>
        {error && <div className="ml-3">{error}</div>}
      </form>
    );
  }
}
NewMessageForm.contextType = UserContext;

const connectedNewMessageForm = connect(mapStateToProps, actionCreators)(NewMessageForm);
export default reduxForm({
  form: 'newMessage',
})(connectedNewMessageForm);
