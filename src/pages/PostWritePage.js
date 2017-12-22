import React, { Component } from 'react';
import Header from '../components/Header.js';
import PostWrite from '../components/PostWrite.js';

class PostWritePage extends Component {
  render() {
    return (
      <div>
        <Header type="posts_new"/>
        <PostWrite />
      </div>
    );
  }
}


export default PostWritePage;
