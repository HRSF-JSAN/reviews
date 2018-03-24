const express = require('express');
// const db = require('../../database/psqlReview.js');
const db = require('../../database/review.js');
const faker = require('faker');

const router = express.Router();

router.get('/restaurants/:restaurantId/reviews', (req, res) => {
  console.log("request sent");
  db.findReviewsByRestaurant(req.params.restaurantId, (err, data) => (
    err ? res.sendStatus(500) : res.send(data)
  ));
});

router.post('/restaurants/:restaurantId/reviews', (req, res) => {
  if (!req.body.rating || !req.body.review || !req.body.restaurant) {
    res.sendStatus(404);
  } else {
    const restaurantId = req.params.restaurantId;
    console.log(restaurantId);
    const review = {};
    review.userName = req.body.user || 'anonymous';
    review.userPhoto = req.body.photo || faker.image.avatar();
    review.userLocation = req.body.location || faker.address.city();
    review.rating = req.body.rating;

    let randomDate = faker.date.between('2017-12-15', '2018-03-15');

    review.date = randomDate;
    review.reviewBody = req.body.review;
    review.useful = 0;
    review.funny = 0;
    review.cool = 0;
    db.insertReview(restaurantId, review, err => (
      err ? res.sendStatus(500) : res.sendStatus(201)
    ));
  }
});

router.all('/*', (req, res) => {
  res.sendStatus(404);
});

module.exports = router;
