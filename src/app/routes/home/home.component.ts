import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as L from "leaflet";
import { ICONS } from '../../lib/leaflet/icons';
import { BusStop } from '../../models/bus-stop.model';
import { ApiService } from '../../services/api.service';
import { LAYERS } from '../../lib/leaflet/layers';
import { OPTIONS } from '../../lib/leaflet/options';

@Component({
    selector: 'vrt-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

    map?: L.Map;
    selected?: BusStop;
    busStops: BusStop[] = [];
    options: string[] = [];

    constructor(
        private apiService: ApiService,
    ) { }

    ngOnInit(): void {
        this.map = L.map('map', OPTIONS.MAP).setView([49.757093, 6.633447], 14);
        LAYERS.DEFAULT.addTo(this.map);

        this.apiService.getStations().subscribe(res => {
            if (!this.map) return;
            const { pins } = res;
            this.options = pins.map(pin => pin.desc);
            pins.forEach(pin => {
                let coords = pin.coords.split(',').map(parseFloat);
                const marker = L.marker([coords[1], coords[0]], { icon: ICONS.DEFAULT }).addTo(this.map!);
                const busStop = {
                    coords: [coords[1], coords[0]],
                    marker,
                    name: pin.desc,
                } as BusStop;

                marker.addEventListener('click', () => {
                    this.select(busStop);
                });
                marker.addEventListener('dblclick', () => {
                    this.map!.flyTo([coords[1], coords[0]], 17, { duration: .5 });
                });

                this.busStops.push(busStop);
            });
        });
    }

    private select(busStop: BusStop, zoom: boolean = false) {
        this.deselect();
        this.selected = busStop;
        const { marker, coords } = busStop;
        const targetZoom = zoom ? 17 : this.map!.getZoom();
        marker.setIcon(ICONS.SELECTED);
        this.map!.flyTo(coords, targetZoom, { duration: .5 });
    }

    private deselect() {
        if (this.selected) {
            this.selected.marker.setIcon(ICONS.DEFAULT);
        }
    }

    onSearch(event: string) {
        const index = this.busStops.findIndex(stop => stop.name === event);
        if (index !== -1) {
            const busStop = this.busStops.at(index)!;
            this.select(busStop);
        }
    }

}
