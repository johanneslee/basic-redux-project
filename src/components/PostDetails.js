import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions';

class PostDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     this.props.handleResetMe();
  }

  componentDidMount() {
    this.props.handleFetchPost(this.props.postId);
  }

  render() {
    if(typeof this.props.activePost === 'undefined') {
      return <span />
    }

    const { post, loading, error } = this.props.activePost;

    if (loading) {
      return <div className="container"><h3>Loading...</h3></div>;
    }
    else if(error) {
      return <div className="alert alert-danger"><h3>{error.message}</h3></div>
    }
    else if(!post) {
      return <span />
    }

    return (
      <div className="container">
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <pre>{post.content}</pre>
      </div>
    );
  }
}

const mapStateToProps = (globalState, ownProps) => {
  return {
    activePost: globalState.posts.activePost,
    postId: ownProps.id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFetchPost: (id) => {
      dispatch(actions.fetchPost(id)).payload
        .then((result) => {
          // Note: Error's "data" is in result.payload.response.data (inside "response")
          // success's "data" is in result.payload.data
          if (result.response && result.response.status !== 200) {
            dispatch(actions.fetchPostFailure(result.response.data));
          } else {
            dispatch(actions.fetchPostSuccess(result.data))
          }
        });
    },
    handleResetMe: () => {
      //clean up both activePost(currrently open) and deletedPost(open and being deleted) states
      dispatch(actions.resetActivePost());
      dispatch(actions.resetDeletedPost());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
