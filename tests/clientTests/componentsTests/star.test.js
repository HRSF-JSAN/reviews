import React from 'react';
import { mount } from 'enzyme';
import Star from '../../../client/components/star';

describe('Star components', () => {
  const click = jest.fn();
  const hov = jest.fn();
  const leave = jest.fn();
  const star = mount(<Star type="str" handleClick={click} handleHover={hov} handleLeave={leave} />);

  test('Star component should contain the star image ip address', () => {
    const image = 'https://s3-us-west-1.amazonaws.com/foodigouserphotos/Star.png';

    const starImage = star.find('.rev_starImg');
    expect(starImage.html().includes(image)).toBe(true);
  });

  test('Star should invoke handleClick when clicked', () => {
    star.simulate('click');
    expect(click).toHaveBeenCalled();
  });

  test('Star should invoke handleHover when a mouse hovers over it', () => {
    star.simulate('mouseEnter');
    expect(hov).toHaveBeenCalled();
  });

  test('Star should invoke handleLeave when a mouse leaves from hovering on it', () => {
    star.simulate('mouseLeave');
    expect(leave).toHaveBeenCalled();
  });
});
