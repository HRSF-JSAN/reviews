const express = require('express');
const db = require('../../database/review.js');

const router = express.Router();


router.get('/restaurants/:restaurantId/reviews', (req, res) => {
  db.findReviewsByRestaurant(req.params.restaurantId, (err, data) => (
    err ? res.sendStatus(500) : res.json(data)
  ));
});


router.post('/restaurants/:restaurantId/reviews', (req, res) => {
  if (!req.body.rating || !req.body.review || !req.body.restaurant) {
    res.sendStatus(404);
  } else {
    const review = {
      restaurant: req.params.restaurantId,
      restaurantName: req.body.restaurant,
      userName: req.body.user || 'anonymous',
      userPhoto: req.body.photo || 'https://s3-us-west-1.amazonaws.com/foodigouserphotos/DefaultUser.png',
      userLocation: req.body.location || 'San Francisco, CA',
      rating: req.body.rating,
      date: new Date(),
      reviewBody: req.body.review,
      useful: 0,
      funny: 0,
      cool: 0,
    };

    db.insertReview(review, err => (
      err ? res.sendStatus(500) : res.sendStatus(201)
    ));
  }
});


router.put('/restaurants/:restaurantId/reviews/:reviewId', (req, res) => {
  const requestKeys = Object.keys(req.body);
  const key = requestKeys[0];

  if (requestKeys.length !== 1) {
    res.sendStatus(404);
  } else if (key !== 'cool' && key !== 'funny' && key !== 'useful') {
    res.sendStatus(404);
  } else {
    db.updateReview(req.params.reviewId, key, req.body[key], err => (
      err ? res.sendStatus(500) : res.sendStatus(200)
    ));
  }
});


router.all('/*', (req, res) => {
  res.sendStatus(404);
});


module.exports = router;
