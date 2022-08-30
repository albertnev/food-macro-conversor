import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { FoodDetailsTd } from '../../types/FoodDetailsTd';
import { PossibleMacrosKcalsTd } from '../../types/PossibleMacrosKcalsTd';
import { getFoodDataForGrams } from '../../utils/getFoodDataForGrams';
import { getFoodEquivalence } from '../../utils/getFoodEquivalence';
import { Checkbox } from '../Checkbox';
import { FoodComparator } from '../FoodComparator';
import { Input } from '../Input';

import { StFoodEquivalenceContainer } from './FoodEquivalence.styled';

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
  const [macrosSelected, setMacrosSelected] = useState(selectedMacros);

  const updateSourceGrams = (grams: string) => {
    setSourceGrams(Number.parseInt(grams || '0', 10));
  };

  const convertedFood = getFoodEquivalence(
    foodsToCompare[0],
    sourceGrams,
    foodsToCompare[1],
    macrosSelected,
  );

  const toggleMacro = (macro: PossibleMacrosKcalsTd, checked: boolean) => {
    if (checked) {
      setMacrosSelected((current) => [...current!, macro]);
    } else {
      setMacrosSelected((current) => current?.filter((m) => m !== macro));
    }
  };

  useEffect(() => {
    onQuantityChange?.(sourceGrams || 0);
  }, [sourceGrams, onQuantityChange]);

  useEffect(() => {
    onMacrosChange?.(macrosSelected || []);
  }, [macrosSelected, onMacrosChange]);

  return (
    <StFoodEquivalenceContainer>
      <div className="foodEquivalence__filtersHeader">
        <div className="foodEquivalence__gramsInputContainer">
          <div>
            <div className="foodEquivalence__gramsInputDescription">
              <div>
                Cada{' '}
                <span className="foodEquivalence__foodQuantity">
                  <Input
                    className="foodEquivalence__gramsInput"
                    defaultValue={`${sourceGrams}`}
                    placeholder={t('grams')}
                    onChange={updateSourceGrams}
                  />
                  g
                </span>{' '}
                de{' '}
                <span className="foodEquivalence__foodName">
                  {foodsToCompare[0].name}
                </span>
              </div>
              <div>
                Equivalen a{' '}
                <span className="foodEquivalence__foodQuantity">
                  {convertedFood.grams}g
                </span>{' '}
                de{' '}
                <span className="foodEquivalence__foodName">
                  {convertedFood.name}
                </span>
                .
              </div>
            </div>
          </div>
        </div>
        <div className="foodEquivalence__macroSelectorContainer">
          <div className="foodEquivalence__macroSelectorText">
            {t('doNotExceed')}:
          </div>
          <Checkbox
            checked={macrosSelected?.includes('kcals')}
            label={t('kcals')}
            onChange={(checked) => toggleMacro('kcals', checked)}
          />
          <Checkbox
            checked={macrosSelected?.includes('carbs')}
            label={t('carbs')}
            onChange={(checked) => toggleMacro('carbs', checked)}
          />
          <Checkbox
            checked={macrosSelected?.includes('fat')}
            label={t('fat')}
            onChange={(checked) => toggleMacro('fat', checked)}
          />
          <Checkbox
            checked={macrosSelected?.includes('protein')}
            label={t('protein')}
            onChange={(checked) => toggleMacro('protein', checked)}
          />
        </div>
      </div>
      <div className="foodEquivalence__foodComparatorContainer">
        <FoodComparator
          foodsToCompare={[
            getFoodDataForGrams(foodsToCompare[0], sourceGrams),
            convertedFood,
          ]}
        />
      </div>
    </StFoodEquivalenceContainer>
  );
};

FoodEquivalence.defaultProps = {
  onMacrosChange: undefined,
  onQuantityChange: undefined,
  quantity: 100,
  selectedMacros: [],
};

export default FoodEquivalence;
