import React from 'react';
import styled from 'styled-components';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Form, InputGroup } from 'react-bootstrap';

const SearchAreaContainer = styled.div`
  position: relative;
  width: 50% !important;
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
  top: 3.5rem;
  left: 2.4rem;
  text-align: left;
  overflow: hidden;
`;

class SearchAreaInput extends React.Component {
  handleChange = (value) => {
    const {
      field: { name },
      form: { setFieldValue },
    } = this.props;

    if (name === 'searchArea') {
      setFieldValue(name, value);
      this.props.getCoords(value);
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
