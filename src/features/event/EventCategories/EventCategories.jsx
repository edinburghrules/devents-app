import React from 'react';
import { categoryOptions } from '../../../app/form-inputs/CategoryInput';
import EventCategory from './EventCategory';
import { CategoriesContainer } from '../../../app/styled/event/EventCategories/EventCategories';

const EventCategories = () => {
  return (
    <div>
      <h6 style={{ fontWeight: 600 }}>Browse events by category</h6>
      <CategoriesContainer>
        {categoryOptions.map((option) => {
          if (option.key !== null) return <EventCategory category={option} />;
        })}
      </CategoriesContainer>
    </div>
  );
};

export default EventCategories;
