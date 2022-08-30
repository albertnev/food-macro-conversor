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

interface MacroDisplayProps {
  className?: string;
  food: FoodDetailsTd;
  verticalDisplay?: boolean;
}

interface MacroGraphProps {
  amount: string;
  graph?: React.ReactNode;
  mainColor?: string;
  name: string;
  percentage?: number;
  secondaryColor?: string;
}

const MacroGraph: React.FC<MacroGraphProps> = ({
  amount,
  graph,
  mainColor,
  name,
  percentage,
  secondaryColor,
}) => (
  <div className="macroGraph">
    <div className="macroName">{name}</div>
    <div className="graphContainer">
      {graph || (
        <DoughnutChart
          data={[
            {
              color: mainColor!,
              id: 'main',
              value: percentage!,
            },
            {
              color: secondaryColor!,
              id: 'rest',
              value: 100 - percentage!,
            },
          ]}
        />
      )}
    </div>
    <div className="macroAmounts">
      <span>{amount}</span>{' '}
      {!!percentage && (
        <span style={{ color: mainColor }}>({percentage}%)</span>
      )}
    </div>
  </div>
);

MacroGraph.defaultProps = {
  graph: undefined,
  mainColor: '',
  percentage: 0,
  secondaryColor: '',
};

const MacroDisplay: React.FC<MacroDisplayProps> = ({
  className,
  food,
  verticalDisplay,
}) => {
  const { t } = useTranslation();
  const macroPercentages = getMacrosPercentages(food);

  return (
    <StMacroDisplayContainer
      className={cx({
        className,
        macroDisplayContainer: true,
        verticalDisplay,
      })}
    >
      <div className="inQuantity">
        {t('forEachNGrams', { count: food.grams })}
      </div>
      {macroPercentages.alcohol > 0 && (
        <MacroGraph
          amount={`${getValueOrZero(food.macronutrients.alcohol.amount)}g`}
          mainColor={getCssVarValue('--alcohol-color')}
          name={t('alcohol')}
          percentage={macroPercentages.alcohol}
          secondaryColor={hexToRgba(getCssVarValue('--alcohol-color'), 0.2)}
        />
      )}
      <MacroGraph
        amount={`${getValueOrZero(food.macronutrients.carbs.amount)}g`}
        mainColor={getCssVarValue('--carbs-color')}
        name={t('carbs')}
        percentage={macroPercentages.carbs}
        secondaryColor={hexToRgba(getCssVarValue('--carbs-color'), 0.2)}
      />
      <MacroGraph
        amount={`${getValueOrZero(food.macronutrients.fat.amount)}g`}
        mainColor={getCssVarValue('--fat-color')}
        name={t('fat')}
        percentage={macroPercentages.fat}
        secondaryColor={hexToRgba(getCssVarValue('--fat-color'), 0.2)}
      />
      <MacroGraph
        amount={`${getValueOrZero(food.macronutrients.protein.amount)}g`}
        mainColor={getCssVarValue('--protein-color')}
        name={t('protein')}
        percentage={macroPercentages.protein}
        secondaryColor={hexToRgba(getCssVarValue('--protein-color'), 0.2)}
      />
      <MacroGraph
        amount={`${getValueOrZero(food.kcals)} Kcals`}
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
      />
    </StMacroDisplayContainer>
  );
};

MacroDisplay.defaultProps = {
  className: '',
  verticalDisplay: false,
};

export default MacroDisplay;
