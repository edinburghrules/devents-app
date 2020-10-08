import React from 'react'
import { Link } from 'react-router-dom';
import { CategoryCard, CategoryCardImage, CategoryCardText } from '../../../../app/styled/event/EventCategories/EventCategory';

const EventCategoryMenuItem = (props) => {
  return (
      <Link style={{textDecoration: 'none'}} to={`/event-category/${props.category.value}`}>
        <CategoryCard>
          <CategoryCardImage src={props.category.img && props.category.img }/>
          <CategoryCardText>{props.category.text}</CategoryCardText>
        </CategoryCard>
      </Link>
  )
}

export default EventCategoryMenuItem;
