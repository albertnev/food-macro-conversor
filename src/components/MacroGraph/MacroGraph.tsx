import React from 'react';
import cx from 'classnames';

import { DoughnutChart } from '../DoughnutChart';
import { StMacroGraphContainer } from './MacroGraph.styled';
import { SimpleInput } from '../SimpleInput';

interface MacroGraphProps {
  amount: string;
  className?: string;
  graph?: React.ReactNode;
  mainColor?: string;
  name: string;
  onEditMacro?: (val: string) => void;
  percentage?: number;
  secondaryColor?: string;
  units?: string;
  verticalDisplay?: boolean;
}

const MacroGraph: React.FC<MacroGraphProps> = ({
  amount,
  className,
  graph,
  mainColor,
  name,
  onEditMacro,
  percentage,
  secondaryColor,
  units,
  verticalDisplay,
}) => (
  <StMacroGraphContainer
    className={cx({
      macroGraph: true,
      [className!]: !!className,
      'macroGraph--verticalDisplay': !!verticalDisplay,
    })}
  >
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
      <span>
        {(onEditMacro && (
          <SimpleInput
            key={
              amount === '0'
                ? `macro-graph-input-${name}-empty`
                : `macro-graph-input-${name}-loaded`
            }
            className="macroGraph__editInput"
            debounceMs={150}
            defaultValue={amount}
            onChange={(val) => onEditMacro(val)}
          />
        )) ||
          amount}
        {units}
      </span>{' '}
      {!!percentage && (
        <span style={{ color: mainColor }}>({percentage}%)</span>
      )}
    </div>
  </StMacroGraphContainer>
);

MacroGraph.defaultProps = {
  className: '',
  graph: undefined,
  mainColor: '',
  onEditMacro: undefined,
  percentage: 0,
  secondaryColor: '',
  units: 'g',
  verticalDisplay: false,
};

export default MacroGraph;
