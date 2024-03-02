import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, RefreshControl } from 'react-native';
import * as echarts from 'echarts/core';
import { LineChart, PieChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { SVGRenderer, SkiaChart } from '@wuba/react-native-echarts';
import GraficEcharts from '@/components/apacheEcharts/graficEcharts';
import { AxiosGet } from '@/components/axios/axiosGet';
import MonthYear from '@/components/formData/monthAndYear';
import { View } from '@/components/Themed';
import { ScrollView } from 'react-native-gesture-handler';

echarts.use([SVGRenderer, LineChart, GridComponent, PieChart]);

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

      setData((prevState: any) => ({
        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
        tooltip: {
          trigger: 'item',
        },
        legend: {
          bottom: 0,
          left: 'center',
          Data: response.data.map((item: any) =>
            String(item.Total_Ocorrencias),
          ),
          itemStyle: {
            shadowBlur: 4.5,
            shadowOffsetX: 2,
            shadowOffsetY: 1.5,
          },
          textStyle: {
            color: 'rgba(251, 251, 251, 1)',
          },
          icon: 'roundRect',
        },
        grid: {
          top: '0%',
          left: '0%',
          right: '0%',
          bottom: '0%',
          containLabel: true,
        },
        series: [
          {
            label: {
              formatter: '{d|{d}%}',
              show: true,
              position: 'inside',
              size: 40,
              length: 200,
              lineHeight: 56,
              rich: {
                d: {
                  color: '#4C5058',
                  padding: [10, 10, 10, 10],
                  fontSize: 14,
                  fontWeight: 'bold',
                  lineHeight: 33,
                  marginLeft: 100,
                },
              },
            },
            labelLine: {
              show: false,
            },
            radius: ['30%', '60%'],
            avoidLabelOverlap: false,
            type: 'pie',
            itemStyle: {
              borderRadius: 8,
            },
            data: response.data.map((item: any) => ({
              name: item.SexoDS !== null ? item.SexoDS : 'Não informado',
              value: item.Total_Ocorrencias,
            })),
            top: -40,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <MonthYear fetchData={fetchData} setRefreshing={setRefreshing} />
      <GraficEcharts option={option} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#100C2A',
    width: 'auto',
  },
  container2: {
    flex: 1,
    backgroundColor: '#100C2A',
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: 90,
    paddingVertical: 8,
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 1,
    borderColor: 'black',
    marginLeft: 7,
  },
  input: {
    marginLeft: '1%',
    width: 140,
    paddingLeft: 14,
    paddingVertical: 8,
    borderRadius: 10,
    margin: 1,
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 100,
    color: 'white',
  },
  input2: {
    marginLeft: '1%',
    width: 140,
    paddingLeft: 14,
    paddingVertical: 8,
    borderRadius: 10,
    margin: 1,
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 100,
    color: 'white',
  },
});
