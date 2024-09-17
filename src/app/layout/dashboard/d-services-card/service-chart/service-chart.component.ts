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



  public barChartOptions_1: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 25000, // Adjust this value according to the largest dataset
      }
    }
  };
  
  // Bar chart type
  public barChartType_1: ChartType = 'bar';
  
  // Bar chart data with corresponding data for each service
  public barChartData_1: ChartConfiguration<'bar'>['data'] = {
    labels: ['AePS', 'DMT', 'Recharges', 'BBPS', 'Micro ATM', 'Account...', 'Credit Car...', 'Travel Ser...', 'Loans', 'CMS'],
    datasets: [
      { data: [100, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'AePS', backgroundColor: 'rgba(255, 99, 132, 0.8)', borderColor: 'rgba(255, 99, 132, 1)', borderWidth: 2 },
      { data: [0, 2000, 0, 0, 0, 0, 0, 0, 0, 0], label: 'DMT', backgroundColor: 'rgba(54, 162, 235, 0.8)', borderColor: 'rgba(54, 162, 235, 1)', borderWidth: 2 },
      { data: [0, 0, 80, 0, 0, 0, 0, 0, 0, 0], label: 'Recharges', backgroundColor: 'rgba(75, 192, 192, 0.8)', borderColor: 'rgba(75, 192, 192, 1)', borderWidth: 2 },
      { data: [0, 0, 0, 81, 0, 0, 0, 0, 0, 0], label: 'BBPS', backgroundColor: 'rgba(153, 102, 255, 0.8)', borderColor: 'rgba(153, 102, 255, 1)', borderWidth: 2 },
      { data: [0, 0, 0, 0, 56, 0, 0, 0, 0, 0], label: 'Micro ATM', backgroundColor: 'rgba(255, 159, 64, 0.8)', borderColor: 'rgba(255, 159, 64, 1)', borderWidth: 2 },
      { data: [0, 0, 0, 0, 0, 55, 0, 0, 0, 0], label: 'Account...', backgroundColor: 'rgba(255, 205, 86, 0.8)', borderColor: 'rgba(255, 205, 86, 1)', borderWidth: 2 },
      { data: [0, 0, 0, 0, 0, 0, 40, 0, 0, 0], label: 'Credit Car...', backgroundColor: 'rgba(201, 203, 207, 0.8)', borderColor: 'rgba(201, 203, 207, 1)', borderWidth: 2 },
      { data: [0, 0, 0, 0, 0, 0, 0, 70, 0, 0], label: 'Travel Ser...', backgroundColor: 'rgba(54, 162, 235, 0.8)', borderColor: 'rgba(54, 162, 235, 1)', borderWidth: 2 },
      { data: [0, 0, 0, 0, 0, 0, 0, 0, 100, 0], label: 'Loans', backgroundColor: 'rgba(255, 99, 132, 0.8)', borderColor: 'rgba(255, 99, 132, 1)', borderWidth: 2 },
      { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 50], label: 'CMS', backgroundColor: 'rgba(153, 102, 255, 0.8)', borderColor: 'rgba(153, 102, 255, 1)', borderWidth: 2 }
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