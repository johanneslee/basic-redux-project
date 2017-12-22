import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

// mapDispatchToProps(dispatch, [ownProps]): (Function or Object) 컴포넌트의 특정 함수형 props 를 실행 했을 때,
// 개발자가 지정한 action을 dispatch 하도록 설정한다.
let mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: () => dispatch(actions.increment()),
    onDecrement: () => dispatch(actions.decrement())
  }
};

class Buttons extends Component {
  render() {
    return (
      <div>
        <button
          type="button"
          onClick={ this.props.onIncrement }
        >
        +
        </button>
        <button
          type="button"
          onClick={ this.props.onDecrement }
        >
        -
        </button>
      </div>
    );
  }
}

// mapStateToProps 가 필요없기 때문에 undefined 를 전달하여 생략한다.
export default connect(undefined, mapDispatchToProps)(Buttons);
