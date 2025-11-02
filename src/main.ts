import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent,appConfig).then(() => {
  providers: [
    provideRouter(routes),
    importProvidersFrom(ReactiveFormsModule)
  ]
}).catch((err) => console.error(err));
