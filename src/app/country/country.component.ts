import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Chart, StockChart } from 'angular-highcharts';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})



export class CountryComponent implements OnInit {
  country = null;
  public globalData ={
    title:'Global',
    data :null
}
  dataSource = null;

  gridReady = false;
  noData = null;

  public gridData = {
    columns: [
      { field: "date", type: 'date', filter: "date", title:'Date'  },
      { field: "value", title:'Count' }
    ],
    state: {
      skip: 0,
      sort: [{ dir: "desc", field: "date" }],
    },
    data: null
  }


  stock: StockChart;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getLocalStorageData();
  }

  getLocalStorageData() {
    let data = localStorage.getItem('countryData');
    if (!data) {
      this.router.navigate(['/']);
      return;
    }
    this.globalData.data = JSON.parse(data);
    this.globalData.title = this.globalData.data.country;
    this.country = this.globalData.data.country;
    //this.getData();
    this.getData2();
  }

  getData2() {
    let apiUrl = 'https://corona.lmao.ninja/v2/historical/'+this.country+'?lastdays=all';
    this.http.get(apiUrl).subscribe((res: any) => {   
      if(res.country){
        this.gridData.data = this.processData(res.timeline.cases);
        this.prepareChartData(this.gridData.data);
        
      }  else {
        this.noData = res.message
      }
       this.gridReady = true;
    }, (err)=>{
      this.noData = "No Data Found";
      this.gridReady = true;
    })
  }

  processData(data){
    let rawArray = [data]
    let newArray = [];
    rawArray.map((r)=>{     
     let keys = Object.keys(r);
      keys.map((k)=>{
        let item = {        
          date: new Date(k) ,
          value: r[k]
        };

        newArray.push(item)
      })      
    })

   return newArray;
  }


  prepareChartData(data) {
    let newArray = [];
    data.map((r) => {
      let item = [new Date(r.date).getTime(), r.value];
      newArray.push(item);
    });
    this.loadChart(newArray)
  }

  loadChart(data) {
    this.stock = new StockChart({
      rangeSelector: {
        selected: 5
      },

      title: {
        text: 'Confirmed Cases'
      },

      series: [{
        tooltip: {
          valueDecimals: 2
        },
        type: undefined,
        name: 'Confired',
        data: data
      }]
    });
  }

}
