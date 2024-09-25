import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { authInterceptor } from './core/interceptor/auth/auth.interceptor';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(), 
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideToastr({
      timeOut: 8000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      easeTime: 300,           // Ease-in time for animation (optional)
      closeButton: true,        // Add close button
      tapToDismiss: true, 
    }),
    provideLottieOptions({
      player: () => player,
    }),
    
  ]
};


