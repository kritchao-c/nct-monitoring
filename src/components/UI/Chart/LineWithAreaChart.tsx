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

const LineWithAreaChart: React.FC<SimpleBarChartProps> = ({
  data,
  divId = 'lineWithAreaChart',
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
          month: 'MMM',
          year: 'YYYY',
        },
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      }),
    );

    const yRenderer = am5xy.AxisRendererY.new(root, {});

    yRenderer.labels.template.setAll({
      fill: am5.color('#A6A6A6'),
    });

    yRenderer.grid.template.setAll({
      strokeDasharray: [5, 5],
    });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        renderer: yRenderer,
        numberFormatter: am5.NumberFormatter.new(root, {
          numberFormat: '# ag',
        }),
      }),
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        minBulletDistance: 10,
        xAxis,
        yAxis,
        fill: am5.color('#BFFFEA'),
        valueYField: yKey,
        valueXField: xKey,
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: 'horizontal',
          labelText: '{valueY}',
        }),
      }),
    );

    series.bullets.push(() => {
      const bulletCircle = am5.Circle.new(root, {
        radius: 5,
        fill: am5.color('#005980'),
      });
      return am5.Bullet.new(root, {
        sprite: bulletCircle,
      });
    });

    series.fills.template.setAll({
      fillOpacity: 1,
      visible: true,
    });

    series.strokes.template.setAll({
      strokeWidth: 2,
      stroke: am5.color('#005980'),
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

export default LineWithAreaChart;
