import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts/core';
import { LineChart,PieChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { SVGRenderer, SkiaChart } from '@wuba/react-native-echarts';
import GraficEcharts from '@/components/apacheEcharts/graficEcharts';
import { AxiosGet } from '@/components/axios/axiosGet';

echarts.use([SVGRenderer, LineChart, GridComponent,PieChart]);

export default function App() {

  
  const [option, setData] = useState({});
  const [dataFetch, setDataFetch] = useState();
  const [refreshing, setRefreshing] = useState(true);

  const fetchData = async (ano?: any, mes?: any) => {
    try {
      const response = await AxiosGet('atendimentosSexo', {
        mes: mes || '',
        ano: ano || '',
      });
      setDataFetch(response.data);
      const arrayLabel = response.data.map((item: any) =>
        String(item.Total_Ocorrencias),
      );

      setData((prevState:any) => ({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ]
          }
        ]
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return <GraficEcharts option={option}/>;
}