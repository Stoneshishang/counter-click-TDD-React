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
  const button = findByTestAttr(wrapper, 'increment-button');
  expect(button.length).toBe(1);

})

test("renders counter display", () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
})

test("counter starts at 0", () => {
  const wrapper = setup();
  const count = findByTestAttr(wrapper, 'count').text();
  expect(count).toBe("0");
})

test("clicking on button increments counter", () => {
  const wrapper = setup();

  //find the button
  const button = findByTestAttr(wrapper, 'increment-button');

  //click the button
  button.simulate('click');
  
  //find the display and test that the number has been incremented
  const count = findByTestAttr(wrapper, 'count').text();
  expect(count).toBe("1");
})
