import React from 'react';
import propTypes from 'proptypes';
import User from './user';
import Stars from './stars';
import helpers from '../ajaxHelpers/ajaxHelpers';

class WriteReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starsClicked: false,
      starsClickedNum: 0,
      starsHovered: 0,
      startReview: false,
    };

    this.handleStarClick = this.handleStarClick.bind(this);
    this.handleStarEnter = this.handleStarEnter.bind(this);
    this.handleStarLeave = this.handleStarLeave.bind(this);
    this.handleStartReviewClick = this.handleStartReviewClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleStarClick(event) {
    const classes = event.target.className;
    let num = classes.slice(classes.length - 1);
    num = Number(num) + 1;
    this.setState({
      starsClicked: true,
      startReview: true,
      starsClickedNum: num,
    });
  }

  handleStarEnter(event) {
    const classes = event.target.className;
    let num = classes.slice(classes.length - 1);
    num = Number(num) + 1;
    this.setState({ starsHovered: num });
  }

  handleStarLeave() {
    this.setState({ starsHovered: 0 });
  }

  handleStartReviewClick() {
    this.setState({ startReview: true });
  }

  handleCancelClick() {
    this.setState({
      startReview: false,
      starsClicked: false,
      starsClickedNum: 0,
    });
  }

  handleSubmit() {
    const reviewBody = document.getElementById('rev_input').value;
    if (this.state.starsClicked && reviewBody) {
      const request = {
        restaurantId: this.props.restId,
        restaurant: this.props.restaurant,
        rating: this.state.starsClickedNum,
        review: reviewBody,
      };

      const updatePage = () => {
        this.props.updateReviews(this.props.restId);
      };

      helpers.post(`/restaurants/${this.props.restId}/reviews`, request, updatePage);
      document.getElementById('rev_input').value = '';

      this.setState({
        starsClicked: false,
        starsClickedNum: 0,
        starsHovered: 0,
        startReview: false,
      });
    }
  }

  render() {
    return (
      <div id="rev_write">
        <User addedClass="rev_currUser" />
        <div id="rev_writeBox">
          <div
            className={this.state.startReview && !this.state.starsClicked ? 'rev_clickStars' : 'rev_hide rev_clickStars'}
          >
          Select your rating
          </div>
          <div
            className={this.state.startReview && this.state.starsClickedNum === 1 ? 'rev_clickStars' : 'rev_hide rev_clickStars'}
          >
          Eek! Methinks not.
          </div>
          <div
            className={this.state.startReview && this.state.starsClickedNum === 2 ? 'rev_clickStars' : 'rev_hide rev_clickStars'}
          >
          Meh. I've experienced better.
          </div>
          <div
            className={this.state.startReview && this.state.starsClickedNum === 3 ? 'rev_clickStars' : 'rev_hide rev_clickStars'}
          >
          A-OK.
          </div>
          <div
            className={this.state.startReview && this.state.starsClickedNum === 4 ? 'rev_clickStars' : 'rev_hide rev_clickStars'}
          >
          Yay! I'm a fan.
          </div>
          <div
            className={this.state.startReview && this.state.starsClickedNum === 5 ? 'rev_clickStars' : 'rev_hide rev_clickStars'}
          >
          Woohoo! As good as it gets!
          </div>
          <Stars
            rating={this.state.starsClicked && this.state.starsHovered === 0 ? this.state.starsClickedNum : this.state.starsHovered} // eslint-disable-line
            addedClass="rev_writeStar"
            revId="rev-writeBox"
            handleClick={this.handleStarClick}
            handleHover={this.handleStarEnter}
            handleLeave={this.handleStarLeave}
          />
          <div // eslint-disable-line
            id="rev_startReview"
            className={this.state.startReview ? 'rev_hide' : null}
            onClick={this.handleStartReviewClick}
          >
            Start your review of
            <span id="rev_restName"> {this.props.restaurant}</span>
          </div>
          <div
            id="rev_writeReviewBox"
            className={this.state.startReview ? null : 'rev_hide'}
          >
            <textarea id="rev_input" />
            <div id="rev_writeButtonBox">
              <button id="rev_writeCancel" onClick={this.handleCancelClick}>
                Cancel
              </button>
              <button id="rev_submitButton" onClick={this.handleSubmit}>
                Post Review
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

WriteReview.propTypes = {
  restaurant: propTypes.string.isRequired,
  restId: propTypes.number.isRequired,
  updateReviews: propTypes.func.isRequired,
};

export default WriteReview;
