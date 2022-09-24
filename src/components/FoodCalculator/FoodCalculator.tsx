import React, { useState } from 'react';
import cx from 'classnames';
import { Trans, useTranslation } from 'next-i18next';

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

const FoodQuantityInput: React.FC<{
  sourceGrams: number;
  updateSourceGrams: (g: string) => void;
}> = ({ sourceGrams, updateSourceGrams }) => {
  const { t } = useTranslation();

  return (
    <span className="foodCalculator__foodQuantity">
      <SimpleInput
        className="foodCalculator__gramsInput"
        data-testid="input-food-quantity"
        defaultValue={`${sourceGrams}`}
        placeholder={t('grams')}
        onChange={updateSourceGrams}
      />
      g
    </span>
  );
};

const MacroSelector: React.FC<{
  selectedMacro: PossibleMacrosTd;
  setSelectedMacro: (macro: PossibleMacrosTd) => void;
}> = ({ selectedMacro, setSelectedMacro }) => {
  const { t } = useTranslation();

  return (
    <div className="foodCalculator__macroSelector">
      <SimpleSelect
        data-testid="select-macro-selector"
        defaultValue={selectedMacro as any}
        options={['carbs', 'fat', 'protein'].map((macro) => ({
          label: t(macro),
          value: macro,
        }))}
        onChange={(val: any) => setSelectedMacro(val?.value || '')}
      />
    </div>
  );
};

const FoodName: React.FC<{ foodName: string }> = ({ foodName }) => (
  <span className="foodCalculator__foodName">{foodName}</span>
);

const FoodQuantity: React.FC<{ quantity: number }> = ({ quantity }) => (
  <span className="foodCalculator__foodQuantity">{quantity}g</span>
);

const FoodCalculator: React.FC<FoodCalculatorProps> = ({
  className,
  onChangeFood,
  selectedFood,
}) => {
  const { t } = useTranslation();
  const [macroGrams, setMacroGrams] = useState<number>(50);
  const [selectedMacro, setSelectedMacro] = useState<PossibleMacrosTd>('carbs');

  const updateSourceGrams = (grams: string) => {
    setMacroGrams(Number.parseInt(grams || '0', 10));
  };

  const targetGrams = getFoodAmountForMacros(
    selectedFood,
    selectedMacro,
    macroGrams,
  );

  const foodForGrams = getFoodDataForGrams(selectedFood, targetGrams);

  return (
    <StFoodCalculatorContainer
      className={cx({
        [className!]: !!className,
        foodComparator: true,
      })}
      data-testid="food-calculator"
    >
      <div className="foodCalculator__filtersHeader">
        <div className="foodCalculator__gramsInputContainer">
          <div>
            <div
              className="foodCalculator__gramsInputDescription"
              data-testid="food-calculated-description"
            >
              <div>
                <Trans
                  components={{
                    input: (
                      <FoodQuantityInput
                        sourceGrams={macroGrams}
                        updateSourceGrams={updateSourceGrams}
                      />
                    ),
                    selector: (
                      <MacroSelector
                        selectedMacro={selectedMacro}
                        setSelectedMacro={setSelectedMacro}
                      />
                    ),
                  }}
                  i18nKey="foodCalculatorText_toGet"
                />
              </div>
              <div>
                <Trans
                  components={{
                    food: <FoodName foodName={foodForGrams.name} />,
                    quantity: <FoodQuantity quantity={foodForGrams.grams} />,
                  }}
                  i18nKey="foodCalculatorText_youNeed"
                />
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
