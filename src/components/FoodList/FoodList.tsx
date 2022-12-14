import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import Image from 'next/image';
import { GiOrange } from 'react-icons/gi';
import { CgDatabase } from 'react-icons/cg';
import { FaUserAlt } from 'react-icons/fa';

import { FoodSearchResultTd } from '../../types/FoodSearchResultTd';
import { foodDataSources } from '../../constants/foodDataSources';
import { StFoodList } from './FoodList.styled';

interface FoodListProps {
  className?: string;
  foodList: FoodSearchResultTd[];
  onSelect?: (food: FoodSearchResultTd) => void;
  selectedFoodId?: string;
}

const FoodList: React.FC<FoodListProps> = ({
  className,
  foodList,
  onSelect,
  selectedFoodId: selectedFoodIdProp,
}) => {
  const [selectedFoodId, setSelectedFoodId] = useState(selectedFoodIdProp);

  const selectFood = (food: FoodSearchResultTd) => {
    setSelectedFoodId(food.id);

    if (onSelect) {
      onSelect(food);
    }
  };

  const sourceIcons = {
    [foodDataSources.bedca]: <CgDatabase data-testid="icon-bedca" />,
    [foodDataSources.openfoodfacts]: (
      <GiOrange data-testid="icon-openfoodfacts" />
    ),
    [foodDataSources.database]: <FaUserAlt data-testid="icon-database" />,
  };

  useEffect(() => {
    setSelectedFoodId(selectedFoodIdProp);
  }, [selectedFoodIdProp]);

  return (
    <StFoodList
      className={cx({ [className!]: !!className, foodList: true })}
      data-testid="food-list"
    >
      {foodList?.length &&
        foodList.map((food) => (
          <li
            key={`food-${food.id}`}
            className={cx({
              foodList__item: true,
              'foodList__item--selected': selectedFoodId === food.id,
            })}
          >
            <div
              data-testid="food-list-item-wrapper"
              role="presentation"
              onClick={() => selectFood(food)}
              onKeyDown={() => selectFood(food)}
            >
              <div className="foodList__foodImage">
                <Image
                  height="100%"
                  objectFit="contain"
                  src={food.imageUrl || '/images/foodNotFound.png'}
                  unoptimized
                  width="100%"
                />
              </div>
              <div className="foodList__foodDetails">
                <div className="foodList__foodName">{food.name}</div>
                <div className="foodList__sourceIcon">
                  {sourceIcons[food.datasource]}
                </div>
              </div>
            </div>
          </li>
        ))}
    </StFoodList>
  );
};

FoodList.defaultProps = {
  className: '',
  onSelect: undefined,
  selectedFoodId: '',
};

export default FoodList;
