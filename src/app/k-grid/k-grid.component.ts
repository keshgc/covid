import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { process, State } from '@progress/kendo-data-query';
import {
  GridComponent,
  GridDataResult,
  DataStateChangeEvent
} from '@progress/kendo-angular-grid';


@Component({
  selector: 'app-k-grid',
  templateUrl: './k-grid.component.html',
  styleUrls: ['./k-grid.component.scss']
})
export class KGridComponent implements OnInit {
  @Input() gridData;

  public data = null;

  constructor(public router: Router) { }

  ngOnInit(): void {
    this.loadGrid();
  }

  loadGrid(){
    this.data = process(this.gridData.data, this.gridData.state);    
  }

    public dataStateChange(state: DataStateChangeEvent): void {
    this.gridData.state = state;
    this.data = process(this.gridData.data, this.gridData.state);   
}

redirect(data){
 localStorage.setItem('countryData', JSON.stringify(data));
  this.router.navigate(['country', data.country])
}

}
