import * as L from "leaflet";

export const LAYERS = {
    DEFAULT: L.tileLayer('http://192.168.2.72/hot/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <a href="https://www.flaticon.com/free-icons/adress" title="adress icons">Adress icons created by Boris farias - Flaticon</a>'
    }),
};