import React, { Component } from 'react';
import Header from '../components/Header.js';
import PostDetails from '../components/PostDetails.js';

export default class PostDetailsPage extends Component {
  // In React-Router v4, use props.match.params from props.params 
  render() {
    return (
      <div>
        <Header type="posts_show" postId={this.props.match.params.id}/>
        <PostDetails id={this.props.match.params.id}/>
      </div>
    );
  }
}
