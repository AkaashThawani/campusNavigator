import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../api.service';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
import { ChartsComponent } from "../charts/charts.component";
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
    selector: 'app-reports',
    standalone: true,
    templateUrl: './reports.component.html',
    styleUrl: './reports.component.css',
    imports: [CommonModule, MatCardModule, NgChartsModule, ChartsComponent,FlexLayoutModule]
})
export class ReportsComponent {
  data: any;
  constructor(private apiService: ApiService) { }
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: any[] = [];
  public pieChartData: number[] = [];
  public regChartLabels: any[] = [];
  public regChartData: number[] = [];
  public pieChartType: any = 'pie';
  public pieChartLegend = true;
  public tModeBG=  ['red', 'blue', 'green']


  ngOnInit() {
    this.getSearchData()
  }


  getSearchData() {
    this.apiService.getLocations().subscribe((res) => {
      this.data = res.map((e: any) => e.fields)
      // console.log(this.data)
      this.processData(this.data)
    })
  }

  processData(data) {
    const travelModes = data.map((entry: any) => entry.travel_mode);
    const uniqueTravelModes = [...new Set(travelModes)];

    // Count occurrences of each travel mode
    uniqueTravelModes.forEach(mode => {
      const count = travelModes.filter((m: any) => m === mode).length;
      this.pieChartLabels.push(mode);
      this.pieChartData.push(count);
      console.log('data',this.pieChartData,'lable',this.pieChartLabels)
    });
    
    const registeredCount = this.data.filter(entry => entry.search_by !== null).length;
    const nonRegisteredCount = this.data.filter(entry => entry.search_by === null).length;

    this.regChartData =  [ registeredCount, nonRegisteredCount ] ;
    this.regChartLabels = ['Registred User' , 'Non Registred User']

    this.processTopLocations('from_location_name', this.topFromLocations,this.data);
    this.processTopLocations('to_location_name', this.topToLocations,this.data);

   
    
  }
  topFromLocations: { label: string, count: number }[] = [];
  topToLocations: { label: string, count: number }[] = [];

  processTopLocations(key: 'from_location_name' | 'to_location_name', resultArray: any[],data) {
    const locationCounts = {};

    // Count occurrences of each location
    data.forEach(entry => {
      const location = entry[key];
      locationCounts[location] = (locationCounts[location] || 0) + 1;
    });

    // Sort locations by count in descending order
    const sortedLocations = Object.keys(locationCounts).sort((a, b) => locationCounts[b] - locationCounts[a]);

    // Extract the top 3 locations
    const topLocations = sortedLocations.slice(0, 3);

    // Populate resultArray with label and count
    topLocations.forEach(location => {
      resultArray.push({ label: location, count: locationCounts[location] });
    });
    console.log(topLocations)
  }

}
