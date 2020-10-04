import React from 'react'
import { Link } from 'react-router-dom';
import { CategoryCard, CategoryCardImage } from '../../../app/styled/event/EventCategories/EventCategory';

const EventCategory = (props) => {
  return (
      <Link style={{textDecoration: 'none'}} to={`/event-category/${props.category.value}`}>
        <CategoryCard>
          <CategoryCardImage src={props.category.img && props.category.img }/>
          <h6>{props.category.text}</h6>
        </CategoryCard>
      </Link>
  )
}

export default EventCategory;
