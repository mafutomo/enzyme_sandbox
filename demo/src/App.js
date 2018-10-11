import React, { Component } from 'react';
import './App.css';

// Add a decrement counter
// Not let the count go below zero, display an error message that the counter can't go below zero
  // look at shallow wrapper docs
// Clear the error on increment

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      displayError: false,
    }
  }

  incrementCount(){
    this.setState({counter : this.state.counter + 1})
  }

  decrementCount(){
    this.setState({counter : this.state.counter - 1})
  }

  isTurningNegative(counter){
    if(counter === 0){
      this.setState({displayError : true});
    } else {
      this.decrementCount();
    }
  }

  resetText(displayError){
    if(!displayError){
      this.incrementCount();
    } else {
      this.setState({displayError : false})
    }
  }

  displayText(displayError){
    if(!displayError){
      return `The counter is now ${this.state.counter}`;
    } else {
      return 'error!';
    }
  }


  render() {
    return (
      <div data-test='component-app'>
        <h1 data-test='counter-display'>{this.displayText(this.state.displayError)}</h1>

        <button
        data-test='increment-button'
        onClick={() => this.resetText(this.state.displayError)}>
        Increment counter
        </button>

        <button
        data-test='decrement-button'
        onClick={() => this.isTurningNegative(this.state.counter)}>
        Decrement counter
        </button>

      </div>
    );
  }
}

export default App;
