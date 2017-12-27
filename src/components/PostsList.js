import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import * as actions from '../actions';

class PostsList extends Component {
  constructor(props) {
    super(props);

    this.renderPosts = this.renderPosts.bind(this);
  }

  componentWillMount() {
    this.props.handleFetchPosts();
  }

  renderPosts(posts) {
    return posts.map((post) => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link style={{color:'black'}} to={"posts/" + post.id}>
            <h3 className="list-group-item-heading">{post.title}</h3>
          </Link>
        </li>
      )
    });
  }

  render() {
    const { posts, loading, error } = this.props.postsList;

    if(loading) {
      return (
        <div>
          <h1>Posts</h1>
          <h3>Loading...</h3>
        </div>
      )
    }
    else if(error) {
      return (
        <div className="alert alert-danger">
          Error: {error.message}
        </div>
      )
    }

    return (
      <div className="container">
        <h1>Posts</h1>
        <ul className="list-group">
          {this.renderPosts(posts)}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    postsList: state.posts.postsList
  };
}

const mapDispatchStateToProps = (dispatch) => {
  return {
    handleFetchPosts: () => {
      dispatch(actions.fetchPosts()).payload.then((response) => {
        !response.error ? dispatch(actions.fetchPostsSuccess(response.data)) : dispatch(actions.fetchPostsFailure(response.data));
      });
    }
  };
}

export default connect(mapStateToProps, mapDispatchStateToProps)(PostsList);
