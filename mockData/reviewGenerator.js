const data = require('./reviewBodyGenerator.js');
const users = require('./mockUsers.js');
const helpers = require('./reviewsHelperData.js');

const generateReview = (restaurantObj, numStars, date) => {
  const curUser = users[helpers.getRandomNumber(users.length)];
  if (numStars > 5 || numStars < 1) {
    return undefined;
  }

  const review = {
    restaurant: restaurantObj.id,
    restaurantName: restaurantObj.title,
    userName: curUser.name,
    userPhoto: curUser.photo,
    userLocation: curUser.location,
    userFriends: curUser.friends,
    userReviews: curUser.reviews,
    rating: numStars,
    date: new Date(date),
    reviewBody: data(restaurantObj.foodType, restaurantObj.title, numStars),
    useful: helpers.getRandomNumber(7),
    funny: helpers.getRandomNumber(7),
    cool: helpers.getRandomNumber(7),
  };

  return review;
};

module.exports = generateReview;
