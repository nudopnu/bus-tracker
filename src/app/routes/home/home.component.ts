import { Component, OnInit } from '@angular/core';
import * as L from "leaflet";
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'vrt-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    const map = L.map('map').setView([49.757093, 6.633447], 13);
    L.tileLayer('http://192.168.2.72/hot/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <a href="https://www.flaticon.com/free-icons/adress" title="adress icons">Adress icons created by Boris farias - Flaticon</a>'
    }).addTo(map);

    const greenIcon = L.icon({
      iconUrl: 'assets/location4.png',
      shadowUrl: 'media/marker-shadow.png',
      iconSize: [26, 42],
      shadowSize: [20, 30],
      iconAnchor: [13, 42],
    });

    this.apiService.getStations().subscribe(res => {
      console.log(res.pins);
      res.pins.forEach(pin => {
        const coords = pin.coords.split(',').map(parseFloat);
        const marker = L.marker([coords[1], coords[0]], { icon: greenIcon }).addTo(map);
      });
    });
  }

}
