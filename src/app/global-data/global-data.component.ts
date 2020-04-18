import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-global-data',
  templateUrl: './global-data.component.html',
  styleUrls: ['./global-data.component.scss']
})
export class GlobalDataComponent implements OnInit {
  @Input() data;

  constructor() { }

  ngOnInit(): void {
  }

}
