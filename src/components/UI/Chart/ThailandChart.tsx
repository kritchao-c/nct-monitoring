'use-client';

import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import { TimeUnit } from '@amcharts/amcharts5/.internal/core/util/Time';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5geodata_thailandLow from '@amcharts/amcharts5-geodata/thailandLow';
import { useEffect } from 'react';

export interface SimpleBarChartProps {
  divId?: string;
  className?: string;
  xKey?: string;
  yKey?: string;
  timeUnit?: TimeUnit;
  data?: PointData[];
  barColor?: string;
  onZoom?: () => void;
}

interface PointData {
  title: string;
  latitude: number;
  longitude: number;
}

const ThailandChart: React.FC<SimpleBarChartProps> = ({ data = [], divId = 'thailandchart', className }) => {
  useEffect(() => {
    const root = am5.Root.new(divId);

    root.setThemes([am5themes_Animated.new(root)]);

    const mapChart = am5map.MapChart.new(root, {
      wheelable: false,
      panX: 'none',
      panY: 'none',
      wheelY: 'none',
      wheelX: 'none',
    });

    const chart = root.container.children.push(mapChart);

    const series = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_thailandLow,
      }),
    );
    series.mapPolygons.template.setAll({
      tooltipText: '{name}',
      interactive: false,
      fill: am5.color('#122850'),
      nonScalingStroke: true,
    });

    const pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
    pointSeries.bullets.push(() => {
      const container = am5.Container.new(root, {
        tooltipText: '[#FFF]{title}[/]',
        cursorOverStyle: 'pointer',
      });
      container.children.push(
        am5.Graphics.new(root, {
          tooltipY: 0,
          fill: am5.color('#FF3B30'),
          // strokeOpacity: 0,
          svgPath:
            'M6.11027 7.92808C5.08934 7.92808 4.25803 7.09686 4.25803 6.07467C4.25803 5.05193 5.08934 4.22016 6.11027 4.22016C7.13175 4.22016 7.96197 5.05193 7.96197 6.07467C7.96197 7.09686 7.13175 7.92808 6.11027 7.92808ZM9.9093 1.93707C8.87315 0.867125 7.52404 0.277344 6.11027 0.277344C4.69541 0.277344 3.34575 0.867112 2.30905 1.9376C1.25715 3.02436 0.679037 4.48439 0.724134 5.94389C0.852363 10.0793 5.71798 13.2995 5.92554 13.4346L6.10755 13.5529L6.29174 13.4362C6.49875 13.3049 11.3676 10.1624 11.4964 5.94283C11.541 4.48442 10.9623 3.02383 9.9093 1.93707Z',
        }),
      );
      return am5.Bullet.new(root, {
        sprite: container,
      });
    });

    function addPoint(longitude: number, latitude: number, title: string) {
      pointSeries.data.push({
        geometry: { type: 'Point', coordinates: [longitude, latitude] },
        title,
      });
    }
    data.forEach(v => {
      addPoint(v.longitude, v.latitude, v.title);
    });
    chart.appear(1000, 50);
    return () => {
      root.dispose();
    };
  }, [divId, data]);
  return <div id={divId} className={className}></div>;
};

export default ThailandChart;
