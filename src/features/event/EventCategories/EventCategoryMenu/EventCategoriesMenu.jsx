import React from 'react';
import styled from 'styled-components';
import {Container} from 'react-bootstrap'
import { categoryOptions } from '../../../../app/form-inputs/CategoryInput';
import EventCategoryMenuItem from './EventCategoriesMenuItem';

export const CategoriesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1.5rem;
  margin-bottom: 5rem;
`;

export const CategoriesHeading = styled.h6`
  margin-bottom: 2rem;
`;

const EventCategoriesMenu = () => {
  return (
    <Container>
      <CategoriesHeading>Browse events by category</CategoriesHeading>
      <CategoriesContainer>
        {categoryOptions.map((option, index) => {
          if (option.key !== null) return (<EventCategoryMenuItem key={index} category={option} />);
          return null;
        })}
      </CategoriesContainer>
    </Container>
  );
};

export default EventCategoriesMenu;
