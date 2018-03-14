const generateReviewBody = require('../../mockData/reviewBodyGenerator');

test('expect a 5-star review body to have all variables filled in', () => {
  const newReview = generateReviewBody('Pizza', 'Angelos', 5);
  expect(newReview.includes('undefined')).toBe(false);
});

test('expect a 3-star review body to have all variables filled in', () => {
  const newReview = generateReviewBody('Pizza', 'Angelos', 3);
  expect(newReview.includes('undefined')).toBe(false);
});

test('expect a 1-star review body to have all variables filled in', () => {
  const newReview = generateReviewBody('Pizza', 'Angelos', 1);
  expect(newReview.includes('undefined')).toBe(false);
});
