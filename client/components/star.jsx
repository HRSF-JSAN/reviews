import React from 'react';
import propTypes from 'proptypes';

const star = 'https://s3-us-west-1.amazonaws.com/foodigouserphotos/Star.png';

const Star = props => (
  <div // eslint-disable-line
    className={`rev_star ${props.type}`}
    onMouseEnter={props.handleHover}
    onMouseLeave={props.handleLeave}
    onClick={props.handleClick}
  >
    <img className={props.addedClass !== '' ? `rev_starImg ${props.addedClass} ${props.type}` : `rev_starImg ${props.type}`} src={star} alt="star img" />
  </div>
);

Star.propTypes = {
  type: propTypes.string.isRequired,
  addedClass: propTypes.string,
  handleClick: propTypes.func,
  handleHover: propTypes.func,
  handleLeave: propTypes.func,
};

Star.defaultProps = {
  addedClass: '',
  handleClick: () => (null),
  handleHover: () => (null),
  handleLeave: () => (null),
};

export default Star;
