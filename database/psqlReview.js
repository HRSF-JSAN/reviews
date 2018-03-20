const { Pool, Client } = require('pg');
require('dotenv').config();

const client = new Client({
  user: 'aj2016',
  host: 'localhost',
  database: 'foodigo',
  password: '',
  port: 5432,
});

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected');
  }
});

const insertReview = (restaurantID, reviewObject, callback) => {
  Restaurant.update(
    { id: restaurantID },
    { $push: { reviews: reviewObject } },
    (err) => {
      if (err) {
        callback(err);
      } else {
        callback();
      }
    },
  );
};

const findReview = (reviewId, callback) => {
  Restaurant.findById(reviewId).exec(callback);
};

const updateReview = (reviewId, property, value, callback) => {
  Restaurant.findById(reviewId, (err, review) => {
    if (err) {
      callback(err, null);
    }
    review[property] = value; // eslint-disable-line
    review.save(callback);
  });
};

const findReviewsByRestaurant = (restaurantId, callback) => {
  console.log("got here", restaurantId);
  const queryString = `SELECT  
    reviews.restaurant_id, 
    restaurants.restaurant_id, 
    restaurants.restaurant_name, 
    users.username, 
    users.user_location, 
    users.user_friends, 
    users.user_photo, 
    reviews.rating, 
    reviews.date, 
    reviews.review_body,
    reviews.useful,
    reviews.funny,
    reviews.cool 
    FROM reviews 
    INNER JOIN restaurants 
    ON reviews.restaurant_id = restaurants.restaurant_id 
    INNER JOIN users
    ON reviews.user_id=users.user_id 
    WHERE reviews.restaurant_id=${restaurantId}`;
  client.query(queryString, (err, res) => {
    if (err) {
      callback(err);
    } else {
      const data = [{}];
      data[0].reviews = [];
      res.rows.forEach((review) => {
        const reviewObj = {};
        reviewObj.userName = review.username;
        reviewObj.userPhoto = review.user_photo;
        reviewObj.userLocation = review.user_location;
        reviewObj.userFriends = review.user_friends;
        reviewObj.rating = review.rating;
        reviewObj.funny = review.funny;
        reviewObj.cool = review.cool;
        reviewObj.useful = review.useful;
        reviewObj.restaurantName = review.restaurant_name;
        reviewObj.reviewBody = review.review_body;
        reviewObj.date = review.date;
        data[0].reviews.push(reviewObj);
      });
      client.query(`SELECT restaurant_name, restaurant_id FROM restaurants WHERE restaurant_id=${restaurantId}`, (err1, res1) => {
        if (err) {
          callback(err1);
        } else {
          data[0].restaurantName = res1.rows[0].restaurant_name;
          data[0].id = res1.rows[0].restaurant_id;
          callback(null, data);
        }
      });
    }
  });
};

const findHighestRestaurantId = (callback) => {
  Restaurant.findOne().sort('-restaurant').exec(callback);
};


module.exports.insertReview = insertReview;
module.exports.findReview = findReview;
module.exports.updateReview = updateReview;
module.exports.findReviewsByRestaurant = findReviewsByRestaurant;
module.exports.findHighestRestaurantId = findHighestRestaurantId;
