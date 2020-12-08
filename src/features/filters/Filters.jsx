import React from 'react';
import styled from 'styled-components';
import { Form, Button, Spinner, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withFormik, Field } from 'formik';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { getEvents } from '../../app/redux/actions/eventActions';
import SearchTextInput from '../../app/form-inputs/SearchTextInput';
import SearchAreaInput from '../../app/form-inputs/SearchLocationInput';
import { startSearching, stopSearching } from '../../app/redux/actions/asyncActions';
import { supplySearchLocation, supplyCoords } from '../../app/redux/actions/userActions';
import getAddressDetails, {
  getFormattedAddress,
} from '../../app/utils/locationHelper';

const SearchFiltersCard = styled(Container)`
  border: 1px solid #ddd;
  background: #fff;
  padding: 30px;
  border-radius: 8px;

  @media (max-width: 595px) {
    padding: 30px 0;
    max-width: 90%;
  }

`;

const SearchFiltersContainer = styled(Form.Group)`
  margin: 0;
  width: 100%;
`;

const SearchFiltersForm = styled(Form)`
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media(max-width: 992px) {
    flex-direction: column;
    width: 100%;
  }
`;

const SearchFiltersInputs = styled.div`
  width: 80%;
  display: flex;

  @media(max-width: 992px) {
    flex-direction: column;
    margin-bottom: 1rem;
  }
`;

const SearchButton = styled(Button)`
  width: 8rem;
  height: 45px;
  background: #ff6f61 !important;
  border none !important;
  display: flex;
  justify-content: center;
  align-items: center;
`;

let searchCoords = {
  latitude: null,
  longitude: null,
};

class Filters extends React.Component {
  getCoords = async (city) => {
    try {
      const geoCodeFetch = await geocodeByAddress(city);
      const results = await getLatLng(geoCodeFetch[0]);
      searchCoords.latitude = results.lat;
      searchCoords.longitude = results.lng;
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    const { handleSubmit, searching } = this.props;
    return (
      <SearchFiltersCard>
        <SearchFiltersContainer>
          <SearchFiltersForm onSubmit={handleSubmit}>
            <SearchFiltersInputs>
              <Field
                as={SearchTextInput}
                name='searchText'
                placeholder='Find your next event'
              />
              <Field
                getCoords={this.getCoords}
                component={SearchAreaInput}
                name='searchLocation'
                searchOptions={{ types: ['(cities)'] }}
              />
            </SearchFiltersInputs>
            <SearchButton type='submit'>
              {searching ? (
                <Spinner animation='border' size='sm' variant='light' />
              ) : (
                <span>
                  <img style={{height: '1rem', marginRight: '.5rem'}} src='/assets/search.png'/>
                  Search
                </span>
              )}
            </SearchButton>
          </SearchFiltersForm>
        </SearchFiltersContainer>
      </SearchFiltersCard>
    );
  }
}

const eventFilters = withFormik({
  mapPropsToValues: (props) => {
    return {
      searchText: '',
      searchLocation: props.searchLocation || '',
    };
  },
  handleSubmit: async (values, formikBag) => {
    const { props } = formikBag;
    if (values.searchLocation !== '') {
      try {
        props.startSearching();
        await props.getEvents(searchCoords);
        const address = await getAddressDetails({
          lat: Number(searchCoords.latitude),
          lng: Number(searchCoords.longitude),
        });
        let formattedAddress = getFormattedAddress(address);
        props.supplyCoords(searchCoords);
        props.supplySearchLocation(formattedAddress);
        props.history.push(
          `/search-results/${
            values.searchText === '' ? 'no-search-string' : values.searchText
          }`
        );
        props.stopSearching();
      } catch (err) {
        new Error(err);
      }
    }
  },
})(Filters);

const mapStateToProps = (state) => {
  return {
    searching: state.async.searching,
    userCoords: state.profile.userCoords,
    searchLocation: state.profile.searchLocation,
  };
};

const mapDispatchToProps = {
  getEvents,
  supplyCoords,
  supplySearchLocation,
  startSearching,
  stopSearching
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(eventFilters));
