import * as types from './ActionTypes';
import axios from 'axios';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

//Post list
export function fetchPosts() {
  return {
    type: types.FETCH_POSTS,
    payload: axios.get('/api/posts')
  };
}

export function fetchPostsSuccess(posts) {
  return {
    type: types.FETCH_POSTS_SUCCESS,
    payload: posts
  };
}

export function fetchPostsFailure(error) {
  return {
    type: types.FETCH_POSTS_FAILURE,
    payload: error
  };
}

//Create new post
export function createPost(props) {
  return {
    type: types.CREATE_POST,
    payload: axios.post('/api/posts', props)
  };
}

export function createPostSuccess(newPost) {
  return {
    type: types.CREATE_POST_SUCCESS,
    payload: newPost
  };
}

export function createPostFailure(error) {
  return {
    type: types.CREATE_POST_FAILURE,
    payload: error
  };
}

export function resetNewPost() {
  return {
    type: types.RESET_NEW_POST
  };
}

//Validate post fields like Title, Categries on the server
export function validatePostFields(props) {
  //note: we cant have /posts/validateFields because it'll match /posts/:id path!
  return {
    type: types.VALIDATE_POST_FIELDS,
    payload: axios.post('/api/posts/validate/fields', props)
  };
}

export function validatePostFieldsSuccess() {
  return {
    type: types.VALIDATE_POST_FIELDS_SUCCESS
  };
}

export function validatePostFieldsFailure(error) {
  return {
    type: types.VALIDATE_POST_FIELDS_FAILURE,
    payload: error
  };
}

export function resetPostFields() {
  return {
    type: types.RESET_POST_FIELDS
  };
}

export function resetDeletedPost() {
  return {
    type: types.RESET_DELETED_POST
  };
}

//Fetch post
export function fetchPost(id) {
  return {
    type: types.FETCH_POST,
    payload: axios.get('/api/posts/' + id)
  };
}

export function fetchPostSuccess(activePost) {
  return {
    type: types.FETCH_POST_SUCCESS,
    payload: activePost
  };
}

export function fetchPostFailure(error) {
  return {
    type: types.FETCH_POST_FAILURE,
    payload: error
  };
}

export function resetActivePost() {
  return {
    type: types.RESET_ACTIVE_POST
  };
}

//Delete post
export function deletePost(id) {
  return {
    type: types.DELETE_POST,
    payload: axios.delete('/api/posts/' + id)
  };
}

export function deletePostSuccess(deletedPost) {
  return {
    type: types.DELETE_POST_SUCCESS,
    payload: deletedPost
  };
}

export function deletePostFailure(response) {
  return {
    type: types.DELETE_POST_FAILURE,
    payload: response
  };
}
