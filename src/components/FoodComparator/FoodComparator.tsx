import React from 'react';
import { TbArrowsRightLeft } from 'react-icons/tb';
import { FoodDetailsTd } from '../../types/FoodDetailsTd';
import { FoodDetails } from '../FoodDetails';

import styles from './FoodComparator.module.scss';

interface FoodComparatorProps {
  foodsToCompare: FoodDetailsTd[];
  icon?: React.ReactNode;
}

const FoodComparator: React.FC<FoodComparatorProps> = ({
  foodsToCompare,
  icon,
}) => (
  <div className={styles.foodDetailsContainer}>
    {foodsToCompare.map((food, i) => (
      <>
        <FoodDetails food={food} isSummary verticalDisplay />
        {i < foodsToCompare.length - 1 && (
          <div className={styles.equivalenceIconContainer}>
            {icon || <TbArrowsRightLeft />}
          </div>
        )}
      </>
    ))}
  </div>
);

FoodComparator.defaultProps = {
  icon: undefined,
};

export default FoodComparator;
