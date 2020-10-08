import React from 'react';
import { categoryOptions } from '../../../../app/form-inputs/CategoryInput';
import EventCategoryMenuItem from './EventCategoriesMenuItem';
import { CategoriesContainer, CategoriesHeading } from '../../../../app/styled/event/EventCategories/EventCategories';

const EventCategoriesMenu = () => {
  return (
    <React.Fragment>
      <CategoriesHeading>Browse events by category</CategoriesHeading>
      <CategoriesContainer>
        {categoryOptions.map((option, index) => {
          if (option.key !== null) return (<EventCategoryMenuItem key={index} category={option} />);
          return null;
        })}
      </CategoriesContainer>
    </React.Fragment>
  );
};

export default EventCategoriesMenu;
