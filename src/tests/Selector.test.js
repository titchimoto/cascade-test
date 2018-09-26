import React from 'react';
import Selector from '../components/Selector';
import { shallow } from 'enzyme';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

describe('Selector Component', () => {
  it ('has a title', () => {
    const wrapper = shallow(<Selector />);
    const text = wrapper.find('h3').text();
    expect(text).toEqual('Please select a month: ');
  });

  it ('renders a list of 5 months', () => {
    const wrapper = shallow(<Selector />);
    const monthCount = wrapper.find('.month-button');
    expect(monthCount.length).toEqual(5);
  });
})
