import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Dashboard from '../components/Dashboard';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

describe('Dashboard Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Dashboard />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it ('has a title', () => {
    const wrapper = shallow(<Dashboard />)
    const text = wrapper.find('h2').text();
    expect(text).toEqual('Port of Portland HVAC System Status');
  });

  it ('has an image logo', () => {
    const wrapper = shallow(<Dashboard />);
    const img = wrapper.find('img');
    const logo = wrapper.find('.logo');
    expect(img.length).toEqual(1);
    expect(logo.length).toEqual(1);
  });
})
