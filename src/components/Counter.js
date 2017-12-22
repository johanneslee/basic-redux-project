import React from 'react';
import { connect } from 'react-redux';

class Counter extends React.Component {
  render() {
    return (
      <h1>VALUE: { this.props.value }</h1>
    );
  }
}

// mapStateToProps(state, [ownProps]): (Function) store 의 state 를 컴포넌트의 props 에 매핑 시켜줍니다.
// ownProps 인수가 명시될 경우, 이를 통해 함수 내부에서 컴포넌트의 props 값에 접근 할 수 있습니다.

let mapStateToProps = (state) => {
  return {
    value: state.counter.value
  };
}

// Connect 는 react-redux 의 내장 API 이며 React Component 를 Redux Store 와 연결한다.
// mapStateToProps 함수를 통해 Store 의 State 가 매핑되어 Store 에 연결된 컴포넌트를 얻는다.
export default connect(mapStateToProps)(Counter);
