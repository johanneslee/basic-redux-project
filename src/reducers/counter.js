import * as types from '../actions/ActionTypes';

const counterInitialState = {
  value: 0,
  diff: 1
};

export default function counter(state = counterInitialState, action) {
  switch(action.type) {
    case types.INCREMENT:
      return Object.assign({}, state, {
        value: state.value + state.diff
      });
    case types.DECREMENT:
      return Object.assign({}, state, {
        value: state.value - state.diff
      });
    case types.SET_DIFF:
      return Object.assign({}, state, {
        diff: action.diff
      });
    default:
      return state;
  }
}
