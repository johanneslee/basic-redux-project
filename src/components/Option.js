import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Option extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diff: '1'
    }

    this.onChangeDiff = this.onChangeDiff.bind(this);
  }

  onChangeDiff(e) {
    if(isNaN(e.target.value))
      return;

    this.setState({ diff: e.target.value });

    if(e.target.value=='')
      this.setState({ diff: '0' });

    this.props.onUpdateDiff(parseInt(e.target.value));
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={ this.state.diff }
          onChange={this.onChangeDiff}
        />
      </div>
    );
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    onUpdateDiff: (value) => dispatch(actions.setDiff(value))
  };
}

export default connect(undefined, mapDispatchToProps)(Option);
