import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']


})


export class HomeComponent implements OnInit {

  updatedDate = null;
  gridReady = false;

  public gridData2 = {
    columns: [
      { field: "country", title: 'Country', type: 'link' },
      { field: "todayCases", title: 'New Confirmed' },
      { field: "cases", title: 'Total Confirmed' },
      { field: "todayDeaths", title: 'New Deaths' },
      { field: "deaths", title: 'Total Deaths' },
      { field: "active", title: 'Active' },
      { field: "recovered", title: 'Total Recovered' }
    ],

    state: {
      skip: 0,
      sort: [{ dir: "asc", field: "Country" }],
    },
    data: null
  }
  public gridData = {
    columns: [
      { field: "Country", title: 'Country', type: 'link' },
      { field: "NewConfirmed", title: 'New Confirmed' },
      { field: "TotalConfirmed", title: 'Total Confirmed' },
      { field: "NewDeaths", title: 'New Deaths' },
      { field: "TotalDeaths", title: 'Total Deaths' },
      { field: "NewRecovered", title: 'New Recovered' },
      { field: "TotalRecovered", title: 'Total Recovered' }
    ],

    state: {
      skip: 0,
      sort: [{ dir: "asc", field: "Country" }],
    },
    data: null
  }



  displayedColumns: string[] = ['Country', 'NewConfirmed', 'TotalConfirmed', 'NewDeaths', 'TotalDeaths', 'NewRecovered', 'TotalRecovered'];
  dataSource = null;

  public globalData = {
    title: 'Global',
    data: null
  }
  public localData = {
    title: 'India',
    data: null
  }
  constructor(private http: HttpClient, public router: Router) { }

  ngOnInit(): void {
    this.getData2();
  }



  getData2() {
    let apiUrl = 'https://corona.lmao.ninja/v2/countries';
    this.http.get(apiUrl).subscribe((res: any) => {     
      this.gridData2.data = res;
      this.updatedDate = res[0].updated;
      this.globalData.data = res.Global;
      this.getLocalData(res);
      this.getGlobalData();

    })
  }
  getGlobalData() {
    let apiUrl = 'https://corona.lmao.ninja/v2/all';
    this.http.get(apiUrl).subscribe((res: any) => {
      this.globalData.data = res;
      this.gridReady = true;
    })
  }

  getLocalData(data) {
    data.map((r) => {
      if (r.country == 'India') {
        this.localData.data = r;
      }
    })
  }




}
