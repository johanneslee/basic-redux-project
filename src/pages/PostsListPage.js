import React, { Component } from 'react';
import Header from '../components/Header.js';
import PostsList from '../components/PostsList.js';

export default class PostsListPage extends Component {
  render() {
    return (
      <div>
        <Header type="posts_index"/>
        <PostsList />
      </div>
    );
  }
}
