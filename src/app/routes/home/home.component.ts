import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import * as L from "leaflet";
import { ICONS } from '../../lib/leaflet/icons';
import { BusStop } from '../../models/bus-stop.model';
import { ApiService } from '../../services/api.service';
import { LAYERS } from '../../lib/leaflet/layers';
import { OPTIONS } from '../../lib/leaflet/options';
import { DrawerService } from '../../services/drawer.service';
import { BusStopComponent } from '../../components/bus-stop/bus-stop.component';

@Component({
    selector: 'vrt-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

    @ViewChild('icon', { read: TemplateRef }) icon!: TemplateRef<{}>;

    map?: L.Map;
    selected?: BusStop;
    busStops: BusStop[] = [];
    options: string[] = [];

    constructor(
        private apiService: ApiService,
        private drawerService: DrawerService,
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
                    // this.map!.flyTo([coords[1], coords[0]], 17, { duration: .5 });
                    let targetCoords;
                    if (this.drawerService.isSmallScreen) {
                        targetCoords = this.map!.containerPointToLatLng(this.map!.latLngToContainerPoint([coords[1], coords[0]]).add(new L.Point(0, 378 / 2)));
                    } else {
                        targetCoords = this.map!.containerPointToLatLng(this.map!.latLngToContainerPoint([coords[1], coords[0]]).subtract(new L.Point(378 / 2, 0)));
                    }
                    this.map!.flyTo(targetCoords, 17, { duration: .5 });
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
        let targetCoords = coords;
        if (this.drawerService.isSmallScreen) {
            targetCoords = this.map!.containerPointToLatLng(this.map!.latLngToContainerPoint(coords).add(new L.Point(0, 378 / 2)));
        } else {
            targetCoords = this.map!.containerPointToLatLng(this.map!.latLngToContainerPoint(coords).subtract(new L.Point(378 / 2, 0)));
        }
        this.map!.flyTo(targetCoords, targetZoom, { duration: .5 });
        this.drawerService.openComponent(BusStopComponent, {
            nzData: busStop,
            nzTitle: busStop.name,
            nzExtra: this.icon
        });
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
