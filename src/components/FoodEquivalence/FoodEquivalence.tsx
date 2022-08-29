import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { FoodDetailsTd } from '../../types/FoodDetailsTd';
import { PossibleMacrosKcalsTd } from '../../types/PossibleMacrosKcalsTd';
import { getFoodDataForGrams } from '../../utils/getFoodDataForGrams';
import { getFoodEquivalence } from '../../utils/getFoodEquivalence';
import { FoodComparator } from '../FoodComparator';
import { Input } from '../Input';

import styles from './FoodEquivalence.module.scss';

interface FoodEquivalenceProps {
  foodsToCompare: FoodDetailsTd[];
  onMacrosChange?: (macros: PossibleMacrosKcalsTd[]) => void;
  onQuantityChange?: (quantity: number) => void;
  quantity?: number;
  selectedMacros?: PossibleMacrosKcalsTd[];
}

const FoodEquivalence: React.FC<FoodEquivalenceProps> = ({
  foodsToCompare,
  onMacrosChange,
  onQuantityChange,
  quantity,
  selectedMacros,
}) => {
  const { t } = useTranslation();
  const [sourceGrams, setSourceGrams] = useState(quantity || 0);
  const [macros] = useState(selectedMacros);

  const updateSourceGrams = (grams: string) => {
    setSourceGrams(Number.parseInt(grams || '0', 10));
  };

  const convertedFood = getFoodEquivalence(
    foodsToCompare[0],
    sourceGrams,
    foodsToCompare[1],
    ['protein'],
  );

  useEffect(() => {
    onQuantityChange?.(sourceGrams || 0);
  }, [sourceGrams, onQuantityChange]);

  useEffect(() => {
    onMacrosChange?.(macros || []);
  }, [macros, onMacrosChange]);

  return (
    <>
      <div className={styles.gramsInputContainer}>
        <div>
          <span className={styles.gramsInputDescription}>
            Por{' '}
            <span className={styles.foodQuantity}>
              <Input
                defaultValue={`${sourceGrams}`}
                placeholder={t('grams')}
                onChange={updateSourceGrams}
              />
              g
            </span>{' '}
            de <span className={styles.foodName}>{foodsToCompare[0].name}</span>
            , equivalen{' '}
            <span className={styles.foodQuantity}>{convertedFood.grams}g</span>{' '}
            de <span className={styles.foodName}>{convertedFood.name}</span>
          </span>
        </div>
      </div>
      <div className={styles.macroSelectorContainer}>
        <span />
      </div>
      <FoodComparator
        foodsToCompare={[
          getFoodDataForGrams(foodsToCompare[0], sourceGrams),
          convertedFood,
        ]}
      />
    </>
  );
};

FoodEquivalence.defaultProps = {
  onMacrosChange: undefined,
  onQuantityChange: undefined,
  quantity: 100,
  selectedMacros: [],
};

export default FoodEquivalence;
