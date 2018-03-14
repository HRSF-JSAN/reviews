import React from 'react';
import { mount } from 'enzyme';
import Stars from '../../../client/components/stars';

describe('Stars container', () => {
  const starsBox = mount(<Stars rating={3} revId="678" />);
  const allStars = starsBox.find('.rev_star');

  test('Stars container should contain 5 instances of Star', () => {
    expect(allStars.length).toBe(5);
  });

  test('Stars container should correctly assign color-classes', () => {
    const selectedStars = allStars.find('.rev_selectedStar');
    const greyStars = allStars.find('.rev_greyStar');

    expect(selectedStars.length).toBe(6);
    expect(greyStars.length).toBe(4);
  });
});
