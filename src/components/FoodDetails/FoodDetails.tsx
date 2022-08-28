import { useTranslation } from 'next-i18next';
import React from 'react';
import cx from 'classnames';

import { FoodDetailsTd } from '../../types/FoodDetailsTd';
import { MacroDisplay } from '../MacroDisplay';

import styles from './FoodDetails.module.scss';

interface FoodDetailsProps {
  food: FoodDetailsTd;
  isSummary?: boolean;
  verticalDisplay?: boolean;
}

const FoodDetails: React.FC<FoodDetailsProps> = ({
  food,
  isSummary,
  verticalDisplay,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={cx({
        [styles.foodDetailsContainer]: true,
        [styles.verticalDisplay]: verticalDisplay,
      })}
    >
      <div className={styles.titleContainer}>
        <div
          className={styles.image}
          style={{
            backgroundImage: `url(${
              food.imageUrl || '/images/foodNotFound.png'
            })`,
          }}
        />
        <div className={styles.nameContainer}>
          <h2 className={styles.name}>{food.name}</h2>
          {food.brand && <div className={styles.brand}>{food.brand}</div>}
        </div>
      </div>
      <MacroDisplay food={food} verticalDisplay={verticalDisplay} />
      {!isSummary && (
        <div className={styles.ingredientsContainer}>
          <span className={styles.detailTitle}>{t('ingredients')}:</span>{' '}
          <span className={styles.detailValue}>
            {food.ingredients || t('withoutInformation')}
          </span>
        </div>
      )}
    </div>
  );
};

FoodDetails.defaultProps = {
  isSummary: false,
  verticalDisplay: false,
};

export default FoodDetails;
