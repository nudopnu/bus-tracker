import * as L from "leaflet";

// const BASE_URL = "http://192.168.2.72";
const BASE_URL = "https://my-tile-server-103-181-222-27.loca.lt";

const CustomLayer = L.TileLayer.extend({
    getAttribution: function () {
        return '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <a href="https://www.flaticon.com/free-icons/adress" title="adress icons">Adress icons created by Boris farias - Flaticon</a>'
    },
    getTileUrl: function (coords: L.Coords) {
        const { x, y, z } = coords;
        return `${BASE_URL}/hot/${z}/${x}/${y}.png`;
    },
    createTile: function (coords: L.Coords, done: any) {
        const url = this.getTileUrl(coords);
        const img = document.createElement('img');
        fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Bypass-Tunnel-Reminder': 'somevalue' // Replace with your actual header name and value
            }),
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        }).then(blob => {
            img.src = URL.createObjectURL(blob);
            done(null, img);
        }).catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });

        return img;
    }
});

const DEFAULT = new CustomLayer();
DEFAULT.url = `${BASE_URL}/hot/{z}/{x}/{y}.png`;

export const LAYERS = {
    DEFAULT: DEFAULT,
    // DEFAULT: (L.tileLayer as any).protobuf(`${BASE_URL}/hot/{z}/{x}/{y}.png`, {
    //     maxZoom: 19,
    //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <a href="https://www.flaticon.com/free-icons/adress" title="adress icons">Adress icons created by Boris farias - Flaticon</a>'
    // }),
};