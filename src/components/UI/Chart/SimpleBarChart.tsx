'use-client';

import * as am5 from '@amcharts/amcharts5';
import { TimeUnit } from '@amcharts/amcharts5/.internal/core/util/Time';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';
import { useEffect } from 'react';

export interface SimpleBarChartProps {
  divId?: string;
  className?: string;
  xKey?: string;
  yKey?: string;
  timeUnit?: TimeUnit;
  data: any[];
  suffixText?: string;
  barColor?: string;
}

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({
  data,
  divId = 'simpleBarChartDiv',
  className,
  xKey = 'x',
  yKey = 'y',
  timeUnit = 'month',
  suffixText,
  barColor,
}) => {
  useEffect(() => {
    const root = am5.Root.new(divId);
    root.setThemes([am5themes_Animated.new(root)]);
    root.dateFormatter.setAll({
      dateFormat: 'yyyy-MM-dd',
      dateFields: ['valueX'],
    });

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        focusable: true,
        panX: true,
        panY: false,
        wheelX: 'panX',
        wheelY: 'none',
        paddingLeft: 0,
        paddingRight: 0,
      }),
    );

    // hide zoomout button
    chart.zoomOutButton.set('forceHidden', true);

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    const xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 0,
      strokeOpacity: 0.2,
    });
    xRenderer.grid.template.set('forceHidden', true);
    xRenderer.labels.template.setAll({
      fontSize: 12,
    });

    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        snapTooltip: true,
        baseInterval: {
          timeUnit,
          count: 1,
        },
        dateFormats: {
          day: 'EEE',
        },
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      }),
    );

    const yRenderer = am5xy.AxisRendererY.new(root, {});
    yRenderer.labels.template.setAll({
      forceHidden: true,
    });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        renderer: yRenderer,
      }),
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        valueYField: yKey,
        valueXField: xKey,
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: 'vertical',
          labelText: `{valueY} ${suffixText || ''}`,
        }),
      }),
    );

    series.columns.template.setAll({
      cornerRadiusTL: 4,
      cornerRadiusTR: 4,
      maxWidth: 30,
      strokeOpacity: 0,
      fill: am5.color(barColor || '#E8F3FC'),
    });

    // Set up data processor to parse string dates
    // https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
    series.data.processor = am5.DataProcessor.new(root, {
      dateFormat: 'yyyy-MM-dd',
      dateFields: ['date'],
    });

    series.data.setAll(data);

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    chart.set('cursor', am5xy.XYCursor.new(root, {}));

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 50);
    return () => {
      root.dispose();
    };
  }, [divId, data, xKey, yKey, timeUnit, suffixText, barColor]);
  return <div id={divId} className={className}></div>;
}; // Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/

export default SimpleBarChart;
