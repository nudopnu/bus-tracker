import { Component, OnInit } from '@angular/core';
import * as L from "leaflet";

@Component({
  selector: 'vrt-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
    var map = L.map('map').setView([49.757093, 6.633447], 13);
    L.tileLayer('http://192.168.2.72/hot/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
  }

}
