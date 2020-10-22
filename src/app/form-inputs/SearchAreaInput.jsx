import React from 'react';
import styled from 'styled-components';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Form, InputGroup } from 'react-bootstrap';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const SearchAreaContainer = styled.div`
  position: relative;
`;

const SearchAreaField = styled(Form.Control)`
  height: 50px !important;
`;

const SearchIcon = styled.img`
  width: 12px;
`;

const AutocompleteDropdownContainer = styled.div`
  position: absolute;
  z-index: 1000;
  top: 3.4rem;
  left: 2.4rem;
  text-align: left;
  border-radius: 4px;
  border: 1px solid #ced3da;
  overflow: hidden;
`;

class SearchAreaInput extends React.Component {
  getCoords = async (name, city) => {
    try {
      const geoCodeFetch = await geocodeByAddress(city);
      const results = await getLatLng(geoCodeFetch[0]);
      console.log(results);
    } catch (err) {
      console.log(err);
    }
  };

  handleChange = (value) => {
    const {
      field: { name },
      form: { setFieldValue },
    } = this.props;

    if (name === 'searchArea') {
      setFieldValue(name, value);
      this.getCoords(name, value);
    }
  };

  render() {
    const {
      field: { name, value },
      form: { setFieldTouched },
    } = this.props;

    return (
      <PlacesAutocomplete
        {...this.props}
        value={value}
        onChange={this.handleChange}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <SearchAreaContainer>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <SearchIcon src='/assets/pin.png' />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <SearchAreaField
                {...getInputProps({
                  placeholder: 'Location',
                })}
                onBlur={(e) => {
                  setFieldTouched(name, 'true');
                }}
              />
            </InputGroup>
            <AutocompleteDropdownContainer>
              {loading && <div>Loading...</div>}
              {suggestions.length > 0 &&
                suggestions.map((suggestion, index) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? {
                        backgroundColor: '#f5f5f5',
                        cursor: 'pointer',
                        padding: '1rem',
                      }
                    : {
                        backgroundColor: '#ffffff',
                        cursor: 'pointer',
                        padding: '1rem',
                      };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                      key={index}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
            </AutocompleteDropdownContainer>
          </SearchAreaContainer>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default SearchAreaInput;
