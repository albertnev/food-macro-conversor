import React, { useState } from 'react';
import cx from 'classnames';
import Image from 'next/image';
import { FoodSearchResultTd } from '../../types/FoodSearchResultTd';

import styles from './FoodList.module.scss';

interface FoodListProps {
  foodList: FoodSearchResultTd[];
  onSelect?: (foodId: string) => void;
}

const FoodList: React.FC<FoodListProps> = ({ foodList, onSelect }) => {
  const [selectedFoodId, setSelectedFoodId] = useState<string>();

  const selectFood = (foodId: string) => {
    if (onSelect) {
      setSelectedFoodId(foodId);
      onSelect(foodId);
    }
  };

  return (
    <ul className={styles.foodList}>
      {foodList?.length &&
        foodList.map(({ id, imageUrl, name }) => (
          <li
            key={`food-${id}`}
            className={cx({ [styles.selected]: selectedFoodId === id })}
          >
            <div
              role="presentation"
              onClick={() => selectFood(id)}
              onKeyDown={() => selectFood(id)}
            >
              <div className={styles.foodImage}>
                <Image
                  height="100%"
                  objectFit="contain"
                  src={imageUrl || '/images/foodNotFound.png'}
                  unoptimized
                  width="100%"
                />
              </div>
              <div className={styles.foodDetails}>
                <div className={styles.foodName}>{name}</div>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
};

FoodList.defaultProps = {
  onSelect: undefined,
};

export default FoodList;
