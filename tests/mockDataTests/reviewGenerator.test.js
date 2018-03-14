const generateReview = require('../../mockData/reviewGenerator');

test('reviewGenerator returns a object that fits within the database schema', () => {
  const restaurant = {
    id: 102,
    title: 'Garden Love',
    foodType: 'French',
    rating: 5,
    price: '$$$$',
  };
  const review = generateReview(restaurant, 4, new Date());

  expect(typeof review.restaurant).toBe('number');
  expect(typeof review.userName).toBe('string');
  expect(typeof review.userPhoto).toBe('string');
  expect(typeof review.userLocation).toBe('string');
  expect(typeof review.rating).toBe('number');
  expect(review.date).toBeInstanceOf(Date);
  expect(typeof review.reviewBody).toBe('string');
  expect(typeof review.useful).toBe('number');
  expect(typeof review.funny).toBe('number');
  expect(typeof review.cool).toBe('number');
});

test('reviewGenerator will not create a review if the stars are less than 1 or more than 5', () => {
  const restaurant = {
    id: 102,
    title: 'Garden Love',
    foodType: 'French',
    rating: 5,
    price: '$$$$',
  };
  const review1 = generateReview(restaurant, 7, new Date());
  const review2 = generateReview(restaurant, 0, new Date());

  expect(review1).toBe(undefined);
  expect(review2).toBe(undefined);
});
