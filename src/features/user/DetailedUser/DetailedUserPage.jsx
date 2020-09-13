import React from 'react';
import { connect } from 'react-redux';
import DetailedUserHeader from './DetailedUserHeader';
import DetailedUserAbout from './DetailedUserAbout';
import DetailedUserEvents from './DetailedUserEvents';
import {
  DetailedUserContainer,
  DetailedUserCard,
} from '../../../app/styled/user/DetailedUser/DetailedUser';

class DetailedUserPage extends React.Component {
  render() {
    const { userDetails } = this.props;
    return (
      <DetailedUserContainer>
        <DetailedUserCard>
          <DetailedUserHeader userDetails={userDetails} />
          <DetailedUserAbout userDetails={userDetails} />
          <DetailedUserEvents />
        </DetailedUserCard>
      </DetailedUserContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  userDetails: state.profile.userProfile,
});

export default connect(mapStateToProps)(DetailedUserPage);
