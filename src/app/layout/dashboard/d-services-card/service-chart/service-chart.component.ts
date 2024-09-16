import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-service-chart',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './service-chart.component.html',
  styleUrl: './service-chart.component.scss'
})
export class ServiceChartComponent {
   // Bar chart options
   public barChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };

  // Bar chart type
  public barChartType: ChartType = 'pie';

  // Bar chart data
  public barChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    ]
  };


   // Bar chart options
   public barChartOptions_1: ChartOptions<'bar'> = {
    responsive: true,
  };

  // Bar chart type
  public barChartType_1: ChartType = 'bar';

  // Bar chart data
  public barChartData_1: ChartConfiguration<'bar'>['data'] = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    ]
  };



  



  // Chart type
  public lineChartType_2: ChartType = 'line';

  // Line chart data
  public lineChartData_2: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Sample Data',
        data: [45, 25, 60, 40, 80, 50, 90],
        borderColor: 'blue',
        borderWidth: 2,
        fill: true,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const ctx = chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(0, 123, 255, 0.5)'); // Blue
          gradient.addColorStop(1, 'rgba(255, 193, 7, 0)');    // Yellow (transparent)
          return gradient;
        },
        tension: 0.3,
        pointBackgroundColor: 'red',
        pointRadius: 5
      }
    ]
  };

  // Chart options
  public lineChartOptions_2: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false  // Remove grid lines from the X-axis
        },
        ticks: {
          color: '#000'  // Black color for x-axis labels
        }
      },
      y: { grid: {
        display: false  // Remove grid lines from the Y-axis
      },
      ticks: {
        color: '#000'  // Black color for y-axis labels
      }, beginAtZero: true }
    },
    elements: {
      line: {
        tension: 0.4 // Smooth curve
      }
    },
    plugins: {
      legend: {
        display: true
      }
    },
    // Set chart area background to white
  layout: {
    padding: 0
  },
  backgroundColor: '#ffffff', // This sets the background color to white
  };
}