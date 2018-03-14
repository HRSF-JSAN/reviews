import React from 'react';
import { mount } from 'enzyme';
import App from '../../../client/components/app';

describe('App container', () => {
  const app = mount(<App restaurantId={104} />);

  test('App container should be stateful', () => {
    expect(app.state('reviews')).toBeDefined();
    expect(app.state('restaurant')).toBeDefined();
    expect(app.state('restId')).toBeDefined();
  });

  test('App container should render an instance of WriteReview container', () => {
    const writeReview = app.find('#rev_write');
    expect(writeReview.length).toBe(1);
  });

  test('App container should render an instance of Reviews container', () => {
    const reviews = app.find('#rev_reviews');
    expect(reviews.length).toBe(1);
  });
});
