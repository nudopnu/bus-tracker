import { Component, OnInit } from '@angular/core';
import * as L from "leaflet";
import { ApiService } from '../../services/api.service';
import { Pin } from '../../models/vrt-types.model';

@Component({
  selector: 'vrt-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  selected?: L.Marker;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    const map = L.map('map').setView([49.757093, 6.633447], 13);
    L.tileLayer('http://192.168.2.72/hot/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <a href="https://www.flaticon.com/free-icons/adress" title="adress icons">Adress icons created by Boris farias - Flaticon</a>'
    }).addTo(map);

    const defaultIcon = L.icon({
      iconUrl: 'assets/location4.png',
      shadowUrl: 'media/marker-shadow.png',
      iconSize: [26, 42],
      shadowSize: [20, 30],
      iconAnchor: [13, 42],
    });

    const selectedIcon = L.icon({
      iconUrl: 'assets/location_selected.png',
      shadowUrl: 'media/marker-shadow.png',
      iconSize: [26, 42],
      shadowSize: [20, 30],
      iconAnchor: [13, 42],
    });

    this.apiService.getStations().subscribe(res => {
      console.log(res.pins);
      res.pins.forEach(pin => {
        let coords = pin.coords.split(',').map(parseFloat);
        const marker = L.marker([coords[1], coords[0]], { icon: defaultIcon }).addTo(map);
        marker.addEventListener('click', () => {
          if (this.selected) {
            this.selected.setIcon(defaultIcon);
          }
          map.flyTo([coords[1], coords[0]], map.getZoom(), { duration: .5 });
          marker.setIcon(selectedIcon);
          this.selected = marker;
        });
        marker.addEventListener('dblclick', () => {
          map.flyTo([coords[1], coords[0]], 17, { duration: .5 });
        });
      });
    });
  }

}
