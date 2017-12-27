import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import PostsListPage from '../pages/PostsListPage'
import PostWritePage from '../pages/PostWritePage'

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={PostsListPage}/>
            <Route path="/posts/new" component={PostWritePage} />
          </Switch>
        </div>
      </Router>
    );
  }
}
