import { Component, HostListener } from '@angular/core';
import { PwaService } from './services/pwa-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-pwa';
  long: number;
  lat: number;
  date: Date;

  constructor(private Pwa: PwaService) {
    this.showTime();
  }

  private showTime() {
    setTimeout(() => {
      this.date = new Date();
      this.getLocation();
      this.showTime();
      console.log('Time updated');
    }, 1000);
  }

  private getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          this.long = position.coords.longitude;
          this.lat = position.coords.latitude;
        }
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
}
