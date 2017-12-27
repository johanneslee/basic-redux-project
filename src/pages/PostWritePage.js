import React, { Component } from 'react';
import Header from '../components/Header';
import PostWrite from '../components/PostWrite';

export default class PostWritePage extends Component {
  render() {
    return (
      <div>
        <Header type="posts_new"/>
        <PostWrite />
      </div>
    );
  }
}
