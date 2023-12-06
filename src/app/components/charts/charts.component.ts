import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule, MatCardModule, NgChartsModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  @Input() chartText = 'Mode of Transport'
  @Input() pieChartLabels: any[] = [];
  @Input() pieChartData: number[] = [];
  @Input() pieChartType: any = 'pie';
  @Input() pieChartBg = [];
  pieChartLegend = true;

  constructor() {
  }

  ngOnChanges() {

  }

  ngOnInit() {
    setTimeout(() => {
      this.chart.data = {
        datasets: [{
          data: this.pieChartData,
          backgroundColor: this.pieChartBg, // Adjust colors as needed
        }],
        labels: this.pieChartLabels,
      },
        this.chart.type = 'pie'
      this.chart.options = this.pieChartOptions
      this.chart.render()
      this.chart.update()
    }, 2000);
  }

  ngAfterContentInit() {

  }
}
