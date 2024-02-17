import { Component, Inject } from '@angular/core';
import { NZ_DRAWER_DATA } from 'ng-zorro-antd/drawer';
import { BusStop } from '../../models/bus-stop.model';

@Component({
  selector: 'vrt-bus-stop',
  templateUrl: './bus-stop.component.html',
  styleUrl: './bus-stop.component.scss'
})
export class BusStopComponent {
  constructor(
    @Inject(NZ_DRAWER_DATA) public nzData: BusStop,
  ) { }
}
