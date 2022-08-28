import React from 'react';
import { DefaultRawDatum, PieSvgProps, ResponsivePie } from '@nivo/pie';

interface DoughnutChartProps
  extends Omit<
    PieSvgProps<DefaultRawDatum & { color: string }>,
    'width' | 'height'
  > {}

const DoughnutChart: React.FC<DoughnutChartProps> = (props) => (
  <ResponsivePie
    arcLinkLabelsColor={{ from: 'color' }}
    borderColor={{
      from: 'color',
      modifiers: [['darker', 0.2]],
    }}
    colors={({ data }) => data.color}
    cornerRadius={3}
    innerRadius={0.6}
    isInteractive={false}
    layers={['arcs']}
    padAngle={0.7}
    {...props}
  />
);

export default DoughnutChart;
