import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import {
  SearchTextCard,
  SearchIcon,
  SearchTextContainer,
  SearchTextField,
} from '../styled/global/forms/forms';

const SearchTextInput = (props) => {
  return (
    <SearchTextCard>
      <SearchTextContainer>
        <SearchTextField>
          <InputGroup.Prepend>
            <InputGroup.Text>
              <SearchIcon src='/assets/magnifying-glass.png'/>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control {...props}></Form.Control>
        </SearchTextField>
      </SearchTextContainer>
    </SearchTextCard>
  );
};

export default SearchTextInput;
