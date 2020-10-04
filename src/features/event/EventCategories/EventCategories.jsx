import React from 'react';
import { categoryOptions } from '../../../app/form-inputs/CategoryInput';
import EventCategory from './EventCategory';

const EventCategories = () => {
  
  return (
    <div>
      <h6 style={{ fontWeight: 600 }}>Browse events by category</h6>
      {categoryOptions.map(option => {
        if(option.key !== null) 
        return (
          <EventCategory category={option} />
        )
      })}
    </div>
  );
};

export default EventCategories;
