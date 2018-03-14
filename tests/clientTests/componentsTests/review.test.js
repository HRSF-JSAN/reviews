import React from 'react';
import { mount } from 'enzyme';
import Review from '../../../client/components/review';

const reviews = [
  {
    _id: '5a9899ff5732626fe700b941',
    restaurant: 101,
    userName: 'Mat Bagnall',
    userPhoto: 'https://s3-us-west-1.amazonaws.com/foodigouserphotos/MB.jpg',
    userLocation: 'Auckland, New Zealand',
    rating: 5,
    date: '2018-02-12T19:49:00.000Z',
    reviewBody: 'Easily the best meal I\'ve had in a while! I highly recommend the bruschetta -- so delicious. Definitely do not miss this place.',
    useful: 4,
    funny: 6,
    cool: 2,
  },
];

describe('Review container', () => {
  const review = mount(<Review review={reviews[0]} />);

  test('Review container should render an instance of User', () => {
    const users = review.find('div.rev_users');
    expect(users.length).toBe(1);
  });

  test('Review container should render an instance of Stars', () => {
    const stars = review.find('.rev_starBox');
    expect(stars.length).toBe(1);
  });

  test('Review container should render three instances of Button', () => {
    const buttons = review.find('button');
    expect(buttons.length).toBe(3);
  });
});

