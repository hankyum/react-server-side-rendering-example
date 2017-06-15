/**
 * Created by hguo on 3/30/16.
 */
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { decrement, increment, reset, test } from "../redux/actions/counter-actions";
import { withRouter } from 'react-router-dom';

class IncrementBtn extends Component {
  render() {
    return <button onClick={this.props.increment}>Add Num</button>
  }
}

class Counter extends Component {

  constructor(props) {
    console.log("Constructor of counter props received: ", props);
    super(props);
  }

  _incrementIfOdd() {
    if (this.props.data % 2 === 1) {
      this.props.incrementIfOdd();
    }
  }

  render() {
    const { data, test } = this.props;
    console.log("From render method: ", this.props);
    return (
      <div>
        <h1>Counter</h1>
        <p>Default Reducer: {data}</p>
        <p>Test Reducer: {test}</p>
        <IncrementBtn {...this.props}/>
        <button onClick={this.props.increment5}>+5</button>
        <button onClick={this.props.reset}>Reset</button>
        <button onClick={() => this._incrementIfOdd()}>incrementIfOdd
        </button>
        <button onClick={this.props.decrement}>-</button>
        <button onClick={this.props.onTest}>Test</button>
      </div>
    )
  }
}

Counter.propTypes = {
  data: PropTypes.number,
  test: PropTypes.number
};

export default withRouter(connect(
  (state) => {
    console.log("When connect state " + JSON.stringify(state));
    return {
      data: state.counter,
      test: state.test
    };
  },
  (dispatch) => {
    return {
      increment: () => {
        dispatch(increment({ num: 1 }));
      },
      increment5: () => dispatch(increment({ num: 5 })),
      reset: () => dispatch(reset(0)),
      decrement: () => dispatch(decrement(-1)),
      incrementIfOdd: () => {
        dispatch(increment({ num: 1 }));
      },
      onTest: () => {
        dispatch(test(1));
      }
    }
  }
)(Counter));
