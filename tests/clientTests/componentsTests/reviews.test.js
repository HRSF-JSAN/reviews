import React from 'react';
import { mount } from 'enzyme';
import Reviews from '../../../client/components/reviews';

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

describe('Reviews container', () => {
  const reviewsBox = mount(<Reviews reviews={reviews} />);

  test('Reviews container should render all reviews passed in', () => {
    const allReviews = reviewsBox.find('.rev_review');
    expect(allReviews.length).toBe(1);
  });
});

