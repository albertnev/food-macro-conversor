import { useTranslation } from 'next-i18next';
import React from 'react';
import cx from 'classnames';

import { FoodDetailsTd } from '../../types/FoodDetailsTd';
import { MacroDisplay } from '../MacroDisplay';
import { StFoodDetailsContainer } from './FoodDetails.styled';

interface FoodDetailsProps {
  className?: string;
  food: FoodDetailsTd;
  isSummary?: boolean;
  titleDecorator?: React.ReactNode;
  verticalDisplay?: boolean;
}

const FoodDetails: React.FC<FoodDetailsProps> = ({
  className,
  food,
  isSummary,
  titleDecorator,
  verticalDisplay,
}) => {
  const { t } = useTranslation();

  return (
    <StFoodDetailsContainer
      className={cx({
        [className!]: !!className,
        foodDetails__verticalDisplay: verticalDisplay,
        foodDetailsContainer: true,
      })}
      data-testid="food-details"
    >
      <div className="foodDetails__titleContainer">
        <div
          className="foodDetails__image"
          data-testid="food-details-image"
          style={{
            backgroundImage: `url(${
              food.imageUrl || '/images/foodNotFound.png'
            })`,
          }}
        />
        <div className="foodDetails__nameContainer">
          <h2 className="foodDetails__nameTitle">{food.name}</h2>
          {food.brand && <div className="foodDetails__brand">{food.brand}</div>}
          {titleDecorator}
        </div>
      </div>
      <MacroDisplay food={food} verticalDisplay={verticalDisplay} />
      {!isSummary && (
        <div className="foodDetails__ingredientsContainer">
          <span className="foodDetails__detailTitle">{t('ingredients')}:</span>{' '}
          <span className="foodDetails__detailValue">
            {food.ingredients || t('withoutInformation')}
          </span>
        </div>
      )}
    </StFoodDetailsContainer>
  );
};

FoodDetails.defaultProps = {
  className: '',
  isSummary: false,
  titleDecorator: null,
  verticalDisplay: false,
};

export default FoodDetails;
