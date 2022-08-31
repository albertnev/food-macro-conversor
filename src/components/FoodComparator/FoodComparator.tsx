import React from 'react';
import cx from 'classnames';
import { TbArrowsRightLeft } from 'react-icons/tb';

import { useTranslation } from 'next-i18next';
import { FoodDetailsTd } from '../../types/FoodDetailsTd';
import { FoodDetails } from '../FoodDetails';
import { StFoodComparatorContainer } from './FoodComparator.styled';
import { Button } from '../Button';

export interface FoodComparatorProps {
  className?: string;
  foodsToCompare: FoodDetailsTd[];
  icon?: React.ReactNode;
  onChangeFood?: (food: FoodDetailsTd) => void;
  verticalDisplay?: boolean;
}

const FoodComparator: React.FC<FoodComparatorProps> = ({
  className,
  foodsToCompare,
  icon,
  onChangeFood,
  verticalDisplay,
}) => {
  const { t } = useTranslation();
  return (
    <StFoodComparatorContainer
      className={cx({
        [className!]: !!className,
        foodComparator: true,
      })}
    >
      {foodsToCompare.map((food, i) => (
        <React.Fragment key={`food-${food.id}`}>
          <FoodDetails
            food={food}
            isSummary
            titleDecorator={
              onChangeFood ? (
                <Button
                  className="foodComparator__foodActionButton"
                  label={t('changeFood')}
                  secondary
                  onClick={() => onChangeFood(food)}
                />
              ) : null
            }
            verticalDisplay={verticalDisplay}
          />
          {i < foodsToCompare.length - 1 && (
            <div className="foodComparator__equivalenceIconContainer">
              {icon || <TbArrowsRightLeft />}
            </div>
          )}
        </React.Fragment>
      ))}
    </StFoodComparatorContainer>
  );
};

FoodComparator.defaultProps = {
  className: '',
  icon: undefined,
  onChangeFood: undefined,
  verticalDisplay: true,
};

export default FoodComparator;
