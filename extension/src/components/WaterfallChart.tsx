import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

interface WaterfallChartProps {
  timings: { [key: string]: number };
}

interface ChartElement extends HTMLCanvasElement {
  chartInstance?: Chart;
}

const WaterfallChart: React.FC<WaterfallChartProps> = ({ timings }) => {
  const chartRef = useRef<ChartElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // exclude ssl because ssl timing is included in 'connect' according to docs
    const timingEntries = Object.entries(timings).filter((timing) => timing[0] !== 'ssl');

    console.log('timings', timings, 'timingEntries', timingEntries);

    interface TimingData {
      labels: string[];
      data: number[][];
      startValues: number[];
      endValues: number[];
    }

    const data: TimingData = timingEntries.reduce(
      (acc: TimingData, [key, value]) => {
        const startValue = acc.endValues.slice(-1)[0];
        const endValue = startValue + value;
        acc.labels.push(key);
        acc.startValues.push(startValue);
        acc.endValues.push(endValue);
        acc.data.push([startValue, endValue]);
        return acc;
      },
      { labels: [], data: [], startValues: [], endValues: [0] }
    );

    console.log('waterfall chart data', data);

    let chart: any;

    if (chartRef.current.chartInstance) {
      chartRef.current.chartInstance.destroy();
    }

    chart = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [
          {
            data: data.data,
            backgroundColor: data.labels.map(
              (_, index) => `hsl(${(index / data.labels.length) * 120}, 100%, 50%)`
            ),
          },
        ],
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            ticks: {
              callback: (value: number | string) =>
                parseFloat(value as string).toFixed(2),
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        elements: {
          bar: {
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.1)',
          },
        },
      },
    });

    chartRef.current.chartInstance = chart;

    return () => {
      chart.destroy();
    };
  }, [timings, chartRef]);

  return <canvas ref={chartRef}></canvas>;
};

export default WaterfallChart;
