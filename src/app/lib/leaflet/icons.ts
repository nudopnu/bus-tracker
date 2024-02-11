import * as L from "leaflet";

export const ICONS = {
    DEFAULT: L.icon({
        iconUrl: 'assets/location3.png',
        shadowUrl: 'media/marker-shadow.png',
        iconSize: [25, 42],
        shadowSize: [19, 30],
        iconAnchor: [12, 42],
    }),
    GREY: L.icon({
        iconUrl: 'assets/location_grey.png',
        shadowUrl: 'media/marker-shadow.png',
        iconSize: [25, 42],
        shadowSize: [19, 30],
        iconAnchor: [12, 42],
    }),
    SELECTED: L.icon({
        iconUrl: 'assets/location_selected.png',
        shadowUrl: 'media/marker-shadow.png',
        iconSize: [25, 42],
        shadowSize: [19, 30],
        iconAnchor: [12, 42],
    }),
};