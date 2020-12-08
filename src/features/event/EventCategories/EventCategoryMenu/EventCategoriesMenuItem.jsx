import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CategoryCard = styled.div`
  background: #fff;
  text-decoration: none;
  color: #333;
  display: flex;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ddd;
`;

export const CategoryCardImage = styled.img`
   margin-right: 1rem;
   object-fit: cover;
   height: 5rem;
   width: 8rem;


  @media(max-width: 768px) {
    margin-right: .6rem;
  }

  @media(max-width: 563px) {
    margin-right: 4rem;
  }
`;

export const CategoryCardText = styled.h6`
  margin: 0;
  font-size: 1rem;
  padding-right: .5rem;

  @media(max-width: 768px) {
    font-size: 0.9rem;
  }
`;

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
