import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

interface WaterfallChartProps {
  timings: { [key: string]: number };
}

interface ChartElement extends HTMLCanvasElement {
  chartInstance?: Chart;
}

const WaterfallBar: React.FC<WaterfallChartProps> = ({ timings }) => {
  const chartRef = useRef<ChartElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // exclude ssl because ssl timing is included in 'connect' according to node-fetch-har docs
    const timingEntries = Object.entries(timings).filter((timing) => timing[0] !== 'ssl');

    console.log('timings', timings, 'timingEntries', timingEntries);

    interface SimpleTimingData {
      label: string;
      data: number[];
      backgroundColor: string;
    }

    const totalValue = timingEntries.reduce((acc, [, value]) => acc + value, 0);

    const datasets = timingEntries.map(([key, value], index) => {
      const percentage = (value / totalValue) * 100;
      return {
        label: key,
        data: [percentage],
        backgroundColor: `hsl(${(index / timingEntries.length) * 120}, 100%, 50%)`,
      };
    });

    let chart: any;

    if (chartRef.current.chartInstance) {
      chartRef.current.chartInstance.destroy();
    }

    chart = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: [''],
        datasets: datasets,
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            stacked: true,
            min: 0,
            max: 100,
            ticks: {
              display: false,
            },

            grid: {
              display: false,
            },
          },
          y: {
            stacked: true,
            display: false,
            grid: {
              display: true,
            },
          },
        },
        plugins: {
          tooltip: {
            enabled: false,
            callbacks: {
              label: (context) => {
                const barValue = context.parsed.x;
                const label = context.dataset.label;
                return `${label}: ${barValue.toFixed(2)} ms`;
              },
            },
          },
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
        maintainAspectRatio: true,
        aspectRatio: 7,
      },
    });

    chartRef.current.chartInstance = chart;

    return () => {
      chart.destroy();
    };
  }, [timings, chartRef]);

  return <canvas ref={chartRef}></canvas>;
};

export default WaterfallBar;
