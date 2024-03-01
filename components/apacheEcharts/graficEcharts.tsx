import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts/core';
import { LineChart,PieChart } from 'echarts/charts';
import { GridComponent,LegendComponent,TooltipComponent,ToolboxComponent } from 'echarts/components';
import { SVGRenderer, SkiaChart,SvgChart } from '@wuba/react-native-echarts';

echarts.use([SVGRenderer, LineChart, GridComponent,PieChart,LegendComponent,ToolboxComponent,TooltipComponent]);

export default function GraficEcharts({
    option,
    width,
    height,
  }: {
    option: any;
    width?: number;
    height?: number;
  }) {
  const skiaRef = useRef<any>(null);
  useEffect(() => {
    let chart: any;
    if (skiaRef.current) {
      chart = echarts.init(skiaRef.current, 'light', {
        renderer: 'svg',
        width: 400,
        height: 400,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, [option]);

  return <SvgChart ref={skiaRef} />;
}