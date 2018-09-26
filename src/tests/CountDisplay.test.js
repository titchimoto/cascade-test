import React from 'react';
import CountDisplay from '../components/CountDisplay';
import { shallow } from 'enzyme';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

describe('CountDisplay Component', () => {
  it ('has a title', () => {
    const wrapper = shallow(<CountDisplay />);
    const titleCount = wrapper.find('h3');
    expect(titleCount.length).toEqual(1);
  });

  it ('renders a result', () => {
    const wrapper = shallow(<CountDisplay />);
    const countDetails = wrapper.find('.count-details').text();
    expect(countDetails).toEqual(" /  days");
  });
})
