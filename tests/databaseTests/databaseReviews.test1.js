const db = require('../../database/review.js');
const seed = require('../../mockData/seedFunc.js');
const writeReview = require('../../mockData/reviewGenerator.js');
const allRestaurants = require('../../mockData/basicRestaurantData.js');

// describe('seeder', () => {
//   test('Seed function seeds database with mock reviews', (done) => {
//     db.findReviewsByRestaurant(101, (err, res) => {
//       if (err) {
//         done(err);
//       }
//       const startLength = res.length;
//       seed(allRestaurants, (errors) => {
//         if (errors) {
//           done(errors);
//         } else {
//           db.findReviewsByRestaurant(101, (error, results) => {
//             if (error) {
//               done(error);
//             }
//             const endLength = results.length;

//             expect(endLength).toBeGreaterThan(startLength);
//             done();
//           });
//         }
//       });
//     });
//   });
// });

// describe('database functions', () => {
//   let insertedReviewId;

//   test('insertReview function writes a new review to the database', (done) => {
//     const newReview = writeReview(allRestaurants[0], 3, 'February 19, 2018 11:22:00');
//     db.insertReview(newReview, (err, result) => {
//       if (err) {
//         done(err);
//       }
//       insertedReviewId = result['_id']; //eslint-disable-line
//       expect(insertedReviewId).toBeTruthy();
//       done();
//     });
//   });

//   test('findReview function returns the review with the given id', (done) => {
//     db.findReview(insertedReviewId, (err, res) => {
//       if (err) {
//         done(err);
//       }
//       expect(typeof res).toBe('object');
//       expect(res.rating).toBe(3);
//       done();
//     });
//   });

//   test('updateReview function updates the specified review property with the given value', (done) => {
//     db.updateReview(insertedReviewId, 'cool', 10, (err, res) => {
//       if (err) {
//         done(err);
//       }
//       expect(res.cool).toBe(10);
//       done();
//     });
//   });

//   test('findReviewsByRestaurant function returns an array of reviews for specified restaurant', (done) => {
//     db.findReviewsByRestaurant(102, (err, res) => {
//       if (err) {
//         done(err);
//       }
//       expect(Array.isArray(res)).toBe(true);
//       res.forEach((review) => {
//         expect(review.restaurant).toBe(102);
//       });
//       done();
//     });
//   });

//   test('findHighestRestaurantId function returns one review for the restaurant with the highest id', (done) => {
//     db.findHighestRestaurantId((err, res) => {
//       if (err) {
//         done(err);
//       }
//       expect(res.restaurant).toBe(200);
//       done();
//     });
//   });
// });
