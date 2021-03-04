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

//Test organized by functions.
describe('Increment', () => {

  test("renders increment button", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button');
  expect(button.length).toBe(1);
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

})

describe('Decrement', () => {

  test("renders decrement button", () =>  {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'decrement-button');
  expect(button.length).toBe(1)
  })

  test('clicking decrement button decrements counter display when state is greater than 0', () => {
    const wrapper = setup();

    //increment counter so that it is greater than 0
    const incButton = findByTestAttr(wrapper, 'increment-button');
    incButton.simulate('click');
    //find decrement button and click
    const decButton = findByTestAttr(wrapper, 'decrement-button')
    decButton.simulate('click');
    //find the display and test that the number has been decremented
    const count = findByTestAttr(wrapper, 'count').text();
    expect(count).toBe("0")

  })

  describe('counter is 0 and decrement button is clicked', () => {
    //using a describe() here so I can use a beforeEach() from Mocha for shared setup.

    //scoping wrapper to be global inside of the describe block so it can be used in
    //beforeEach and the tests
    let wrapper;
     beforeEach(() => {
       // no need to set counter value here; default value of 0 is good
       wrapper = setup();

       //find button and click
       const button = findByTestAttr(wrapper, 'decrement-button');
       button.simulate('click');
     })

     test('error shows',()=>{
       const errDiv = findByTestAttr(wrapper, 'error-message')
       //hasClass(): Returns whether or not the wrapped node has a className prop including the passed in class name. It must be a single-node wrapper.
       //https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/hasClass.html
       const errHasHiddenClass = errDiv.hasClass('hidden')
       expect(errHasHiddenClass).toBe(false)
     })

     test('counter still displays 0', ()=>{
       const counter = findByTestAttr(wrapper, 'count').text();
       expect(counter).toBe('0')
     })

    test('clicking increment clears the error', () => {
      
      const incButton = findByTestAttr(wrapper, 'increment-button');
      incButton.simulate('click');
      

       const errorDiv = findByTestAttr(wrapper, 'error-message')
       const errorHasHiddenClass = errorDiv.hasClass('hidden')
       expect(errorHasHiddenClass).toBe(true)
     })

  })

})






