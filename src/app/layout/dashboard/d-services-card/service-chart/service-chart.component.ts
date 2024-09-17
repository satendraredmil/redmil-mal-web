import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-service-chart',
  standalone: true,
  imports: [NgChartsModule, CommonModule],
  templateUrl: './service-chart.component.html',
  styleUrl: './service-chart.component.scss'
})
export class ServiceChartComponent {


  activeTime: string = '1week'; // Default active time
  activeTime_1: string = '1week'; // Default active time


  setActiveTime(time: string) {
    this.activeTime = time; // Set the active time
  }
  setActiveTime_1(timea: string) {
    this.activeTime_1 = timea; // Set the active time
  }


   // Bar chart options
   public barChartOptions_1: ChartOptions<'bar'> = {
    responsive: true,
  };

  // Bar chart type
  public barChartType_1: ChartType = 'bar';

  // Bar chart data
  public barChartData_1: ChartConfiguration<'bar'>['data'] = {
    labels: ['AePS', 'DMT', 'Recharges', 'BBPS', 'Micro ATM', 'Account...', 'Credit Car...', 'Travel Ser...', 'Loans', 'CMS'],
    datasets: [
      { data: [100, 2000, 80, 81, 56, 55, 40], label: 'AePS' },
      { data: [28, 48, 40, 19, 86, 27, 970], label: 'DMT' },
      { data: [65, 59, 80, 81, 56, 55, 450], label: 'Recharges' },
      { data: [28, 48, 40, 19, 86, 27, 990],  label: 'BBPS' },
      { data: [65, 59, 840, 81, 56, 55, 440],label: 'Micro ATM' },
      { data: [28, 48, 40, 19, 86, 27, 390], label: 'Account...' },
      { data: [65, 59, 80, 81, 56, 55, 440], label: 'Credit' },
      { data: [28, 48, 640, 19, 86, 27, 900], label: 'Travel' },
      { data: [28, 48, 640, 19, 86, 27, 900], label: 'Loans' },
      { data: [28, 48, 640, 19, 86, 27, 900], label: 'CMS' }
    ]
  };



  



  // Chart type
  public lineChartType_2: ChartType = 'line';

  // Line chart data
  public lineChartData_2: ChartConfiguration<'line'>['data'] = {
    labels: ['1', '5', '10', '15', '20', '25', '30'],
    datasets: [
      {
        label: 'Sample Data',
        data: [1000, 2000, 1500, 4500, 999, 5100, 900],
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