import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Enable production mode
enableProdMode();

// Bootstrap the application
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
