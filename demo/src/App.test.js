import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// Additions to get enzyme working:
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

// Configure enzyme with the adapter. Lets enzyme know we are going to be using Reaect 16 and that's what it will take as raw materials to create virtual DOM
Enzyme.configure({ adapter: new EnzymeAdapter()})

/** Factory function to create a ShallowWrapper for the App component.
  * @function setup
  * @param {object} props - Component props specific to this setup.
  * @param {object} state - Initial state for setup.
  * @returns {ShallowWrapper}
*/
const setup = (props={}, state=null) => {
  const wrapper = shallow(<App {...props} />)
  if (state) wrapper.setState(state);
  return wrapper;
}

/** Return ShallowWrapper containing node(s) with the given data-test value.
  * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
  * @param {string} val - Value of data-test attribute for search.
  * @return {ShallowWrapper}
*/
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}

describe('Rendering & initial state', () => {
  test('App renders without an error', () => {
    // shallow takes JSX
    // it will looks for data-test attribute, an attribute we made up. We want to make it clear that this attribute is for testing purposes and should not be changed by other developers.
    const wrapper = setup();
    const appComponent = findByTestAttr(wrapper, 'component-app');
    expect(appComponent.length).toBe(1);
  });

  test('renders counter display', () => {
    const wrapper = setup();
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.length).toBe(1);
  });

  test('counter starts at 0', () => {
    const wrapper = setup();
    const initialCounterState = wrapper.state('counter');
    expect(initialCounterState).toBe(0);
  });

  test('displayError starts at false', () => {
    const wrapper = setup();
    const initialDisplayErrorState = wrapper.state('displayError');
    expect(initialDisplayErrorState).toBe(false);
  });

});

describe('Increment', () => {
  test('renders increment button', () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, 'increment-button');
    expect(button.length).toBe(1);
  });

  test('clicking increment button increments counter in the display', () => {
    const counter = 7;
    const wrapper = setup(null, { counter });

    //find button and click
    const button = findByTestAttr(wrapper, 'increment-button');
    button.simulate('click');
    wrapper.update();

    //find display and test value
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(counter + 1);
  });
});

describe('Decrement', () => {
  test('renders decrement button', () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, 'decrement-button');
    expect(button.length).toBe(1);
  });

  test('clicking decrement button decrements counter in the display', () => {
    const counter = 5;
    const wrapper = setup(null, { counter });

    //find button and click
    const button = findByTestAttr(wrapper, 'decrement-button');
    button.simulate('click');
    wrapper.update();

    //find display and test value
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(counter - 1);
  });

  test('decrement button does not decrease counter below 0', () => {
    const counter = 0;
    const wrapper = setup(null, {counter});

    //find decrement button and click
    const button = findByTestAttr(wrapper, 'decrement-button');
    button.simulate('click');
    wrapper.update();

    //find state of counter
    const modifiedCounterState = wrapper.state('counter');
    expect(modifiedCounterState).toBe(0);
  });
});

describe('Error Message', () => {
  test('displays error message when counter decrements below 0', () => {
    const counter = 0;
    const wrapper = setup(null, {counter});

    //find decrement button and click
    const button = findByTestAttr(wrapper, 'decrement-button');
    button.simulate('click');
    wrapper.update();

    //find error message and test that it appears
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toMatch(/error/);
  });

  test('error is cleared if it is showing and increment button is clicked', () => {
    const displayError = true;
    const counter = 0;
    const wrapper = setup(null, {displayError, counter});

    //find increment button and click
    const button = findByTestAttr(wrapper, 'increment-button');
    button.simulate('click');
    wrapper.update();

    //find display text and test that it shows 1
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(0);
  });
})
