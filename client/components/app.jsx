import React from 'react';
import propTypes from 'proptypes';
import WriteReview from './writeReview';
import Reviews from './reviews';
import helpers from '../ajaxHelpers/ajaxHelpers';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      restaurant: '',
      restId: 0,
    };
    this.setReviews = this.setReviews.bind(this);
  }

  componentDidMount() {
    this.setReviews(this.props.restaurantId);
  }

  setReviews(restaurantId) {
    helpers.get(`/restaurants/${restaurantId}/reviews`, (data) => {
      this.setState({
        reviews: data,
        restaurant: data[0].restaurantName,
        restId: data[0].restaurant,
      });
    });
  }

  render() {
    return (
      <div>
        <WriteReview
          updateReviews={this.setReviews}
          restaurant={this.state.restaurant}
          restId={this.state.restId}
        />
        <Reviews
          reviews={this.state.reviews}
        />
      </div>
    );
  }
}

App.propTypes = {
  restaurantId: propTypes.number.isRequired,
};

export default App;
