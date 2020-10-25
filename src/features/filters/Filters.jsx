import React from 'react';
import styled from 'styled-components';
import { Form, Button, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withFormik, Field } from 'formik';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { getEvents } from '../../app/redux/actions/eventActions';
import SearchTextInput from '../../app/form-inputs/SearchTextInput';
import SearchAreaInput from '../../app/form-inputs/SearchLocationInput';

const SearchFiltersCard = styled.div`
  box-shadow: 0 4px 2px -2px #e0e0e0;
  background: #fff;
  margin: 8rem 12rem 2rem 12rem;
  padding: 30px;
  border-radius: 8px;
`;

const SearchFiltersContainer = styled(Form.Group)`
  margin: 0;
  width: 100%;
`;

const SearchFiltersForm = styled(Form)`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const SearchFiltersInputs = styled.div`
  width: 80%;
  display: flex;
`;

const SearchButton = styled(Button)`
  width: 10rem;
  height: 45px;
  background: #ff6f61 !important;
  border-color: #fff !important;
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
      console.log(searchCoords)
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    const { handleSubmit, submitting } = this.props;
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
              {submitting ? (
                <Spinner animation='border' size='sm' variant='light' />
              ) : (
                'Search'
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
      searchLocation: props.userCoords ? props.userLocation : '',
    };
  },
  handleSubmit: async (values, formikBag) => {
    const { props } = formikBag;
    if (values.searchLocation !== '') {
      try {
        await props.getEvents(searchCoords);
        props.history.push(`/search-results/${values.searchText === '' ? 'no-search-string' : values.searchText}`);
      } catch (err) {
        new Error(err);
      }
    }
  },
})(Filters);

const mapStateToProps = (state) => {
  return {
    submitting: state.async.submitting,
    userCoords: state.profile.userCoords,
    userLocation: state.profile.userLocation
  };
};

const mapDispatchToProps = {
  getEvents,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(eventFilters));
