import React, { Component } from 'react';
import Header from '../components/Header.js';
//import ValidateEmailAlertContainer from '../containers/ValidateEmailAlertContainer.js';
import PostsList from '../components/PostsList.js';

class PostsListPage extends Component {
  render() {
    return (
      <div>
        <Header type="posts_index"/>
        <PostsList />
      </div>
    );
  }
}

//<ValidateEmailAlertContainer/>

export default PostsListPage;