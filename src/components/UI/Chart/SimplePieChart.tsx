'use-client';

import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import { TimeUnit } from '@amcharts/amcharts5/.internal/core/util/Time';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { ReactNode, useEffect } from 'react';

export interface SimplePieChartProps {
  divId?: string;
  className?: string;
  valueField?: string;
  categoryField?: string;
  timeUnit?: TimeUnit;
  data: any[];
  suffixText?: string;
  barColor?: string;
  icon?: ReactNode;
}

const SimplePieChart: React.FC<SimplePieChartProps> = ({
  data,
  divId = 'simpleSimplePieChartDiv',
  className,
  valueField = 'y',
  categoryField,
  suffixText,
  icon,
}) => {
  useEffect(() => {
    const root = am5.Root.new(divId);
    root.setThemes([am5themes_Animated.new(root)]);
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        tooltip: am5.Tooltip.new(root, {
          forceHidden: true,
        }),
      }),
    );

    // hide zoomout button

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: valueField || 'y',
        categoryField: categoryField || 'x',
        fillField: 'color',
        innerRadius: am5.percent(90),
        radius: am5.percent(100),
      }),
    );
    series.ticks.template.setAll({
      forceHidden: true,
    });
    const series2 = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: valueField || 'y',
        categoryField: categoryField || 'x',
        fillField: 'color',
        innerRadius: am5.percent(92),
        radius: am5.percent(97),
      }),
    );
    series2.ticks.template.setAll({
      forceHidden: true,
    });

    series.slices.template.setAll({
      fillOpacity: 0.5,
      strokeOpacity: 0,
      templateField: 'setting',
      strokeWidth: 0,
      cornerRadius: 2,
    });
    series2.slices.template.setAll({
      fillOpacity: 0.5,
      strokeOpacity: 0,
      templateField: 'setting2',
      strokeWidth: 0,
    });

    series.data.setAll(data);
    series2.data.setAll(data);
    chart.appear(1000, 50);
    return () => {
      root.dispose();
    };
  }, [categoryField, data, divId, valueField, suffixText]);
  return (
    <div id={divId} className={`${className ?? ''} relative`}>
      {icon && <div className="absolute inset-0 flex size-full items-center justify-center">{icon}</div>}
    </div>
  );
}; // Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/

export default SimplePieChart;
