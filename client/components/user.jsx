import React from 'react';
import propTypes from 'proptypes';

const User = props => (
  <div className={props.addedClass !== '' ? `rev_users ${props.addedClass}` : 'rev_users'}>
    <div className="rev_userFlex">
      <div className="rev_userLeft">
        <img alt={props.userName} className="rev_userPhotos" src={props.userPhoto} />
      </div>
      <div className="rev_userRight">
        <div className="rev_userNames">{props.userName}</div>
        <div className="rev_userLocations">{props.userLocation}</div>
        <div className="rev_userSpecials">
          <img alt="friends" className="rev_userIcons" src="https://s3-us-west-1.amazonaws.com/foodigoiconlib/orangeFriendsIcon.png" />
          <div className="rev_specialsCount">
            <span className="rev_specialsNum">{props.userFriends}
            </span> friends
          </div>
        </div>
        <div className="rev_userSpecials">
          <img alt="userReviews" className="rev_userIcons" src="https://s3-us-west-1.amazonaws.com/foodigoiconlib/orangeStar.png" />
          <div className="rev_specialsCount">
            <span className="rev_specialsNum">{props.userReviews}
            </span> reviews
          </div>
        </div>
      </div>
    </div>
    <div className="rev_userActions">
      <div className="rev_actionLine">
        <img alt="" className="rev_actionIcons" src="https://s3-us-west-1.amazonaws.com/foodigoiconlib/blueShareIcon.png" />
        <div className="rev_action">Share Review</div>
      </div>
      <div className="rev_actionLine">
        <img alt="" className="rev_actionIcons" src="https://s3-us-west-1.amazonaws.com/foodigoiconlib/blueEmbedIcon.png" />
        <div className="rev_action">Embed Review</div>
      </div>
      <div className="rev_actionLine">
        <img alt="" className="rev_actionIcons" src="https://s3-us-west-1.amazonaws.com/foodigoiconlib/blueCompliment.png" />
        <div className="rev_action">Compliment</div>
      </div>
      <div className="rev_actionLine">
        <img alt="" className="rev_actionIcons" src="https://s3-us-west-1.amazonaws.com/foodigoiconlib/blueRoundMessage.png" />
        <div className="rev_action">Send Message</div>
      </div>
      <div className="rev_actionLine rev_lastAction">
        <img alt="" className="rev_actionIcons" src="https://s3-us-west-1.amazonaws.com/foodigoiconlib/blueFollowIcon.png" />
        <div className="rev_action">Follow {props.userName}</div>
      </div>
    </div>
  </div>
);

User.propTypes = {
  userName: propTypes.string,
  userPhoto: propTypes.string,
  userLocation: propTypes.string,
  userFriends: propTypes.number,
  userReviews: propTypes.number,
  addedClass: propTypes.string,
};

User.defaultProps = {
  userName: '',
  userPhoto: 'https://s3-us-west-1.amazonaws.com/foodigouserphotos/DefaultUser.png',
  userLocation: '',
  userFriends: 0,
  userReviews: 0,
  addedClass: '',
};

export default User;
