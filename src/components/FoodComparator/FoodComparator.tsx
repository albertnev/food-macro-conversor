import React from 'react';
import cx from 'classnames';
import { TbArrowsRightLeft } from 'react-icons/tb';

import { FoodDetailsTd } from '../../types/FoodDetailsTd';
import { FoodDetails } from '../FoodDetails';
import { StFoodComparatorContainer } from './FoodComparator.styled';

interface FoodComparatorProps {
  className?: string;
  foodsToCompare: FoodDetailsTd[];
  icon?: React.ReactNode;
}

const FoodComparator: React.FC<FoodComparatorProps> = ({
  className,
  foodsToCompare,
  icon,
}) => (
  <StFoodComparatorContainer
    className={cx({
      [className!]: !!className,
      foodDetailsContainer: true,
    })}
  >
    {foodsToCompare.map((food, i) => (
      <React.Fragment key={`food-${food.id}`}>
        <FoodDetails food={food} isSummary verticalDisplay />
        {i < foodsToCompare.length - 1 && (
          <div className="foodComparator__equivalenceIconContainer">
            {icon || <TbArrowsRightLeft />}
          </div>
        )}
      </React.Fragment>
    ))}
  </StFoodComparatorContainer>
);

FoodComparator.defaultProps = {
  className: '',
  icon: undefined,
};

export default FoodComparator;
