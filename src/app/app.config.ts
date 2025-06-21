import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { APP_INITIALIZER } from '@angular/core';
import { AuthService } from './core/services/auth.service';

import { authInterceptor } from './core/http/auth.interceptor';

export function initializeAppFactory(authService: AuthService) {
  return () => authService.getCurrentUser();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    provideHttpClient(
      withInterceptors([authInterceptor])
    ),

    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [AuthService],
      multi: true
    }
  ]
};
