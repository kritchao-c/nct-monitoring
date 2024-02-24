'use-client';

import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import { TimeUnit } from '@amcharts/amcharts5/.internal/core/util/Time';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { useEffect } from 'react';

export interface PieChartProps {
  divId?: string;
  className?: string;
  valueField?: string;
  categoryField?: string;
  timeUnit?: TimeUnit;
  data: any[];
  suffixText?: string;
  barColor?: string;
}

const PieChart: React.FC<PieChartProps> = ({
  data,
  divId = 'simplePieChartDiv',
  className,
  valueField = 'y',
  categoryField,
  suffixText,
}) => {
  useEffect(() => {
    const root = am5.Root.new(divId);
    root.setThemes([am5themes_Animated.new(root)]);
    const bgColor = root.interfaceColors.get('background');

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    const chart = root.container.children.push(am5percent.PieChart.new(root, {}));

    // hide zoomout button

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: valueField || 'y',
        categoryField: categoryField || 'x',
        fillField: 'color',
        tooltip: am5.Tooltip.new(root, {
          labelText: `[#FFF]{category}: {value} ${suffixText || ''}[/]`,
        }),
      }),
    );

    series.slices.template.setAll({
      stroke: bgColor,
      strokeWidth: 3,
    });

    series.labels.template.setAll({
      // eslint-disable-next-line quotes, @typescript-eslint/quotes
      text: "{valuePercentTotal.formatNumber('0.00')} %",
    });
    series.data.setAll(data);

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 50);
    return () => {
      root.dispose();
    };
  }, [categoryField, data, divId, valueField, suffixText]);
  return <div id={divId} className={className}></div>;
}; // Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/

export default PieChart;
