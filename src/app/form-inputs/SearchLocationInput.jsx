import React from 'react';
import styled from 'styled-components';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Form, InputGroup, Spinner } from 'react-bootstrap';

const SearchLocationContainer = styled.div`
  position: relative;
  width: 40rem !important;

  @media (max-width: 992px) {
    width: 100% !important;
    margin-bottom: 1rem;
  }
`;

const SearchLocationField = styled(Form.Control)`
  height: 45px !important;
`;

const SearchIcon = styled.img`
  width: 12px;
`;

const AutocompleteDropdownContainer = styled.div`
  position: absolute;
  z-index: 1000;
  top: 3.5rem;
  left: 2.4rem;
  text-align: left;
  overflow: hidden;
`;

const Loading = styled.div`
  background: #ffffff;
`;

class SearchLocationInput extends React.Component {
  handleChange = (value) => {
    const {
      field: { name },
      form: { setFieldValue },
    } = this.props;

    if (name === 'searchLocation') {
      setFieldValue(name, value);
      this.props.getCoords(value);
    }
  };

  componentDidMount = () => {
    const {
      field: { name, value },
      form: { setFieldValue },
    } = this.props;
    setFieldValue(name, value);
    this.props.getCoords(value);
  }

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
          <SearchLocationContainer>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <SearchIcon src='/assets/pin.png' />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <SearchLocationField
                {...getInputProps({
                  placeholder: 'Location',
                })}
                onBlur={(e) => {
                  setFieldTouched(name, 'true');
                }}
              />
            </InputGroup>
            <AutocompleteDropdownContainer>
              {loading && <Loading><Spinner animation='border' size='sm' variant='primary' />Loading...</Loading>}
              {suggestions.length > 0 &&
                suggestions.map((suggestion, index) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
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
          </SearchLocationContainer>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default SearchLocationInput;
