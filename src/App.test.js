import App from './App';
import Enzyme, {shallow } from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

Enzyme.configure({adapter: new EnzymeAdapter()})

test("renders without error", () => {
  const wrapper = shallow(<App/>)
  const appComponent = wrapper.find("[data-test='component-app']") //make sure there is no space around '=' in the .find(), otherwise erroe with be thrown,
                                                                  // because equal sign won't be valid in querySelector. 
  expect(appComponent.length).toBe(1);
})

test("renders button", () => {

})

test("renders counter display", () => {

})

test("counter starts at 0", () => {

})

test("clicking on button increments counter", () => {

})
