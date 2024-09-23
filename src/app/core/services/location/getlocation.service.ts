import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetlocationService {

  constructor() { }

  getUserLocation(): Promise<{ latitude: number, longitude: number }> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            
          });
          console.log(Geolocation);
          console.log(position);
        }, (error) => {
          reject(error);
        });
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  }



}
