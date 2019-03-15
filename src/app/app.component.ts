import { LocationService } from './services/location-service';
import { Component } from '@angular/core';
import { Team } from './models/team';
import { TrackingData } from './models/tracking-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-pwa';
  long: string;
  lat: string;
  date: Date;
  teams: Team[] = [];
  selectedTeam: number = null;
  locationTrackingEnabled = false;

  constructor(private locationService: LocationService) {
    this.showTime();
    this.getTeams();
  }

  selectTeam(value: any): void {
    this.selectedTeam = value;
  }

  startTracker(): void {
    this.locationTrackingEnabled = true;
  }

  stopTracker(): void {
    this.locationTrackingEnabled = false;
  }

  private getTeams(): void {
    this.locationService.getTeams().subscribe((x) => {
      if (x) {
        this.teams = x;
      }
    });
  }

  private showTime() {
    setTimeout(() => {
      if (this.locationTrackingEnabled) {
        this.getAndSendLocation();
        this.date = new Date();
      }
      this.showTime();
    }, 30000);
  }

  private sendTrackingData(teamId: number, longitude: string, latitude: string): void {
    const data = new TrackingData();
    data.teamId = teamId;
    data.longitude = longitude;
    data.latitude = latitude;

    this.locationService.postTrackingData(data).subscribe((result) => {
      if (result) {
        console.log('Tracking data saved.');
      }
    });
  }

  private getAndSendLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          this.lat = position.coords.latitude.toString();
          this.long = position.coords.longitude.toString();
          this.sendTrackingData(this.selectedTeam, this.long, this.lat);
        }
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
}
