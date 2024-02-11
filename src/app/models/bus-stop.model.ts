import * as L from "leaflet";

export interface BusStop {
    name: string;
    coords: L.LatLngExpression;
    marker: L.Marker;
}