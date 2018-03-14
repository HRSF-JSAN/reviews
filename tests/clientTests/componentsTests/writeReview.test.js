import React from 'react';
import { mount } from 'enzyme';
import WriteReview from '../../../client/components/writeReview';

describe('WriteReview container', () => {
  const write = mount(<WriteReview restaurant="Mary's" restId={123} updateReviews={() => (null)} />); // eslint-disable-line

  test('WriteReview container should be stateful', () => {
    expect(write.state('starsClicked')).toBeDefined();
    expect(write.state('starsClickedNum')).toBeDefined();
    expect(write.state('starsHovered')).toBeDefined();
    expect(write.state('startReview')).toBeDefined();
  });


  test('WriteReview container should render an instance of User', () => {
    const users = write.find('.rev_users');
    expect(users.length).toBe(1);
  });

  test('WriteReview container should render an instance of Stars', () => {
    const stars = write.find('.rev_starBox');
    expect(stars.length).toBe(1);
  });

  test('Clicking \'Start Review\' should update the state of WriteReview', () => {
    expect(write.state('startReview')).toBe(false);
    write.find('#rev_startReview').simulate('click');
    expect(write.state('startReview')).toBe(true);
  });

  test('Clicking cancel should update the state of WriteReview', () => {
    write.find('#rev_writeCancel').simulate('click');
    expect(write.state('startReview')).toBe(false);
  });
});
