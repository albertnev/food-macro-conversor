import React, { useState } from 'react';
import cx from 'classnames';
import Image from 'next/image';
import { GiOrange } from 'react-icons/gi';
import { CgDatabase } from 'react-icons/cg';

import { FoodSearchResultTd } from '../../types/FoodSearchResultTd';
import styles from './FoodList.module.scss';
import { foodDataSources } from '../../constants/foodDataSources';

interface FoodListProps {
  foodList: FoodSearchResultTd[];
  onSelect?: (food: FoodSearchResultTd) => void;
  selectedFoodId?: string;
}

const FoodList: React.FC<FoodListProps> = ({
  foodList,
  onSelect,
  selectedFoodId: selectedFoodIdProp,
}) => {
  const [selectedFoodId, setSelectedFoodId] = useState<string>(
    selectedFoodIdProp!,
  );

  const selectFood = (food: FoodSearchResultTd) => {
    if (onSelect) {
      setSelectedFoodId(food.id);
      onSelect(food);
    }
  };

  return (
    <ul className={styles.foodList}>
      {foodList?.length &&
        foodList.map((food) => (
          <li
            key={`food-${food.id}`}
            className={cx({ [styles.selected]: selectedFoodId === food.id })}
          >
            <div
              role="presentation"
              onClick={() => selectFood(food)}
              onKeyDown={() => selectFood(food)}
            >
              <div className={styles.foodImage}>
                <Image
                  height="100%"
                  objectFit="contain"
                  src={food.imageUrl || '/images/foodNotFound.png'}
                  unoptimized
                  width="100%"
                />
              </div>
              <div className={styles.foodDetails}>
                <div className={styles.foodName}>{food.name}</div>
                <div className={styles.sourceIcon}>
                  {(food.datasource === foodDataSources.bedca && (
                    <CgDatabase />
                  )) || <GiOrange />}
                </div>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
};

FoodList.defaultProps = {
  onSelect: undefined,
  selectedFoodId: '',
};

export default FoodList;
