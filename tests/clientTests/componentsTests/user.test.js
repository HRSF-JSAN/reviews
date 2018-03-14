import React from 'react';
import { mount } from 'enzyme';
import User from '../../../client/components/user';

describe('User container', () => {
  const user = mount(<User userName="Sara" />);

  test('User container assigns a default user photo if none is provided', () => {
    const defaultPhoto = 'https://s3-us-west-1.amazonaws.com/foodigouserphotos/DefaultUser.png';
    const photos = user.find('.rev_userPhotos');
    const photo = photos.at(0);
    expect(photo.html().includes(defaultPhoto)).toBe(true);
  });
});
