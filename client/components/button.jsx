import React from 'react';
import propTypes from 'proptypes';
import helpers from '../ajaxHelpers/ajaxHelpers';

const buttonIcon = {
  Useful: 'https://s3-us-west-1.amazonaws.com/foodigoiconlib/greyLightbulb.png',
  Funny: 'https://s3-us-west-1.amazonaws.com/foodigoiconlib/greySmileyFace.png',
  Cool: 'https://s3-us-west-1.amazonaws.com/foodigoiconlib/greyCoolFace.png',
};

class Button extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.type,
      score: this.props.score,
      clicked: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const route = `/restaurants/${this.props.restaurant}/reviews/${this.props.id}`;
    const { type, score } = this.state;
    const request = {};
    request[type.toLowerCase()] = score;

    if (this.state.clicked) {
      request[type.toLowerCase()] = score - 1;
      helpers.put(route, request);

      this.setState({
        clicked: false,
        score: score - 1,
      });
    } else {
      request[type.toLowerCase()] = score + 1;
      helpers.put(route, request);

      this.setState({
        clicked: true,
        score: score + 1,
      });
    }
  }

  render() {
    return (
      <button className="rev_socialPoints" onClick={this.handleClick}>
        <img alt="" className="rev_buttonImage rev_buttonAspect" src={buttonIcon[this.props.type]} />
        <div className="rev_buttonType rev_buttonAspect"> {this.state.type}</div>
        <div className="rev_buttonAspect">{this.state.score > 0 ? ` ${this.state.score}` : ''}</div>
      </button>
    );
  }
}

Button.propTypes = {
  id: propTypes.string.isRequired,
  restaurant: propTypes.number.isRequired,
  score: propTypes.number.isRequired,
  type: propTypes.string.isRequired,
};

export default Button;
