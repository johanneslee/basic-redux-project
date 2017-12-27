import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import * as actions from '../actions'
import renderField from './renderField';
import renderTextArea from './renderTextArea';

//Client side validation
function validate(values) {
  const errors = {};

  if (!values.title || values.title.trim() === '') {
    errors.title = 'Enter a Title';
  }
  if (!values.categories || values.categories.trim() === '') {
    errors.categories = 'Enter categories';
  }
  if (!values.content || values.content.trim() === '') {
    errors.content = 'Enter some content';
  }

  return errors;
}

/*
//For instant async server validation
const asyncValidate = (values, dispatch) => {
  return dispatch(actions.validatePostFields(values)).payload
    .then((result) => {
      //Note: Error's "data" is in result.payload.response.data
      // success's "data" is in result.payload.data
      if (!result.payload.response) { //1st onblur
        return;
      }

      let {data, status} = result.payload.response;
      //if status is not 200 or any one of the fields exist, then there is a field error
      if (response.payload.status != 200 || data.title || data.categories || data.description) {
        //let other components know of error by updating the redux` state
        dispatch(actions.validatePostFieldsFailure(data));
        throw data; //throw error
      } else {
        //let other components know that everything is fine by updating the redux` state
        dispatch(actions.validatePostFieldsSuccess(data)); //ps: this is same as dispatching RESET_USER_FIELDS
      }
    });
};
*/

//For any field errors upon submission (i.e. not instant check)
const validateAndCreatePost = (values, dispatch) => {
  return dispatch(actions.createPost(values)).payload
    .then(result => {
      // Note: Error's "data" is in result.response.data (inside "response")
      // success's "data" is in result.data
      if (result.response && result.response.status !== 200) {
        dispatch(actions.createPostFailure(result.response.data));
        throw new SubmissionError(result.response.data);
      }
      //let other components know that everything is fine by updating the redux` state
      dispatch(actions.createPostSuccess(result.data)); //ps: this is same as dispatching RESET_USER_FIELDS
    });
}

class PostWrite extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newPost.post && !nextProps.newPost.error) {
      //to navigate using context in react-router v4:
      this.context.router.history.push('/');
    }
  }

  renderError(newPost) {
    if (newPost && newPost.error && newPost.error.message) {
      return (
        <div className="alert alert-danger">
          { newPost ? newPost.error.message : '' }
        </div>
        );
    } else {
      return <span></span>
    }
  }

  render() {
    const {handleSubmit, submitting, newPost} = this.props;
    return (
      <div className='container'>
        { this.renderError(newPost) }
        <form onSubmit={ handleSubmit(validateAndCreatePost) }>
          <Field
            name="title"
            type="text"
            component={ renderField }
            label="Title*" />
          <Field
            name="categories"
            type="text"
            component={ renderField }
            label="Categories*" />
          <Field
            name="content"
            component={ renderTextArea }
            label="Content*" />
          <div>
            <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={ submitting }>
              Submit
            </button>
            <Link
                  to="/"
                  className="btn btn-error"> Cancel
            </Link>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(actions.resetNewPost());
    }
  };
};


const mapStateToProps = (state, ownProps) => {
  return {
    newPost: state.posts.newPost
  };
};

export default reduxForm({
  form: 'PostWrite', // a unique identifier for this form
  validate // <--- validation function given to redux-form
  //asyncValidate
})(connect(mapStateToProps, mapDispatchToProps)(PostWrite));
