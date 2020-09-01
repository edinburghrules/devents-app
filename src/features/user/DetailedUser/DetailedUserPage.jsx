import React from 'react';
import { connect } from 'react-redux';
import DetailedUserHeader from './DetailedUserHeader';
import DetailedUserAbout from './DetailedUserAbout';
import DetailedUserEvents from './DetailedUserEvents';
import DetailedUserEdit from './DetailedUserEdit';

class DetailedUserPage extends React.Component {
  render() {
    const { userDetails } = this.props;
    return (
      <div className='detailed-user-page'>
        <div className='detailed-user-page-col-left'>
          <DetailedUserHeader userDetails={userDetails} />
          <DetailedUserAbout userDetails={userDetails} />
          <DetailedUserEvents />
        </div>
        <div className='detailed-user-page-col-right'>
          <DetailedUserEdit />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userDetails: state.profile.userProfile,
});

export default connect(mapStateToProps)(DetailedUserPage);
