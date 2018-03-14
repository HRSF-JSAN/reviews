import React from 'react';
import { mount } from 'enzyme';
import Button from '../../../client/components/button';

describe('Button container', () => {
  const button = mount(<Button id="456" restaurant={123} score={4} type="Cool" />);

  test('Button should be stateful', () => {
    expect(button.state('type')).toBeDefined();
    expect(button.state('score')).toBeDefined();
    expect(button.state('clicked')).toBeDefined();
  });

  test('Button should update state when clicked', () => {
    const score = button.state('score');
    button.simulate('click');
    expect(button.state('score')).toBe(score + 1);
    expect(button.state('clicked')).toBe(true);

    button.simulate('click');
    expect(button.state('score')).toBe(score);
    expect(button.state('clicked')).toBe(false);
  });
});
