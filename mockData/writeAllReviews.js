const generateReview = require('./reviewGenerator.js');
const helpers = require('./reviewsHelperData.js');

const writeReviews = (restList) => {
  const allReviews = [];

  restList.forEach((restObj) => {
    const { rating } = restObj;
    const possibleRatings = helpers.reviewRatings[rating];
    const actualRatings = possibleRatings[helpers.getRandomNumber(possibleRatings.length)];

    actualRatings.forEach((curRating) => {
      const date = helpers.dates[helpers.getRandomNumber(helpers.dates.length)];
      const curReview = generateReview(restObj, curRating, date);
      allReviews.push(curReview);
    });
  });

  return allReviews;
};

module.exports = writeReviews;
