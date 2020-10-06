import React from 'react';
import { categoryOptions } from '../../../app/form-inputs/CategoryInput';
import EventCategory from './EventCategory';
import { CategoriesContainer, CategoriesHeading } from '../../../app/styled/event/EventCategories/EventCategories';

const EventCategories = () => {
  return (
    <React.Fragment>
      <CategoriesHeading>Browse events by category</CategoriesHeading>
      <CategoriesContainer>
        {categoryOptions.map((option) => {
          if (option.key !== null) return <EventCategory category={option} />;
        })}
      </CategoriesContainer>
    </React.Fragment>
  );
};

export default EventCategories;
