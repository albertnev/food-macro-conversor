import { useTranslation } from 'next-i18next';
import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import { MdCompareArrows } from 'react-icons/md';
import { TbArrowsUpDown } from 'react-icons/tb';

import useMediaQuery from '../../hooks/useMediaQuery';
import { PossibleMacrosKcalsTd } from '../../types/PossibleMacrosKcalsTd';
import { getFoodDataForGrams } from '../../utils/getFoodDataForGrams';
import { getFoodEquivalence } from '../../utils/getFoodEquivalence';
import { Checkbox } from '../Checkbox';
import { FoodComparator } from '../FoodComparator';
import { Input } from '../Input';
import { StFoodEquivalenceContainer } from './FoodEquivalence.styled';
import { FoodComparatorProps } from '../FoodComparator/FoodComparator';
import { Button } from '../Button';

interface FoodEquivalenceProps {
  className?: string;
  foodsToCompare: FoodComparatorProps['foodsToCompare'];
  onChangeFood?: FoodComparatorProps['onChangeFood'];
  onMacrosChange?: (macros: PossibleMacrosKcalsTd[]) => void;
  onQuantityChange?: (quantity: number) => void;
  onSwitchFoods?: () => void;
  quantity?: number;
  selectedMacros?: PossibleMacrosKcalsTd[];
}

const FoodEquivalence: React.FC<FoodEquivalenceProps> = ({
  className,
  foodsToCompare,
  onChangeFood,
  onMacrosChange,
  onQuantityChange,
  onSwitchFoods,
  quantity,
  selectedMacros,
}) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery(780);
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
    <StFoodEquivalenceContainer
      className={cx({ foodEquivalence: true, [className!]: !!className })}
    >
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
        {onSwitchFoods && (
          <div className="foodEquivalence__swapFoodsContainer">
            <Button
              className="foodEquivalence__switchFoodsIcon"
              icon={<MdCompareArrows />}
              label="Intercambiar alimentos"
              onClick={onSwitchFoods}
            />
          </div>
        )}
        <div className="foodEquivalence__macroSelectorContainer">
          <div className="foodEquivalence__macroSelectorText">
            {t('doNotExceed')}:
          </div>
          {(
            ['kcals', 'carbs', 'fat', 'protein'] as PossibleMacrosKcalsTd[]
          ).map((macro) => (
            <Checkbox
              key={`macro-selector-${macro}`}
              checked={macrosSelected?.includes(macro)}
              className="foodEquivalence__macroCheckbox"
              label={t(macro)}
              onChange={(checked) => toggleMacro(macro, checked)}
            />
          ))}
        </div>
      </div>
      <div
        className={cx({
          foodEquivalence__foodComparatorContainer: true,
          'foodEquivalence__foodComparatorContainer--mobile': isMobile,
        })}
      >
        <FoodComparator
          className="foodEquivalence__foodComparator"
          foodsToCompare={[
            getFoodDataForGrams(foodsToCompare[0], sourceGrams),
            convertedFood,
          ]}
          icon={isMobile ? <TbArrowsUpDown /> : undefined}
          verticalDisplay={!isMobile}
          onChangeFood={onChangeFood}
        />
      </div>
    </StFoodEquivalenceContainer>
  );
};

FoodEquivalence.defaultProps = {
  className: '',
  onChangeFood: undefined,
  onMacrosChange: undefined,
  onQuantityChange: undefined,
  onSwitchFoods: undefined,
  quantity: 100,
  selectedMacros: [],
};

export default FoodEquivalence;
