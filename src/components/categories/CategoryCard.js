import React from 'react';

// ** Custom Components
import {
  CategoryImage,
  CategoryName,
  FavouriteCategoryWrapper,
} from '../../styles/components';

const CategoryCard = ({onPress, imgUrl, title}) => {
  return (
    <FavouriteCategoryWrapper disabled={true} onPress={onPress}>
      <CategoryImage source={{uri: imgUrl}} resizeMode={'cover'} />
      <CategoryName>{title}</CategoryName>
    </FavouriteCategoryWrapper>
  );
};

export default CategoryCard;
