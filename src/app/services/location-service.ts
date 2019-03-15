import { Team } from './../models/team';
import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrackingData } from '../models/tracking-data';

// const url = 'http://localhost:1157/';
const url = 'http://amr2019.azurewebsites.net/';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LocationService {


  //
    constructor(private http: HttpClient) {

    }

    postTrackingData(data: TrackingData): Observable<boolean> {
      return this.http.post<boolean>(`${url}api/send-coords`, data);
    }

    getTeams(): Observable<Team[]> {
        return this.http.get<Team[]>(`${url}api/teams`, httpOptions);
    }
}
