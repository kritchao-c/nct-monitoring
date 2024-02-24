'use-client';

import * as am5 from '@amcharts/amcharts5';
import { TimeUnit } from '@amcharts/amcharts5/.internal/core/util/Time';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';
import { useEffect } from 'react';

export interface EnergyChartProps {
  divId?: string;
  className?: string;
  consumptionXKey?: string;
  consumptionYKey?: string;
  savingXKey?: string;
  savingYKey?: string;
  productionXKey?: string;
  productionYKey?: string;
  timeUnit?: TimeUnit;
  productionData: any[];
  savingData: any[];
  consumptionData: any[];
  suffixText?: string;
  barColor?: string;
}

const EnergyChart: React.FC<EnergyChartProps> = ({
  productionData,
  savingData,
  consumptionData,
  divId = 'energyChartDiv',
  className,
  consumptionXKey = 'x',
  consumptionYKey = 'y',
  savingXKey = 'x',
  savingYKey = 'y',
  productionXKey = 'x',
  productionYKey = 'y',
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
    root.numberFormatter.set('numberFormat', '#.## aWh');

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        focusable: true,

        paddingRight: 0,
      }),
    );

    // hide zoomout button
    chart.zoomOutButton.set('forceHidden', true);

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    const xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 0,
      cellStartLocation: 0.1,
      cellEndLocation: 0.9,
      minorGridEnabled: true,
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

    const yAxisTooltip = am5.Tooltip.new(root, {
      centerX: 10,
    });
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        renderer: yRenderer,
        numberFormatter: am5.NumberFormatter.new(root, {
          numberFormat: '# aWh',
        }),
        tooltip: yAxisTooltip,
      }),
    );

    const consumptionSeries = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        valueYField: consumptionYKey,
        valueXField: consumptionXKey,
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: 'vertical',
          labelText: 'Consumption: {valueY}',
        }),
      }),
    );

    consumptionSeries.columns.template.setAll({
      cornerRadiusTL: 4,
      cornerRadiusTR: 4,
      maxWidth: 30,
      strokeOpacity: 0,
      fill: am5.color('#005980'),
    });

    const savingSeries = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        valueYField: savingYKey,
        valueXField: savingXKey,
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: 'vertical',
          labelText: 'Saving: {valueY}',
        }),
      }),
    );

    savingSeries.columns.template.setAll({
      cornerRadiusTL: 4,
      cornerRadiusTR: 4,
      maxWidth: 30,
      strokeOpacity: 0,
      fill: am5.color('#BFFFEA'),
    });

    const productionLineSeries = chart.series.push(
      am5xy.SmoothedXYLineSeries.new(root, {
        stroke: am5.color('#00B8BD'),
        fill: am5.color('#00B8BD'),
        xAxis,
        yAxis,
        lowLocationX: 0,
        highLocationX: 1,
        valueXField: productionXKey,
        valueYField: productionYKey,
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: 'vertical',
          labelText: 'Production: {valueY}',
        }),
      }),
    );

    productionLineSeries.strokes.template.setAll({
      strokeWidth: 5,
    });

    consumptionSeries.data.setAll(consumptionData);
    savingSeries.data.setAll(savingData);
    productionLineSeries.data.setAll(productionData);

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    chart.set('cursor', am5xy.XYCursor.new(root, {}));

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 50);
    return () => {
      root.dispose();
    };
  }, [
    divId,
    timeUnit,
    suffixText,
    barColor,
    consumptionYKey,
    consumptionXKey,
    savingYKey,
    savingXKey,
    productionXKey,
    productionYKey,
    consumptionData,
    savingData,
    productionData,
  ]);
  return <div id={divId} className={className}></div>;
}; // Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/

export default EnergyChart;
