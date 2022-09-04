import React, { useState } from 'react';
import cx from 'classnames';
import { useTranslation } from 'next-i18next';

import { FoodDetailsTd } from '../../types/FoodDetailsTd';
import { FoodDetails } from '../FoodDetails';
import { StFoodCalculatorContainer } from './FoodCalculator.styled';
import { Button } from '../Button';
import { SimpleInput } from '../SimpleInput';
import { getFoodDataForGrams } from '../../utils/getFoodDataForGrams';
import { SimpleSelect } from '../SimpleSelect';
import { getFoodAmountForMacros } from '../../utils/getFoodAmountForMacros';
import { PossibleMacrosTd } from '../../types/PossibleMacrosTd';

export interface FoodCalculatorProps {
  className?: string;
  onChangeFood?: (food: FoodDetailsTd) => void;
  selectedFood: FoodDetailsTd;
}

const FoodCalculator: React.FC<FoodCalculatorProps> = ({
  className,
  onChangeFood,
  selectedFood,
}) => {
  const { t } = useTranslation();
  const [sourceGrams, setSourceGrams] = useState<number>(50);
  const [selectedMacro, setSelectedMacro] = useState<PossibleMacrosTd>('carbs');

  const updateSourceGrams = (grams: string) => {
    setSourceGrams(Number.parseInt(grams || '0', 10));
  };

  const targetGrams = getFoodAmountForMacros(
    selectedFood,
    selectedMacro,
    sourceGrams,
  );

  const foodForGrams = getFoodDataForGrams(selectedFood, targetGrams);

  return (
    <StFoodCalculatorContainer
      className={cx({
        [className!]: !!className,
        foodComparator: true,
      })}
    >
      <div className="foodCalculator__filtersHeader">
        <div className="foodCalculator__gramsInputContainer">
          <div>
            <div className="foodCalculator__gramsInputDescription">
              <div>
                Para llegar a{' '}
                <span className="foodCalculator__foodQuantity">
                  <SimpleInput
                    className="foodCalculator__gramsInput"
                    defaultValue={`${sourceGrams}`}
                    placeholder={t('grams')}
                    onChange={updateSourceGrams}
                  />
                  g
                </span>{' '}
                de{' '}
                <div className="foodCalculator__macroSelector">
                  <SimpleSelect
                    defaultValue={selectedMacro as any}
                    options={['carbs', 'fat', 'protein'].map((macro) => ({
                      label: t(macro),
                      value: macro,
                    }))}
                    onChange={(val: any) => setSelectedMacro(val?.value || '')}
                  />
                </div>
              </div>
              <div>
                Necesitas{' '}
                <span className="foodCalculator__foodQuantity">
                  {foodForGrams.grams}g
                </span>{' '}
                de{' '}
                <span className="foodCalculator__foodName">
                  {foodForGrams.name}
                </span>
                .
              </div>
            </div>
          </div>
        </div>
      </div>
      <FoodDetails
        food={foodForGrams}
        isSummary
        titleDecorator={
          onChangeFood ? (
            <Button
              className="foodCalculator__foodActionButton"
              label={t('changeFood')}
              secondary
              onClick={() => onChangeFood(foodForGrams)}
            />
          ) : null
        }
      />
    </StFoodCalculatorContainer>
  );
};

FoodCalculator.defaultProps = {
  className: '',
  onChangeFood: undefined,
};

export default FoodCalculator;
