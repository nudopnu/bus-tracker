import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stations } from '../models/vrt-types.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  getStations() {
    return this.http.get<Stations>('./assets/all-stops.json', { responseType: 'json' });
  }

}
