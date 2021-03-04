import App from './App';
import Enzyme, {shallow } from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

Enzyme.configure({adapter: new EnzymeAdapter()});

/**
  Factory function to create a ShallowWrapper for the App component.
  @function setup
  @function {ShalllowWrapper}
 */
const setup = () => shallow(<App/>)

const findByTestAttr = (wrapper, value) => wrapper.find(`[data-test='${value}']`);

test("renders without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper,'component-app')//make sure there is no space around '=' in the .find(), otherwise erroe with be thrown,
                                                                  // because equal sign won't be valid in querySelector. 
  expect(appComponent.length).toBe(1);
})

test("renders button", () => {
const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-counter');
  expect(button.length).toBe(1);

})

test("renders counter display", () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
})

test("counter starts at 0", () => {

})

test("clicking on button increments counter", () => {

})
