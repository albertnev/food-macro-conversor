import { useTranslation } from 'next-i18next';
import React from 'react';
import cx from 'classnames';

import { FoodDetailsTd } from '../../types/FoodDetailsTd';
import { getCssVarValue } from '../../utils/getCssVarValue';
import { getMacrosPercentages } from '../../utils/getMacrosPercentage';
import { getValueOrZero } from '../../utils/getValueOrZero';
import { hexToRgba } from '../../utils/hexToRgba';
import { DoughnutChart } from '../DoughnutChart';
import { StMacroDisplayContainer } from './MacroDisplay.styled';
import { MacroGraph } from '../MacroGraph';
import { PossibleMacrosKcalsTd } from '../../types/PossibleMacrosKcalsTd';

interface MacroDisplayProps {
  className?: string;
  food: FoodDetailsTd;
  onEditMacro?: (macro: PossibleMacrosKcalsTd, val: string) => void;
  verticalDisplay?: boolean;
}

const MacroDisplay: React.FC<MacroDisplayProps> = ({
  className,
  food,
  onEditMacro,
  verticalDisplay,
}) => {
  const { t } = useTranslation();
  const macroPercentages = getMacrosPercentages(food);

  const getOnEditMacro = (macro: PossibleMacrosKcalsTd) =>
    onEditMacro ? (val: string) => onEditMacro(macro, val) : undefined;

  const getZeroOrEmpty = (value?: string) =>
    onEditMacro ? value || '' : getValueOrZero(value);

  return (
    <StMacroDisplayContainer
      className={cx({
        [className!]: !!className,
        macroDisplayContainer: true,
        'macroDisplayContainer--verticalDisplay': !!verticalDisplay,
      })}
      data-testid="macro-display"
    >
      <div className="macroDisplay__inQuantity">
        {t('forEachNGrams', { count: food.grams })}
      </div>
      {(macroPercentages.alcohol > 0 || onEditMacro) && (
        <MacroGraph
          amount={`${getZeroOrEmpty(food.macronutrients?.alcohol?.amount)}`}
          mainColor={getCssVarValue('--alcohol-color')}
          name={t('alcohol')}
          percentage={macroPercentages.alcohol}
          secondaryColor={hexToRgba(getCssVarValue('--alcohol-color'), 0.2)}
          units="g"
          verticalDisplay={verticalDisplay}
          onEditMacro={getOnEditMacro('alcohol')}
        />
      )}
      <MacroGraph
        amount={`${getZeroOrEmpty(food.macronutrients?.carbs?.amount)}`}
        mainColor={getCssVarValue('--carbs-color')}
        name={t('carbs')}
        percentage={macroPercentages.carbs}
        secondaryColor={hexToRgba(getCssVarValue('--carbs-color'), 0.2)}
        units="g"
        verticalDisplay={verticalDisplay}
        onEditMacro={getOnEditMacro('carbs')}
      />
      <MacroGraph
        amount={`${getZeroOrEmpty(food.macronutrients?.fat?.amount)}`}
        mainColor={getCssVarValue('--fat-color')}
        name={t('fat')}
        percentage={macroPercentages.fat}
        secondaryColor={hexToRgba(getCssVarValue('--fat-color'), 0.2)}
        units="g"
        verticalDisplay={verticalDisplay}
        onEditMacro={getOnEditMacro('fat')}
      />
      <MacroGraph
        amount={`${getZeroOrEmpty(food.macronutrients?.protein?.amount)}`}
        mainColor={getCssVarValue('--protein-color')}
        name={t('protein')}
        percentage={macroPercentages.protein}
        secondaryColor={hexToRgba(getCssVarValue('--protein-color'), 0.2)}
        units="g"
        verticalDisplay={verticalDisplay}
        onEditMacro={getOnEditMacro('protein')}
      />
      <MacroGraph
        amount={`${getZeroOrEmpty(food.kcals)}`}
        graph={
          <DoughnutChart
            data={[
              {
                color: getCssVarValue('--alcohol-color'),
                id: 'alcohol',
                value: macroPercentages.alcohol,
              },
              {
                color: getCssVarValue('--carbs-color'),
                id: 'carbs',
                value: macroPercentages.carbs,
              },
              {
                color: getCssVarValue('--fat-color'),
                id: 'fat',
                value: macroPercentages.fat,
              },
              {
                color: getCssVarValue('--protein-color'),
                id: 'protein',
                value: macroPercentages.protein,
              },
            ]}
          />
        }
        name="Kcals"
        units=" Kcals"
        verticalDisplay={verticalDisplay}
        onEditMacro={getOnEditMacro('kcals')}
      />
    </StMacroDisplayContainer>
  );
};

MacroDisplay.defaultProps = {
  className: '',
  onEditMacro: undefined,
  verticalDisplay: false,
};

export default MacroDisplay;
