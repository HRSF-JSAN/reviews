import React from 'react';
import propTypes from 'proptypes';
import Star from './star';

const Stars = (props) => {
  const { rating } = props;
  const starArray = [];

  if (props.addedClass === '') {
    for (let i = 0; i < 5; i += 1) {
      if (i < rating) {
        starArray.push('rev_selectedStar');
      } else {
        starArray.push('rev_greyStar');
      }
    }
  } else {
    for (let i = 0; i < 5; i += 1) {
      if (i < rating) {
        starArray.push(`rev_selectedStar ${props.addedClass} rev_star${i}`);
      } else {
        starArray.push(`rev_greyStar ${props.addedClass} rev_star${i}`);
      }
    }
  }

  return (
    <div className={props.addedClass !== '' ? `rev_starBox ${props.addedClass}` : 'rev_starBox'}>
      {starArray.map((star, index) => (
        <Star
          type={star}
          addedClass={props.addedClass}
          key={`${props.revId}-star${index}`} // eslint-disable-line
          handleClick={props.handleClick}
          handleHover={props.handleHover}
          handleLeave={props.handleLeave}
        />
      ))}
    </div>
  );
};

Stars.propTypes = {
  rating: propTypes.number.isRequired,
  addedClass: propTypes.string,
  revId: propTypes.string.isRequired,
  handleClick: propTypes.func,
  handleHover: propTypes.func,
  handleLeave: propTypes.func,
};

Stars.defaultProps = {
  addedClass: '',
  handleClick: () => (null),
  handleHover: () => (null),
  handleLeave: () => (null),
};

export default Stars;
