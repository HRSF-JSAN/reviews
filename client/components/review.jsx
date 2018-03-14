import propTypes from 'proptypes';
import moment from 'moment';
import React from 'react';
import User from './user';
import Button from './button';
import Stars from './stars';

const Review = props => (
  <div className="rev_review">
    <User
      userName={props.review.userName}
      userPhoto={props.review.userPhoto}
      userLocation={props.review.userLocation}
      userFriends={props.review.userFriends}
      userReviews={props.review.userReviews}
    />
    <div className="rev_reviewData">
      <div id="rev_reviewDataTop">
        <div className="rev_starsDateBox">
          <div><Stars rating={props.review.rating} revId={props.review['_id']} /></div> {/* eslint-disable-line */}
          <div className="rev_date">{moment(props.review.date).format('M/D/YYYY')}</div>
        </div>
        <div>{props.review.reviewBody}</div>
      </div>
      <br />
      <div id="rev_reviewDataBottom">
        <div className="rev_buttonHeader">Was this review ...?</div>
        <div className="rev_buttonBox">
          <Button
            id={props.review['_id']} // eslint-disable-line
            restaurant={props.review.restaurant}
            score={props.review.useful}
            type="Useful"
          />
          <Button
            id={props.review['_id']} // eslint-disable-line
            restaurant={props.review.restaurant}
            score={props.review.funny}
            type="Funny"
          />
          <Button
            id={props.review['_id']} // eslint-disable-line
            restaurant={props.review.restaurant}
            score={props.review.cool}
            type="Cool"
          />
        </div>
      </div>
    </div>
  </div>
);

Review.propTypes = {
  review: propTypes.shape({
    _id: propTypes.string,
    restaurant: propTypes.number,
    userName: propTypes.string,
    userPhoto: propTypes.string,
    userLocation: propTypes.string,
    userFriends: propTypes.number,
    userReviews: propTypes.number,
    rating: propTypes.number,
    date: propTypes.string,
    reviewBody: propTypes.string,
    useful: propTypes.number,
    funny: propTypes.number,
    cool: propTypes.number,
  }).isRequired,
};

export default Review;
