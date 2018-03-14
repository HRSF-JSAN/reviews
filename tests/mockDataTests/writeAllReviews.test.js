const writeAllReviews = require('../../mockData/writeAllReviews.js');

const testRestaurants = [
  {
    id: 101,
    title: 'Mario\'s Magnificent Pasta',
    foodType: 'Italian',
    rating: 5,
    price: '$$$',
  },
];

test('writeAllReviews returns an array', () => {
  const reviews = writeAllReviews(testRestaurants);
  expect(Array.isArray(reviews)).toBe(true);
});

test('writeAllReviews should write 3-4 reviews for each restaurant', () => {
  testRestaurants[0].rating = 4;
  const reviews = writeAllReviews(testRestaurants);

  expect(reviews.length).toBeGreaterThanOrEqual(3);
});

test('All of the review ratings average to each restaurant\'s overall rating', () => {
  testRestaurants[0].rating = 3;
  const reviews = writeAllReviews(testRestaurants);

  let total = 0;
  reviews.forEach((review) => {
    total += review.rating;
  });
  const average = total / reviews.length;

  expect(average).toBe(3);
});
