import React from 'react';
import cx from 'classnames';

import { DoughnutChart } from '../DoughnutChart';
import { StMacroGraphContainer } from './MacroGraph.styled';

interface MacroGraphProps {
  amount: string;
  className?: string;
  graph?: React.ReactNode;
  mainColor?: string;
  name: string;
  percentage?: number;
  secondaryColor?: string;
  verticalDisplay?: boolean;
}

const MacroGraph: React.FC<MacroGraphProps> = ({
  amount,
  className,
  graph,
  mainColor,
  name,
  percentage,
  secondaryColor,
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
      <span>{amount}</span>{' '}
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
  percentage: 0,
  secondaryColor: '',
  verticalDisplay: false,
};

export default MacroGraph;
