import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable()
export class PwaService {
    constructor(swUpdate: SwUpdate) {
        window.addEventListener('beforeinstallprompt', event => {
            // this.promptEvent = event;
            event.preventDefault();
          });
        swUpdate.available.subscribe(event => {
            if (event) {
                if (confirm('Do you want to update?')) {
                    window.location.reload();
                }
            }
        });
    }
}
